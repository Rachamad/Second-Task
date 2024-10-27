import React, { useState } from 'react';
import useFetchPincode from '../hooks/useFetchPincode';
import './PincodeFetcher.css'; // Import your styles here

const PincodeFetcher: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const { data, loading, error } = useFetchPincode(pincode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger fetch with the current pincode state
  };

  return (
    <div className="pincode-fetcher">
      <h1>Pincode Fetcher</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode"
          required
        />
        <button type="submit">Fetch Details</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && data.length > 0 && (
        <div className="results">
          <h2>Pincode Details:</h2>
          {data[0].PostOffice.map((post: any) => (
            <div key={post.Name} className="post-office">
              <h3>{post.Name}</h3>
              <p>District: {post.District}</p>
              <p>State: {post.State}</p>
              <p>Country: {post.Country}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PincodeFetcher;
