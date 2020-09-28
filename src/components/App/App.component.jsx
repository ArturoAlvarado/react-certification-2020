import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import FavoriteVideosProvider from '../../providers/FavoriteVideos';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import Video from '../../pages/Video';
import Favorites from '../../pages/Favorites';

import Private from '../Private';
import Layout from '../Layout';
import { random } from '../../utils/fns';

function App() {
  useLayoutEffect(() => {
    const { body } = document;

    function rotateBackground() {
      const xPercent = random(100);
      const yPercent = random(100);
      body.style.setProperty('--bg-position', `${xPercent}% ${yPercent}%`);
    }

    const intervalId = setInterval(rotateBackground, 3000);
    body.addEventListener('click', rotateBackground);

    return () => {
      clearInterval(intervalId);
      body.removeEventListener('click', rotateBackground);
    };
  }, []);

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
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Layout>
        </FavoriteVideosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
