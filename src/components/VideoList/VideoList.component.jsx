import React from 'react';
import styled from 'styled-components';
import VideoMini from '../VideoMini';

const Container = styled('div')`
  display: grid;
  grid-template-columns: ${({ columns }) => 'auto '.repeat(columns)};
  row-gap: 1rem;
  justify-content: space-around;
`;
const VideoList = ({ items, withDescription, columns }) => {
  const renderVideos = () => {
    return items.map((video) => (
      <VideoMini
        withDescription={withDescription}
        key={typeof video.id === 'string' ? video.id : video.id.videoId}
        {...video}
      />
    ));
  };
  return <Container columns={columns}>{items ? renderVideos() : <></>}</Container>;
};

export default VideoList;
