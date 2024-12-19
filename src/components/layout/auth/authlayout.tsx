import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="mt-20">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
