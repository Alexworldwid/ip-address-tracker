"use client"

import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching URL: ", url);
        const response = await fetch(url);
        console.log("Response Status: ", response.status);
        if (!response.ok) {
          const { messages } = await response.json();
          throw new Error(`${messages}`);
        }
        const data: T = await response.json();
        console.log("Fetched Data: ", data);
        setData(data);
      } catch (err) {
        console.error("Fetch Error: ", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
