import numpy as np
import os
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for communication between frontend and backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; restrict to your frontend in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the embedding model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Define the path to store the embeddings separately
EMBEDDING_FILE_PATH = './aai-base/embeddings.npy'

# Load the CSV file with questions and answers (without embeddings)
qa_data = pd.read_csv('./aai-base/aai_qna.csv')

# Remove rows where the 'QUESTION' column is empty or NaN
qa_data = qa_data.dropna(subset=['QUESTION'])

# Ensure 'QUESTION' values are non-empty strings
qa_data = qa_data[qa_data['QUESTION'].str.strip() != '']

# Load embeddings from the .npy file if it exists
if os.path.exists(EMBEDDING_FILE_PATH):
    embeddings = np.load(EMBEDDING_FILE_PATH)
else:
    # If embeddings file doesn't exist, initialize an empty array
    embeddings = np.empty((0, 384))  # Adjust the shape based on the model output

# Precompute embeddings for the remaining QUESTION column
def update_embeddings():
    global embeddings
    embeddings = np.vstack([model.encode(x) for x in qa_data['QUESTION']])

    # Save the embeddings to a .npy file
    np.save(EMBEDDING_FILE_PATH, embeddings)

update_embeddings()

# Define the request body format for querying answers
class Query(BaseModel):
    message: str

# Define the request body format for adding a new QA pair
class NewQA(BaseModel):
    question: str
    answer: str
    more_info: str

@app.post("/ask-aai")
async def get_answer(query: Query):
    user_question = query.message

    # Embed the user's question
    user_embedding = model.encode(user_question)

    # Calculate cosine similarity between user question and CSV QUESTION embeddings
    similarities = cosine_similarity([user_embedding], embeddings)[0]

    # Find the best match index and its similarity score
    best_match_idx = np.argmax(similarities)
    best_similarity = similarities[best_match_idx]

    # Check if the similarity is above the threshold
    if best_similarity >= 0.3:
        # Get the corresponding answer, more_info, and serial_no from the matched question row
        best_match = qa_data.iloc[best_match_idx]
        serial_no = best_match['serial_no']
        answer = best_match['ANSWER']
        more_info = best_match['more_info']

        # Prepare the response
        response = {
            "serial_no": int(serial_no),  # Ensure serial_no is returned as an integer
            "response": answer,
        }

        # If the 'More info' field is not empty, append it to the response
        if pd.notna(more_info) and more_info.strip() != '':
            response['response'] += f"\nMore Info: {more_info}"

    else:
        # If similarity is below the threshold, provide a fallback response
        response = {
            "response": "I couldn't find a precise match for your query. Could you rephrase or be more specific?",
        }

    return response

@app.post("/add-question")
async def add_question(new_qa: NewQA):
    global qa_data, embeddings  # Declare globals at the start of the function

    # Extract data from the request body
    new_question = new_qa.question.strip()
    new_answer = new_qa.answer.strip()
    new_more_info = new_qa.more_info.strip()

    # Validate input
    if not new_question or not new_answer:
        raise HTTPException(status_code=400, detail="Question and Answer cannot be empty.")

    # Embed the new question
    new_embedding = model.encode(new_question)

    # Calculate the new serial_no
    if 'serial_no' in qa_data.columns:
        new_serial_no = qa_data['serial_no'].max() + 1
    else:
        # If serial_no column is missing, initialize it
        qa_data['serial_no'] = range(1, len(qa_data) + 1)
        new_serial_no = qa_data['serial_no'].max() + 1

    # Append the new data to the DataFrame
    new_row = {
        "serial_no": new_serial_no,
        "QUESTION": new_question,
        "ANSWER": new_answer,
        "more_info": new_more_info
    }
    qa_data = pd.concat([qa_data, pd.DataFrame([new_row])], ignore_index=True)

    # Append the new embedding to the embeddings array
    embeddings = np.vstack([embeddings, new_embedding])

    # Save the embeddings to the .npy file
    np.save(EMBEDDING_FILE_PATH, embeddings)

    # Save the updated DataFrame back to the CSV file
    qa_data.to_csv('./aai-base/aai_qna.csv', index=False)

    return {"message": f"serial_no: {new_serial_no}"}


@app.put("/edit")
async def edit_question(serial_no: int, new_qa: NewQA):
    # Extract data from the request body
    new_question = new_qa.question.strip()
    new_answer = new_qa.answer.strip()
    new_more_info = new_qa.more_info.strip()

    # Validate input
    if not new_question or not new_answer:
        raise HTTPException(status_code=400, detail="Question and Answer cannot be empty.")

    global qa_data, embeddings

    # Check if the serial_no exists in the DataFrame
    if serial_no not in qa_data['serial_no'].values:
        raise HTTPException(status_code=404, detail="Entry with the specified serial_no not found.")

    # Find the index of the entry to be updated
    row_index = qa_data[qa_data['serial_no'] == serial_no].index[0]

    # Update the DataFrame
    qa_data.at[row_index, 'QUESTION'] = new_question
    qa_data.at[row_index, 'ANSWER'] = new_answer
    qa_data.at[row_index, 'more_info'] = new_more_info

    # Recompute the embedding for the updated question
    updated_embedding = model.encode(new_question)

    # Update the embeddings array
    embeddings[row_index] = updated_embedding

    # Save the updated DataFrame and embeddings back to the files
    qa_data.to_csv('./aai-base/aai_qna.csv', index=False)
    np.save(EMBEDDING_FILE_PATH, embeddings)

    return {"message": f"Entry with serial_no {serial_no} has been successfully updated."}

def handle_nan_values(value):
    if isinstance(value, float) and np.isnan(value):
        return "None"
    return value


@app.get("/get-all-questions")
async def get_all_questions():
    # Ensure the data is loaded from the CSV
    if qa_data.empty:
        raise HTTPException(status_code=404, detail="No questions found in the database.")

    # Create a list of dictionaries containing the serial_no, question, and answer
    questions_list = []
    for _, row in qa_data.iterrows():
        question_entry = {
            "serial_no": int(row['serial_no']),
            "question": row['QUESTION'],
            "answer": row['ANSWER'],
            "more_info": handle_nan_values(row['more_info'])
            }
        questions_list.append(question_entry)

    # Return the list of all questions and their details
    return {"questions": questions_list}
