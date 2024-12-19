import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userAtom } from "../../../store/auth";

const IsAuthorizedGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useAtomValue(userAtom);
  if (user) {
    return <Navigate to="/admin" />;
  }

  return children || <Outlet />;
};

export default IsAuthorizedGuard;
