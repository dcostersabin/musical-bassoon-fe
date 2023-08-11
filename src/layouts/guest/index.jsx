import { Outlet } from "react-router-dom";
import {GuestContainer} from "../../styles/auth.styles"
const GuestLayout = () => {
  return (

    <GuestContainer>
      <div className="d-flex flex-column h-100 w-100 min-vh-100 min-vw-100">
        <Outlet />
      </div>
    </GuestContainer>
  );
};

export default GuestLayout;
