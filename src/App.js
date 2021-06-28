import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserContext from './context/userContext';
import { ProtectedRoute, UserRedirect } from './helpers/protected_routes';
import UserAuthListener from './hooks/user_auth';






const Login = lazy(() => import('./pages/Login/login'));
const Register = lazy(() => import('./pages/Register/register'));
const NotFound = lazy(() => import('./components/notFound.component'))
const Dashboard = lazy(() => import('./pages/Dashboard/dashboard'));
const Profile = lazy(() => import('./pages/Profile/profile'));

const App = () => {
  const { user } = UserAuthListener();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UserContext.Provider value={{ user }}>
          <Switch>
            <UserRedirect user={user} path="/login" exact>
              <Login />
            </UserRedirect>
            <UserRedirect user={user} path="/register" exact >
              <Register />
            </UserRedirect>
            <ProtectedRoute user={user} path='/' exact>
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute user={user} path='/profile/:username' exact>
              <Profile />
            </ProtectedRoute>
            <Route path="*" component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </Suspense>
    </>
  );
}

export default App;
