# Student-planner
A full-stack student planner built while learning web development

## Features
* Create new tasks
* Add due dates to tasks
* Set priority: low, medium, or high
* Mark tasks as completed
* Edit existing tasks
* Delete tasks
* Filter tasks by status:
    * All
    * Active
    * Completed
* Sort tasks
    * Due date
    * Alphabetically
    * Newest
* Display overdue tasks
* Persist tasks in a PostgreSQL database


# Tech Stask
## Frontend:
- React
- Typescript
- Vite

## Backend:
- Node.js
- Express
- TypeScript

## Database: 
- PostgreSQL
- Prisma ORM

## Project Structure
Student planner/



# Getting started
### Prerequisites
Make sure you have the following installed:
- Node.js
- npm
- PostgreSQL

### 1. Clone the repository
Git clone <repository-url>
cd student-planner

### 2. Install dependencies
Install the frontend dependencies:

cd frontend
npm install

Then install the backend dependencies:

cd ../backend
npm install

### 3. Configure the database
Make sure PostgreSQL is running and the backend is configured with the correct database connection.

The database configuration is handled by the backend

### 4. Start the backend

From the backend directory:

npm run dev

The backend runs on:

http://localhost:3000

### 5. Start the frontend

Open a new terminal and run:

cd frontend
npm run dev

The frontend will be available at the URL provided by Vite, usually:

http://localhost:5173

## API Endpoints

The frontend communicates with the backend through a REST API

GET
POST
PATCH
DELETE

### Example task:
{
    "id": "test",
    "text": "Complete assigment",
    "done": false,
    "dueDate": "2026-09-01",
    "priority": "high",
    "createdAt": "2026-08-26T00:00:00.00Z"
}

## How it works

... 

## Future improvements

- User authentication
- Different task categories or courses
- Search functionality
