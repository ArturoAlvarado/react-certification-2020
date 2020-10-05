import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled('div')`
  font-weight: normal;
`;

const VideoMini = (props) => {
  const { snippet } = props;
  const thumbnail = snippet.thumbnails.medium;
  return (
    <Link to={`/video/${typeof props.id === 'string' ? props.id : props.id.videoId}`}>
      <img
        alt={snippet.title}
        src={thumbnail.url}
        width={thumbnail.width}
        height={thumbnail.height}
      />
      <Title>{snippet.title}</Title>
      <div>{snippet.channelTitle}</div>
      {props.withDescription ? <div>{snippet.description}</div> : ''}
    </Link>
  );
};

export default VideoMini;
