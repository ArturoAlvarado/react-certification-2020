import React from 'react';
import { Link } from 'react-router-dom';

const VideoMini = (props) => {
  const { snippet } = props;
  const thumbnail = snippet.thumbnails.medium;
  return (
    <Link to={`/video/${typeof props.id === 'string' ? props.id : props.id.videoId}`}>
      <div>
        <img
          alt={snippet.title}
          src={thumbnail.url}
          width={thumbnail.width}
          height={thumbnail.height}
        />
        <div>{snippet.title}</div>
        <div>{snippet.channelTitle}</div>
      </div>
    </Link>
  );
};

export default VideoMini;
