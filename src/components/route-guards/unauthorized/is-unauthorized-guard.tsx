import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userAtom } from "../../../store/auth";

const IsUnauthorizedGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useAtomValue(userAtom);
  if (!user) {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
};

export default IsUnauthorizedGuard;
