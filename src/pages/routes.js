import {
  BrowserRouter,
  Route,
  Switch,
  useParams,
  Link
} from 'react-router-dom';
import HomePage from './home';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
        
        <Route exact path="/:username">
          <User />
        </Route>
        
        <Route exact path="/:username/:name/:age">
          <User />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const Login = () => {
  return (
    <h1>Login Page</h1>
  );
};

const User = () => {
  const { username, name } = useParams();
  return (
    <div>
      <h1>User Profile Page</h1>
      <h2>Username: { username }</h2>
      <h2>Nome: {name}</h2>
      
      <Link to="/">Ir para a home</Link>
      <div>ou</div>
      <Link to="/login">Ir para a login</Link>
    </div>
  );
};

export default AppRouter;