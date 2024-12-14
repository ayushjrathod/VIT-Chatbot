import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity

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

# Load the CSV file
qa_data = pd.read_csv('./aai.csv')

# Remove rows where the 'QUESTION' column is empty or NaN
qa_data = qa_data.dropna(subset=['QUESTION'])

# Ensure 'QUESTION' values are non-empty strings
qa_data = qa_data[qa_data['QUESTION'].str.strip() != '']

# Precompute embeddings for the remaining QUESTION column
qa_data['embedding'] = qa_data['QUESTION'].apply(lambda x: model.encode(x))

# Define the request body format for querying answers
class Query(BaseModel):
    message: str

# Define the request body format for adding a new QA pair
class NewQA(BaseModel):
    question: str
    answer: str
    more_info: str

@app.post("/ask-vit")
async def get_answer(query: Query):
    user_question = query.message

    # Embed the user's question
    user_embedding = model.encode(user_question)

    # Calculate cosine similarity between user question and CSV QUESTION embeddings
    embeddings = np.vstack(qa_data['embedding'].to_numpy())
    similarities = cosine_similarity([user_embedding], embeddings)[0]

    # Find the best match index
    best_match_idx = np.argmax(similarities)

    # Get the corresponding answer and more_info from the matched question row
    best_match = qa_data.iloc[best_match_idx]
    answer = best_match['ANSWER']
    more_info = best_match['more_info']

    # Prepare the response
    response = {
        "response": answer,
    }

    # If the 'More info' field is not empty, append it to the response
    if pd.notna(more_info) and more_info.strip() != '':
        response['response'] += f"\nMore Info: {more_info}"

    return response

@app.post("/add-question")
async def add_question(new_qa: NewQA):
    # Extract data from the request body
    new_question = new_qa.question.strip()
    new_answer = new_qa.answer.strip()
    new_more_info = new_qa.more_info.strip()

    # Validate input
    if not new_question or not new_answer:
        raise HTTPException(status_code=400, detail="Question and Answer cannot be empty.")

    # Embed the new question
    new_embedding = model.encode(new_question)

    # Append the new data to the DataFrame
    new_row = {
        "QUESTION": new_question,
        "ANSWER": new_answer,
        "more_info": new_more_info,
        "embedding": new_embedding
    }
    global qa_data
    qa_data = pd.concat([qa_data, pd.DataFrame([new_row])], ignore_index=True)

    # Save the updated DataFrame back to the CSV file
    qa_data.to_csv('VIT QNA - Sheet1.csv', index=False)

    return {"message": "New question is ready!"}
