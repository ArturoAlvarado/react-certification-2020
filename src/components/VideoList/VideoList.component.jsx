import React from 'react';
import VideoMini from '../VideoMini';

const VideoList = ({ items }) => {
  const renderVideos = () => {
    return items.map((video) => (
      <VideoMini
        key={typeof video.id === 'string' ? video.id : video.id.videoId}
        {...video}
      />
    ));
  };
  return <div>{items ? renderVideos() : <></>}</div>;
};

export default VideoList;
