import { Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import routes from './routes';
import store from './core/redux';

import { Provider } from 'react-redux';
import AuthGuardedRoute from './core/guards/auth-guard';
import UnAuthGuardedRoute from './core/guards/un-auth-guard';
import Loader from './components/Loader';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if ( isLoading ) {
    return (
      <Loader />
    )
  }

  return (
    <Provider store={store}>
      <Switch>
        { routes.map( r => (
          r.protected ?
            <UnAuthGuardedRoute key={r.name} path={r.link} exact component={r.component} auth={isAuthenticated} /> :
            <AuthGuardedRoute key={r.name} path={r.link} exact component={r.component} auth={isAuthenticated} />
        ) ) }
      </Switch>
    </Provider>
  );
}

export default App;
