export default function Loading() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24">
      <div
        aria-label="Loading"
        className="h-10 w-10 animate-spin rounded-full border-2 border-ink-soft border-t-ember"
      />
    </div>
  );
}
