import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as axios from 'axios';
import VideoList from '../../components/VideoList';
import { useFavoriteVideos } from '../../providers/FavoriteVideos';
import Navbar from '../../components/Navbar';

const Container = styled('div')`
  margin: 0 1rem ;
`
function Favorites(props) {
  const { id } = props.match.params;
  const [favVideos, setFavVideos] = useState(null);
  const { favoriteVideos } = useFavoriteVideos();

  useEffect(() => {
    let mounted = true;
    const fetchFavoriteVideos = async () => {
      const result = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          key: process.env.REACT_APP_YOUTUBE_API,
          id: [...favoriteVideos].join(),
        },
      });
      if (mounted) {
        console.log(result.data);
        setFavVideos(result.data);
      }
    };
    fetchFavoriteVideos();

    return () => {
      mounted = false;
    };
  }, [id, favoriteVideos]);

  return (
    <Container>
      <Navbar/>
      <h1>Favorites</h1>
      <VideoList withDescription {...favVideos} />
    </Container>
  );
}

export default Favorites;
