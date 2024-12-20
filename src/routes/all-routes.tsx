import { BrowserRouter, Route, Routes } from "react-router-dom";
import IsUnauthorizedGuard from "../components/route-guards/unauthorized/is-unauthorized-guard";
import DashboardLayout from "../components/layout/admin-layout/admin-layout";
import { DASHBOARD_ROUTES } from "./dashboard/dasboard-routes";
import { AUTH_ROUTES } from "./auth/auth-routes";
import AuthLayout from "../components/layout/auth/authlayout";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>{AUTH_ROUTES}</Route>
        <Route
          path="admin"
          element={
            <IsUnauthorizedGuard>
              <DashboardLayout />
            </IsUnauthorizedGuard>
          }
        >
          {DASHBOARD_ROUTES}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
