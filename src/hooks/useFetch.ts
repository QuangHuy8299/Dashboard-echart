import { useState, useEffect } from 'react';

/**
 * Generic fetch hook. Use as: const { data, loading, error } = useFetch<MyType>(url)
 */
const useFetch = <T = unknown>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = (await response.json()) as T;
        if (!cancelled) setData(result);
      } catch (err: unknown) {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : 'An unknown error occurred'
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error } as {
    data: T | null;
    loading: boolean;
    error: string | null;
  };
};

export default useFetch;
