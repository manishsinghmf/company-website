'use client';

interface TeamErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TeamError({
  // error,
  reset,
}: TeamErrorProps) {
  return (
    <main>
      <h1>Something went wrong</h1>

      <p>
        We could not load the team members right now.
        Please try again.
      </p>

      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}