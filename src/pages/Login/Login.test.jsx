
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvier from '../../providers/Auth';
import Login from './Login.page';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
describe('render Login', () => {

  const wrapper = mount(
    <Router>
      <AuthProvier>
          <Login />
      </AuthProvier>
    </Router>
  );

  it('renders Login Component', () => {
    const submitEvent = { preventDefault: () => console.log('preventDefault') };
    expect(wrapper.find('.login-form').length).toBe(1);
    wrapper.find('.login-form').simulate('submit', submitEvent);
  });
  it('renders Login Component', () => {
    wrapper.find('#username').simulate('change','user');
    wrapper.find('#password').simulate('change','password');

    wrapper.find('.login-form').simulate('submit');
  });
});
