// src/components/Tweet.js
import React from 'react';

const Tweet = ({ content, username, date }) => {
  return (
    <div style={styles.tweetContainer}>
      <h3 style={styles.username}>@{username}</h3>
      <p style={styles.content}>{content}</p>
      <small style={styles.date}>{new Date(date).toLocaleString()}</small>
    </div>
  );
};

const styles = {
  tweetContainer: {
    border: '1px solid #333',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    maxWidth: '600px',
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  username: {
    fontSize: '18px',
    color: '#1DA1F2',
  },
  content: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  date: {
    fontSize: '12px',
    color: '#aaa',
  },
};

export default Tweet;
