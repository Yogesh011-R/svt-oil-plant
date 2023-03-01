import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, path }) => {
  const accessToken = 'Test',
    refreshToken = 'test';

  const location = useLocation();

  if (!accessToken && !refreshToken) {
    return <Navigate replace to='/auth/login' state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
