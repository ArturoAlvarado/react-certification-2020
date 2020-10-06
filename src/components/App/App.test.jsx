import React from 'react';
import { mount } from 'enzyme';
import App from './App.component';

describe('render examples', () => {
  it('renders App Component', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toBeTruthy();
  });
});
