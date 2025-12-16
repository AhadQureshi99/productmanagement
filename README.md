# Product Management — Interview Submission

Thank you for reviewing this submission. This repository contains a small full-stack Product Management app implemented as part of a take-home / interview task. The goal was to build a minimal, reliable CRUD admin interface for products with image uploads and a clean, maintainable frontend structure.

What you'll find here

- A simple Express backend (API + image uploads) with MongoDB persistence.
- A Vite + React frontend using Redux Toolkit for state management and Tailwind for styles.
- Small, focused codebase intended to be easy to read and extend.

Quick decisions and trade-offs

- Prioritized clarity and minimal dependencies over elaborate architecture.
- Centralized common imports in `Frontend/src/imports` to reduce repetition in components.
- Client validates image size before upload; server-side validation is assumed and recommended.

Project structure

- `Backend/` — Express server, controllers, routes, and `uploads/` directory for images
- `Frontend/` — React app (Vite), services, Redux store, and main UI component

Local setup
Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- A running MongoDB instance (local or Atlas)

Backend

1. Open a terminal, install and start the backend:

   cd Backend
   npm install
   npm run dev

2. Environment variables (example)

   MONGO_URI=mongodb://localhost:27017/productdb
   PORT=3001

Frontend

1. Open another terminal, install and start the frontend:

   cd Frontend
   npm install
   npm run dev

2. The frontend expects the API at `http://localhost:3001` by default. If you change backend host/port, update the API base URL in `Frontend/src/services/productService.js` or set a small config.

How to use

- Open the frontend dev server (Vite usually serves at `http://localhost:5173`).
- Use the Product Management UI (single screen) to add, edit, search, and delete products. Image previews are shown when selecting files.

API (summary)

- GET `/api/products` — list products
- POST `/api/products` — create product (multipart/form-data: `name`, `category`, `description`, `imageFile`)
- PUT `/api/products/:id` — update product (multipart/form-data)
- DELETE `/api/products/:id` — delete product

Notes for reviewers

- Focus areas I wanted to show:
  - Clear Redux async flow using createAsyncThunk
  - Small, readable React components
  - A pragmatic file structure that is easy to extend
- Known limitations (timebox):
  - Minimal error UI and edge-case handling
  - No authentication
  - No automated tests included in this submission

Suggested next steps (if you want to extend)

- Add server-side validation for upload size and types
- Add unit/integration tests for API endpoints and Redux slices
- Improve accessibility and keyboard navigation in the UI
- Add simple authentication for the admin UI

Dev commands
From repository root you can run:

cd Backend
npm install
npm run dev

cd ../Frontend
npm install
npm run dev

Lint

cd Frontend
npm run lint

Contact
If you want to discuss the implementation or need clarifications, I am happy to walk through the code and explain design choices.

Thanks for taking the time to review this submission.
