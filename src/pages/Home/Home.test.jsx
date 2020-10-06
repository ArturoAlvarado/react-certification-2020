import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import * as axios from 'axios';
import FavoriteVideosProvider from '../../providers/FavoriteVideos';
import AuthProvier from '../../providers/Auth';
import Home from './Home.page';

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('render Favorites', () => {
  jest.spyOn(axios, 'default').mockResolvedValue({
    items: [
      {
        etag: 'x00JMWozTTOwlnnTWNGAtEyjI6U',
        id: 'Wsije1KetVw',
        kind: 'youtube#video',
        snippet: {
          title: 'test',
          channelTitle: 'test',
          thumbnails: {
            medium: {
              url: 'https://i.ytimg.com/vi/L2GQmOYFCy4/mqdefault.jpg',
              width: 320,
              height: 180,
            },
          },
        },
      },
    ],
  });
  const wrapper = mount(
    <Router>
      <AuthProvier>
        <FavoriteVideosProvider>
          <Home />
        </FavoriteVideosProvider>
      </AuthProvier>
    </Router>
  );

  it('renders Home Component', () => {
    expect(wrapper.find('h1').text()).toEqual('Video App!');
  });
});
