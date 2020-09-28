import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as axios from 'axios';
import { useAuth } from '../../providers/Auth';

import VideoList from '../../components/VideoList';
import './Home.styles.css';

function HomePage() {
  const history = useHistory();
  const sectionRef = useRef(null);
  const { logout } = useAuth();
  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/login');
  }
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
  }

  return (
    <>
      <div className="homepage" ref={sectionRef}>
        <nav>
          <Link to="/favorites">Favorites</Link>
          <Link to="/" onClick={deAuthenticate}>
            ← logout
          </Link>
        </nav>
        <h1>Video App!</h1>
        <input value={searchParam} onChange={e => setSearchParam(e.target.value)} type='text' />
        <button type="button" onClick={() => searchVideos()}>Search</button>

        <VideoList {...videos} />
      </div>
    </>
  );
}

export default HomePage;
