import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const UserGuard = ({ children }) => {
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  const { isAuthenticated, isInitialized} =
    useSelector((state) => state.auth);

  if (!isInitialized) {
    return "Loading";
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to="/auth" />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return children;
};

export default UserGuard;
