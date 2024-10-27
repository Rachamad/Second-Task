import { useState, useEffect } from 'react';

const useFetchPincode = (pincode: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pincode) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(`err.message`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pincode]);

  return { data, loading, error };
};

export default useFetchPincode;
