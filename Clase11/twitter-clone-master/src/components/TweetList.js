// src/components/TweetList.js
import React from 'react';
import Tweet from './Tweet';
import { Tweet as ReactTweet } from 'react-tweet';

const TweetList = ({ tweets }) => {
  return (
    <div>
      {tweets.map((tweet, index) => (
        tweet.isEmbedded ? (
          <ReactTweet key={index} id={tweet.content} />
        ) : (
          <Tweet key={index} content={tweet.content} username={tweet.username} date={tweet.date} />
        )
      ))}
    </div>
  );
};

export default TweetList;
