import { MongoClient, type MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    'Missing the "MONGODB_URI" environment variable. Copy .env.local.example to .env.local and set it to your MongoDB connection string.',
  );
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
};

// In dev, Next.js's Fast Refresh re-evaluates modules frequently, which
// would otherwise open a fresh MongoClient (and TCP connection) on every
// reload. Caching the client promise on the global object survives module
// reloads within the same process, so we reuse the one connection.
//
// In production, each serverless invocation gets its own module scope, so
// no global caching is needed — but connections are still reused across
// invocations of the same warm instance because the module itself persists.
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

/** Convenience helper for grabbing the app's database off the shared client. */
export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "twenty_one_questions");
}
