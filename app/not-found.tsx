import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
      <span aria-hidden className="text-3xl">
        🃏
      </span>
      <h1 className="mt-4 font-display text-2xl text-paper">
        That deck doesn&apos;t exist
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-mist/70">
        The category you&apos;re looking for isn&apos;t in the database.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
      >
        Back to categories
      </Link>
    </div>
  );
}
