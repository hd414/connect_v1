import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserContext from './context/userContext';
import UserAuthListener from './hooks/user_auth';





const Login = lazy(() => import('./pages/Login/login'));
const Register = lazy(() => import('./pages/Register/register'));
const NotFound = lazy(() => import('./components/notFound.component'))
const Dashboard = lazy(() => import('./pages/Dashboard/dashboard'))

const App = () => {
  const { user } = UserAuthListener();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UserContext.Provider value={{ user }}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Dashboard} />
            <Route path="*" component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </Suspense>
    </>
  );
}

export default App;
