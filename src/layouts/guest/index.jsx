import { Outlet } from "react-router-dom";
const GuestLayout = () => {
  return (
    <div className="guest-container">
      <div className="d-flex flex-column h-100 w-100 min-vh-100 min-vw-100">
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
