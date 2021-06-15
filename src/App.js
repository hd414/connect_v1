import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './pages/Register/register';

const Login = lazy(() => import('./pages/Login/login'));


const App = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
