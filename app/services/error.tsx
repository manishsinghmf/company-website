'use client';

interface ServicesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ServicesError({
  reset,
}: ServicesErrorProps) {
  return (
    <main>
      <h1>Something went wrong</h1>

      <p>
        We could not load the services right now. Please try again.
      </p>

      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}