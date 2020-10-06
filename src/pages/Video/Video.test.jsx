import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import * as axios from 'axios';
import FavoriteVideosProvider from '../../providers/FavoriteVideos';
import AuthProvier from '../../providers/Auth';
import Video from './Video.page';

const props = {
  match: {
    params: {
      id: 'Wsije1KetVw',
    },
  },
  kind: 'youtube#video',
  snippet: {
    description:
      'Chris Wallace (Beck Bennett) moderates the first presidential debate between Donald Trump (Alec Baldwin) and Joe Biden (Jim Carrey).',
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
};
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
          <Video {...props} />
        </FavoriteVideosProvider>
      </AuthProvier>
    </Router>
  );

  it('renders Video Component', () => {
    expect(wrapper.find('a').length).toEqual(3);
  });
});
