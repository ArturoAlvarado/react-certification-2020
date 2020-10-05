import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MiniContainer = styled('div')`
  max-width: 320px;
`;

const LinkWithDesc = styled(Link)`
  display: grid;
  grid-auto-flow: column;
  column-gap: 1rem;
`;
const Author = styled('div')`
  font-weight: normal;
  text-align: center;
  display: inline-block;
  opacity: 0.7;
`;

const Description = styled('div')`
  font-weight: normal;
  text-align: left;
  display: inline-block;
`;
const renderInfo = (thumbnail, snippet) => (
  <MiniContainer>
    <img
      alt={snippet.title}
      src={thumbnail.url}
      width={thumbnail.width}
      height={thumbnail.height}
    />
    <div>{snippet.title}</div>
    <Author>{snippet.channelTitle}</Author>
  </MiniContainer>
);
const VideoMini = (props) => {
  const { snippet, withDescription } = props;
  const thumbnail = snippet.thumbnails.medium;
  return withDescription ? (
    <LinkWithDesc
      to={`/video/${typeof props.id === 'string' ? props.id : props.id.videoId}`}
    >
      {renderInfo(thumbnail, snippet)}
      <Description>{snippet.description}</Description>
    </LinkWithDesc>
  ) : (
    <Link to={`/video/${typeof props.id === 'string' ? props.id : props.id.videoId}`}>
      {renderInfo(thumbnail, snippet)}
    </Link>
  );
};

export default VideoMini;
