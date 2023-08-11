import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// actions
import { initialize } from "../pages/auth/redux/auth.slice";
import { useUserDetailsQuery } from "../pages/auth/redux/auth.api";

const InitializeGuard = ({ children }) => {
  const dispatch = useDispatch();


  const { data: response, isSuccess,refetch } = useUserDetailsQuery(
    {},
    { skip: !localStorage.getItem("access") }
  );

  const initializeUser = async () => {
    if (response) {
      dispatch(
        initialize({
          isAuthenticated: true,
          user: response,
        })
      );
    } else {
      dispatch(
        initialize({
          isAuthenticated: false,
          user: null,
        })
      );
    }

  };

  useEffect(() => {
    initializeUser();
  }, [isSuccess]);

  return children;
};

export default InitializeGuard;
