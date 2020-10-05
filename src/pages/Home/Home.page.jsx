import React, { useState, useEffect } from 'react';
import * as axios from 'axios';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import VideoList from '../../components/VideoList';
import './Home.styles.css';

const Header = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: column;
  align-items: center;
  background: #202020;
  margin-bottom: 2rem;
`;
const Title = styled('h1')`
  margin: 0;
`;
const SearchButton = styled('button')`
  cursor: pointer;
  width: 65px;
  padding: 5px;
  border: none;
  background-color: #505050;
  border-radius: 5px;
  margin: 0 10px;
  color: white;
`;
function HomePage() {
  const [videos, setVideos] = useState(null);
  const [searchParam, setSearchParam] = useState('');
  useEffect(() => {
    let mounted = true;

    const fetchVideos = async () => {
      const result = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          maxResults: 20,
          key: process.env.REACT_APP_YOUTUBE_API,
          chart: 'mostPopular',
        },
      });
      if (mounted) {
        setVideos(result.data);
      }
    };
    fetchVideos();

    return () => {
      mounted = false;
    };
  }, []);

  const searchVideos = async () => {
    const result = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        key: process.env.REACT_APP_YOUTUBE_API,
        q: searchParam,
      },
    });
    setVideos(result.data);
  };

  return (
    <>
      <div className="homepage">
        <Navbar />
        <Header>
          <Title>Video App!</Title>
          <div>
            <input
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              type="text"
            />
            <SearchButton type="button" onClick={() => searchVideos()}>
              Search
            </SearchButton>
          </div>
        </Header>
        <VideoList columns={3} {...videos} />
      </div>
    </>
  );
}

export default HomePage;
