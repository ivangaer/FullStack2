// src/components/Notification.js
import React, { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // La notificación desaparecerá después de 3 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={styles.notification}>
      {message}
    </div>
  );
};

const styles = {
  notification: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '10px 20px',
    backgroundColor: '#1DA1F2',
    color: '#fff',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
};

export default Notification;
// src/components/TweetForm.js