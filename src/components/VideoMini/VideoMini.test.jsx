import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import VideoMini from './VideoMini.component';

const item = {
  etag: 'x00JMWozTTOwlnnTWNGAtEyjI6U',
  id: 'Wsije1KetVw',
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

describe('render VideoList', () => {
  it('renders VideoList  with Desc', () => {
    const wrapper = mount(
      <Router>
        <VideoMini {...item} withDescription />
      </Router>
    );
    expect(wrapper.find('#desc').first().text()).toEqual(
      'Chris Wallace (Beck Bennett) moderates the first presidential debate between Donald Trump (Alec Baldwin) and Joe Biden (Jim Carrey).'
    );
  });

  it('renders VideoList without Desc', () => {
    const wrapper = mount(
      <Router>
        <VideoMini {...item} withDescription={false} />
      </Router>
    );
    expect(wrapper.find('#title').text()).toEqual('test');
  });
});
