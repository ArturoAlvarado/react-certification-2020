import React from 'react';
import VideoMini from '../VideoMini';

const VideoList = ({ items, withDescription }) => {
  const renderVideos = () => {
    return items.map((video) => (
      <VideoMini withDescription={withDescription}
        key={typeof video.id === 'string' ? video.id : video.id.videoId}
        {...video}
      />
    ));
  };
  return <div>{items ? renderVideos() : <></>}</div>;
};

export default VideoList;
