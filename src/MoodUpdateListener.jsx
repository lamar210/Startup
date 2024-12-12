import React, { useEffect, useState } from 'react';

const MoodUpdateListener = () => {
  const [notification, setNotification] = useState('');


  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.onmessage = (event) => {
      const data = event.data;

      if (data instanceof Blob) {
        const reader = new FileReader();
        
        reader.onload = () => {
          setNotification(reader.result);
        };
        
        reader.readAsText(data);
      } else {
        setNotification(data);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setNotification('');
    }
  };
  
  return (
    <div>
    {notification && (
        <div className="message-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <h2>{notification}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodUpdateListener;
