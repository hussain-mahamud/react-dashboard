import { useState, useEffect } from 'react';

export function useDemoData(file) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch ' + file);
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [file]);

  return { data, loading, error };
}
