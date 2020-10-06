import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import FavoriteVideosProvider from '../../providers/FavoriteVideos';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import Video from '../../pages/Video';
import Favorites from '../../pages/Favorites';

import Private from '../Private';
import Layout from '../Layout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoriteVideosProvider>
          <Layout>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Private exact path="/" component={HomePage} />
              <Private exact path="/video/:id" component={Video} />
              <Private exact path="/favorites" component={Favorites} />
            </Switch>
          </Layout>
        </FavoriteVideosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
