/* eslint-disable react-refresh/only-export-components */

import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import IsAuthorizedGuard from "../../components/route-guards/authorized/is-authorized-guard";

const SignInView = lazy(
  () => import("../../components/pages/sign-in/view/sign-in-view")
);

export const AUTH_ROUTES = [
  <Route
    key="landing"
    path="/"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <IsAuthorizedGuard>
          <SignInView />
        </IsAuthorizedGuard>
      </Suspense>
    }
  />,
];
