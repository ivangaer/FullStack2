// src/components/TweetForm.js
import React, { useState } from 'react';

const TweetForm = ({ addTweet }) => {
  const [content, setContent] = useState('');
  const [isEmbedded, setIsEmbedded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) return;
    addTweet(content, isEmbedded);
    setContent('');
    setIsEmbedded(false);
  };

  const handleTweetOnTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <textarea
        placeholder="Escribe un tweet o agrega un link a un tweet famoso"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.textarea}
      />
      <label style={styles.label}>
        <input
          type="checkbox"
          checked={isEmbedded}
          onChange={(e) => setIsEmbedded(e.target.checked)}
        />
        Incrustar como Tweet de Twitter
      </label>
      <button type="submit" style={styles.button}>Agregar al Feed</button>
      <button
        type="button"
        onClick={handleTweetOnTwitter}
        style={{ ...styles.button, backgroundColor: '#1DA1F2', marginTop: '10px' }}
        disabled={!content}
      >
        Publicar en Twitter
      </button>
    </form>
  );
};

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    marginBottom: '20px',
  },
  textarea: {
    padding: '28px',
    fontSize: '18px',
    resize: 'none',
    marginBottom: '4px',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '5px',
  },
  label: {
    color: '#bbb',
    fontSize: '14px',
    marginBottom: '10px',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default TweetForm;
