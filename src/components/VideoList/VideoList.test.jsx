import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import VideoList from './VideoList.component';

const items = {
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
};

describe('render VideoList', () => {
  const wrapper = mount(
    <Router>
      <VideoList {...items} />
    </Router>
  );

  it('renders VideoList Component', () => {
    expect(wrapper).toBeTruthy();
  });
});
