import React, { useRef, useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as axios from 'axios';
import { useAuth } from '../../providers/Auth';
import VideoList from '../../components/VideoList';
import './Home.styles.css';

function HomePage() {
  const history = useHistory();
  const sectionRef = useRef(null);
  const { authenticated, logout } = useAuth();

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/');
  }
  const [videos, setVideos] = useState(null);

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

  return (
    <>
      {authenticated ? (
        <div className="homepage" ref={sectionRef}>
          <h1>Video App!</h1>
          <nav>
            <Link to="/" onClick={deAuthenticate}>
              ← logout
            </Link>
          </nav>
          <VideoList {...videos} />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default HomePage;
