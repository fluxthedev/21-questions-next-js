/**
 * Populates MongoDB with the category and question data from
 * data/seed-questions.ts, and creates the indexes the app relies on.
 * Seeding is idempotent by default — running it twice won't create
 * duplicates, because both categories and questions are upserted against a
 * natural key (slug, and text+category respectively).
 *
 * Usage:
 *   npm run seed         # upsert categories/questions, keep existing data
 *   npm run seed:reset   # wipe categories + questions first, then insert
 *
 * Requires MONGODB_URI (and optionally MONGODB_DB) in .env.local — see
 * .env.local.example.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { MongoClient, type AnyBulkWriteOperation } from "mongodb";
import { categories, questions } from "../data/seed-questions";
import { validateQuestionBank } from "../lib/game-logic";
import { COLLECTIONS, DB_NAME } from "../lib/db-constants";
import type { Category, Question } from "../lib/types";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      "Missing MONGODB_URI. Copy .env.local.example to .env.local and set your connection string.",
    );
    process.exit(1);
  }

  const shouldReset = process.argv.includes("--reset");

  console.log("Validating question bank before touching the database...");
  const validation = validateQuestionBank(questions, categories);
  if (!validation.valid) {
    console.error("Question bank failed validation — aborting seed:");
    for (const issue of validation.issues) {
      console.error(`  [${issue.type}] ${issue.detail}`);
    }
    process.exit(1);
  }
  console.log(
    `  ${validation.totalQuestions} questions across ${categories.length} categories look good.`,
  );

  console.log(`Connecting to MongoDB (db: "${DB_NAME}")...`);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(DB_NAME);

    const categoriesCollection = db.collection<Category>(COLLECTIONS.CATEGORIES);
    const questionsCollection = db.collection<Question>(COLLECTIONS.QUESTIONS);

    if (shouldReset) {
      console.log("Resetting: clearing existing categories and questions...");
      await categoriesCollection.deleteMany({});
      await questionsCollection.deleteMany({});
    }

    console.log("Creating indexes...");
    await categoriesCollection.createIndex({ slug: 1 }, { unique: true });
    await questionsCollection.createIndex({ category: 1, isActive: 1 });
    await questionsCollection.createIndex({ text: 1, category: 1 }, { unique: true });

    console.log("Upserting categories...");
    const categoryOps: AnyBulkWriteOperation<Category>[] = categories.map((category) => ({
      updateOne: {
        filter: { slug: category.slug },
        update: { $set: category },
        upsert: true,
      },
    }));
    await categoriesCollection.bulkWrite(categoryOps);

    console.log("Upserting questions...");
    const questionOps: AnyBulkWriteOperation<Question>[] = questions.map((question) => ({
      updateOne: {
        filter: { text: question.text, category: question.category },
        update: {
          $setOnInsert: {
            text: question.text,
            category: question.category,
            isActive: true,
            createdAt: new Date(),
          },
        },
        upsert: true,
      },
    }));
    const questionResult = await questionsCollection.bulkWrite(questionOps);
    const alreadyPresent = questions.length - questionResult.upsertedCount;
    console.log(
      `  ${questionResult.upsertedCount} newly inserted, ${alreadyPresent} already present.`,
    );

    const totalQuestions = await questionsCollection.countDocuments({ isActive: true });
    const totalCategories = await categoriesCollection.countDocuments({});
    console.log(
      `\nDone. Database "${DB_NAME}" now has ${totalCategories} categories and ${totalQuestions} active questions.`,
    );
  } finally {
    await client.close();
  }
}

main().catch((error: unknown) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});