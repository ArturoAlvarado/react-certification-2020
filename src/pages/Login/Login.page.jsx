import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';
import './Login.styles.css';

function LoginPage() {
  const { authenticated, login } = useAuth();
  const [ credentials, setCredentials ] = useState({ user: '', password: '' })
  const history = useHistory();

  function authenticate(event) {
    if (credentials.user === 'user' && credentials.password === 'password') {
      event.preventDefault();
      login();
      history.push('/');
    }
  }

  return (
    <>
      {authenticated ? (
        <Redirect to="/" />
      ) : (
          <div className="login_container">
            <section className="login">
              <h1>Welcome back!</h1>
              <form onSubmit={authenticate} className="login-form">
                <div className="form-group">
                  <label htmlFor="username">
                    <strong>username </strong>
                    <input required type="text" id="username" onChange={(e) => setCredentials({ ...credentials, user: e.target.value })} />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <strong>password </strong>
                    <input required type="password" id="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                  </label>
                </div>
                <button id="login" type="submit">
                  login
              </button>
              </form>
            </section>
          </div>
        )}
    </>
  );
}

export default LoginPage;
