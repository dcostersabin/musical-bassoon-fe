import {useSelector} from "react-redux"
import {Navigate} from 'react-router-dom'

const GuestGuard = ({children}) =>{

  const {isAuthenticated,isInitialized} = useSelector(
    (state) => state.auth
  );

  if (!isInitialized){
    return <div>Loading</div>
  }

  if (isAuthenticated){
    return <Navigate to="/dashboard/home"/>;
  }

  return <>{children}</>
}

export default GuestGuard
