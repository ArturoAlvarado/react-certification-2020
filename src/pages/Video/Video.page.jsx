import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as axios from 'axios';
import VideoList from '../../components/VideoList';

function Video(props) {
  const { id } = props.match.params;
  const [relatedVideos, setRelatedVideos] = useState(null);

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
      if (mounted) {
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
      <VideoList {...relatedVideos} />
    </section>
  );
}

export default Video;
