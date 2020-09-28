import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as axios from 'axios';
import VideoList from '../../components/VideoList';
import { useFavoriteVideos } from '../../providers/FavoriteVideos';

function Video(props) {
  const { id } = props.match.params;
  const [relatedVideos, setRelatedVideos] = useState(null);
  const [info, setVideoInfo] = useState(null);
  const { favoriteVideos, changeFavorites } = useFavoriteVideos();

  const toggleFavorite = () => {
    if (favoriteVideos.has(id)) {
      changeFavorites({ type: 'remove', payload: id })
    } else {
      changeFavorites({ type: 'add', payload: id })
    }
  }
  useEffect(() => {
    let mounted = true;

    const fetchRelatedVideos = async () => {
      const result = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          key: process.env.REACT_APP_YOUTUBE_API,
          relatedToVideoId: id,
          type: 'video',
          maxResults: 10,
        },
      });
      const info = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          key: process.env.REACT_APP_YOUTUBE_API,
          id: id,
        },
      });
      if (mounted) {
        console.log(info.data)
        setVideoInfo(info.data.items[0])
        setRelatedVideos(result.data);
      }
    };
    fetchRelatedVideos();

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <section>
      <pre>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </pre>
      <iframe
        width="800"
        height="450"
        allowFullScreen
        frameBorder="0"
        title="rick roll"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
      {info ? <div>{info.snippet.title}</div> : ''}

      <button type="button" onClick={() => toggleFavorite()}>
        {favoriteVideos.has(id) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <div>Related Videos</div>
      <VideoList {...relatedVideos} />
    </section>
  );
}

export default Video;
