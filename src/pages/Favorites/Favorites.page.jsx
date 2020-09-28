import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as axios from 'axios';
import VideoList from '../../components/VideoList';

function Favorites(props) {
  const { id } = props.match.params;
  const [favVideos, setFavVideos] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchFavoriteVideos = async () => {
      const result = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 20,
          key: process.env.REACT_APP_YOUTUBE_API,
          chart: 'mostPopular',
        },
      });
      if (mounted) {
        setFavVideos(result.data);
      }
    };
    fetchFavoriteVideos();

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <section>
      <h1>Favorites</h1>
      <pre>
        <Link to="/">Home</Link>
      </pre>
      <VideoList {...favVideos} />
    </section>
  );
}

export default Favorites;
