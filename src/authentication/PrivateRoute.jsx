import { useAuth } from './authProvider';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth(); // Assuming `useAuth` provides `isAuthenticated`

  // If authenticated, render the child routes (Outlet)
  // Otherwise, redirect to /signin
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;