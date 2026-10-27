# Smart Placement Portal

A student placement website with an Express API and MongoDB database. The browser page is served by Express, so run the server instead of opening `index.html` directly.

## Requirements

- Node.js 20 or newer
- A MongoDB database, such as a MongoDB Atlas cluster

## Install and configure

From the project folder, run:

```bash
npm ci
```

Copy `.env.example` to a new file named `.env`. Replace `MONGODB_URI` with your MongoDB connection string. Keep `.env` private; it is ignored by Git and must never be uploaded.

## Run

```bash
npm start
```

Open `http://localhost:3000`. The server inserts the six example jobs the first time the jobs collection is empty.

## API routes

- `GET /api/health` checks the server and database connection.
- `GET /api/jobs?search=design` lists jobs, with an optional search.
- `GET /api/profile` reads the demo student profile.
- `PUT /api/profile` saves the demo student profile. Send JSON with `name`, `course`, and `skills`.

This first backend has one shared demo profile and no login or access control. Add authentication before using it with real students or deploying it publicly.
