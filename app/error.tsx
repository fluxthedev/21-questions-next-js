"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
      <span aria-hidden className="text-3xl">
        ⚠️
      </span>
      <h1 className="mt-4 font-display text-2xl text-paper">
        Something went sideways
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-mist/70">
        We couldn&apos;t load that page — most likely the app can&apos;t
        reach MongoDB right now. Check that{" "}
        <code className="rounded bg-ink-soft px-1.5 py-0.5 font-mono text-xs text-paper">
          MONGODB_URI
        </code>{" "}
        is set and the database is reachable.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
