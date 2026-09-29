'use client';

import { useEffect } from 'react';

interface BlogDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogDetailError({
  error,
  reset,
}: BlogDetailErrorProps) {
  useEffect(() => {
    console.error('Blog detail error:', error);
  }, [error]);

  return (
    <main>
      <h1>Something went wrong</h1>

      <p>
        We could not load this blog post.
        Please try again.
      </p>

      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}