# Calendar App

A Google Calendar-like application built with React, TypeScript, Node.js, and MongoDB.

## Features

- Create, edit, and delete events
- Drag and drop events to reschedule
- Categorize events with different colors
- Set goals and tasks
- Drag tasks from goals to calendar to create events
- Week view calendar
- Responsive design

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Vite
  - Redux Toolkit
  - React DnD
  - date-fns
  - Axios

- Backend:
  - Node.js
  - Express
  - TypeScript
  - MongoDB
  - Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/calendar-app
   PORT=5000
   ```

4. Start MongoDB:
   ```bash
   mongod
   ```

5. Start the development servers:
   ```bash
   # From the root directory
   npm start
   ```

This will start both the frontend and backend servers concurrently.

## Project Structure

```
calendar-app/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── store/      # Redux store and slices
│   │   ├── types/      # TypeScript types
│   │   └── hooks/      # Custom hooks
│   └── public/         # Static assets
├── backend/            # Node.js backend
│   ├── src/
│   │   ├── models/     # MongoDB models
│   │   ├── routes/     # API routes
│   │   └── index.ts    # Server entry point
│   └── .env           # Environment variables
└── package.json       # Root package.json
```

## API Endpoints

### Events
- GET /api/events - Get all events
- POST /api/events - Create a new event
- PUT /api/events/:id - Update an event
- DELETE /api/events/:id - Delete an event

### Goals
- GET /api/goals - Get all goals
- POST /api/goals - Create a new goal
- GET /api/goals/:goalId/tasks - Get tasks for a goal
- POST /api/goals/:goalId/tasks - Add a task to a goal

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 
