import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import styled from 'styled-components';

import Navbar from '../../components/Navbar';
import VideoList from '../../components/VideoList';
import { useFavoriteVideos } from '../../providers/FavoriteVideos';

const Container = styled('div')`
  display: grid;
  grid-template-columns: 66% 1fr;
  grid-auto-flow: column;
  column-gap: 1rem;
  padding: 1rem;
`;
const FavButton = styled('button')`
  cursor: pointer;
  width: 190px;
  padding: 5px;
  border: none;
  background-color: #505050;
  border-radius: 5px;
  margin: 0 10px;
  color: white;
`;
const SubTitle = styled('div')`
  text-align: center;
`;

function Video(props) {
  const { id } = props.match.params;
  const [relatedVideos, setRelatedVideos] = useState(null);
  const [info, setVideoInfo] = useState(null);
  const { favoriteVideos, changeFavorites } = useFavoriteVideos();

  const toggleFavorite = () => {
    if (favoriteVideos.has(id)) {
      changeFavorites({ type: 'remove', payload: id });
    } else {
      changeFavorites({ type: 'add', payload: id });
    }
  };
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
      const vidInfo = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          key: process.env.REACT_APP_YOUTUBE_API,
          id,
        },
      });
      if (mounted) {
        console.log(vidInfo.data);
        setVideoInfo(vidInfo.data.items[0]);
        setRelatedVideos(result.data);
      }
    };
    fetchRelatedVideos();

    return () => {
      mounted = false;
    };
  }, [id, favoriteVideos, changeFavorites]);

  return (
    <section>
      <Navbar />
      <Container>
        <div>
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

          <FavButton type="button" onClick={() => toggleFavorite()}>
            {favoriteVideos.has(id) ? (
              <>
                <i className="fa fa-star" /> Remove from Favorites
              </>
            ) : (
              <>
                <i className="fa fa-star-o" /> Add to Favorites
              </>
            )}
          </FavButton>
        </div>
        <div>
          <SubTitle>Related Videos</SubTitle>
          <VideoList {...relatedVideos} />
        </div>
      </Container>
    </section>
  );
}

export default Video;
