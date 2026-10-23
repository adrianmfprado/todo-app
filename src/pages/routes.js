import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './home';

const Login = lazy(() => import('./Login'));
const User = lazy(() => import('./User'));

const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<div className='route-loading'>Carregando...</div>}>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>

          <Route exact path='/login'>
            <Login />
          </Route>

          <Route exact path='/:username'>
            <User />
          </Route>

          <Route exact path='/:username/:name/:age'>
            <User />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;