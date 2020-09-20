import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../../providers/Auth';

function Private({ component: Component, ...rest }) {
  const { authenticated } = useAuth();
  return (
    <Route
      {...rest}
      component={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default Private;
