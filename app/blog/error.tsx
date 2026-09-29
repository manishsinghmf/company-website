'use client';

import { useEffect } from 'react';

interface BlogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({
  error,
  reset,
}: BlogErrorProps) {
  useEffect(() => {
    console.error('Blog page error:', error);
  }, [error]);

  return (
    <main>
      <h1>Something went wrong</h1>

      <p>
        We could not load the blog right now.
        Please try again.
      </p>

      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}