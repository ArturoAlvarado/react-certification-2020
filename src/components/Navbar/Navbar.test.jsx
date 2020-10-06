import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from '../../providers/Auth';
import Navbar from './Navbar.component';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('render Navbar', () => {
  const wrapper = mount(
    <Router>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </Router>
  );

  it('renders Navbar Component', () => {
    expect(wrapper).toBeTruthy();
  });

  it('logs out', () => {
    wrapper.find('#logout').first().simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
  });
});
