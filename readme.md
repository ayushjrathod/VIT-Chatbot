## Project Overview

This project provides a chatbot that can be integrated into websites to answer user queries. It has:

- A frontend (React components) for the interface.
- A backend (FastAPI) for handling queries and managing data.
- A knowledge base stored in a CSV file with precomputed embeddings.

## Directory Structure

- **frontend/src/components/**: Contains React components like Chatbot, UpdateKnowledgeBase, and QuestionsList.
- **api/**: Main FastAPI routes, model loading, embeddings generation, and data operations.
- **readme.md**: Documentation on how to run and deploy this chatbot.

## Running Locally

### 1. Backend (FastAPI)

1. Ensure Python 3 and virtual environment are available.
2. Install requirements:
   ```
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```
   uvicorn app:app --reload
   ```

### 2. Frontend (React)

1. Install dependencies:
   ```
   npm install
   ```
2. Run the development server:
   ```
   npm run dev
   ```
3. Open your browser at the indicated localhost URL.

## Deployment on AWS

1. **Backend**:

   - Option 1: Use AWS EC2 to host your FastAPI app. Install Python, configure the environment, then run with a process manager (e.g., pm2 or gunicorn).
   - Option 2: Containerize your FastAPI app with Docker and deploy on AWS ECS or EKS.
   - Ensure you set up environment variables, security groups, and permissions securely.

2. **Frontend**:
   - Use AWS S3 and CloudFront for hosting a static React build.
   - If containerized, you can also deploy on ECS or EKS.

## Additional Deployment Options

- **Docker Compose**: Combine frontend and backend services locally or in production environments.
- **Heroku**: Upload your code, configure buildpacks for Node and Python, then scale according to usage.

## Important Notes

- Edit the “api/app.py” file to configure the URL endpoints for knowledge base operations.
- In production, restrict CORS origins and protect your endpoints.
- Adjust or regenerate embeddings if your knowledge base CSV changes significantly.
