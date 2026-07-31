# 21 Questions Game

An interactive, Next.js-powered conversation starter and party game. Select a category, navigate through a curated deck of 21 prompt cards, and save your session history to a MongoDB database. 

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Database:** MongoDB
* **Testing:** Vitest
* **Environment:** GitHub Codespaces / Devcontainers

## 📁 Project Structure

* **`app/`**: Next.js App Router pages and server-side API routes (`/api/categories`, `/api/questions`, `/api/sessions`).
* **`components/`**: Reusable React UI components (`QuestionCard`, `CategoryGrid`, `ProgressTrack`, etc.).
* **`lib/`**: Core application logic.
  * **`db/`**: MongoDB data access layers (`categories.ts`, `questions.ts`, `sessions.ts`).
  * **`game-logic.ts`**: Pure, dependency-free business logic for deck navigation and validation.
* **`tests/`**: Unit and component tests running via Vitest.
* **`.devcontainer/`**: Docker and Codespaces configuration for a reproducible development environment.

## 🛠 Getting Started

### 1. Environment Setup
This project is configured for **GitHub Codespaces**. Simply open the repository in a Codespace, and the `.devcontainer` configuration will automatically build the environment and install dependencies.

If running locally without Codespaces, ensure you have Node.js and MongoDB installed, then run:
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables
Copy the example environment file and add your MongoDB connection string:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`
Update `.env.local` with your database credentials:
\`\`\`env
MONGODB_URI="mongodb://your-connection-string-here"
MONGODB_DB="twenty_one_questions"
\`\`\`

### 3. Running the Development Server
Start the Next.js development server:
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧪 Testing

This project uses Vitest for fast, reliable unit and component testing. Pure game logic (`lib/game-logic.ts`) is tested independently from the Next.js context.

To run the test suite:
\`\`\`bash
npm run test
\`\`\`

## 🎮 How to Play
1. **Choose a Category:** Browse the available topics (e.g., Icebreakers, Deep Dives) from the home screen.
2. **Draw Cards:** The game loads a default deck of 21 questions.
3. **Navigate:** Use the UI controls to step through the prompts.
4. **Complete:** Finish the deck to automatically save your game session to the database, viewable on the `/history` page.
```
