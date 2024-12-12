import React, { useEffect, useState } from 'react';

const MoodUpdateListener = () => {
  const [notification, setNotification] = useState('');
  const [wsError, setWsError] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.onopen = () => {
      console.log('WebSocket connection established.');
      setWsError('');
    };

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

    ws.onerror = (error) => {
      setWsError('Failed to connect to the WebSocket server.');
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
      setWsError('WebSocket connection closed.');
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
      {wsError && <div className="error-message">{wsError}</div>}
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
