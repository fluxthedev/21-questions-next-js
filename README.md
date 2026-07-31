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
```bash
npm install
