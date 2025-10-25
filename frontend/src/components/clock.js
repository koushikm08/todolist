import React, { useEffect, useState } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '18px',
      color: '#555'
    }}>
      <div>{formattedDate}</div>
      <div>{formattedTime}</div>
    </div>
  );
}

export default Clock;
