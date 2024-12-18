import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, useEffect, useState } from "react";
import SignInView from "./components/pages/sign-in/view/sign-in-view";
import DashboardView from "./components/pages/dashboard/view/dashboard-view";
import AdminLayout from "./components/layout/admin-layout/admin-layout";
import { useAtom } from "jotai";
import { userAtom } from "./store/auth";
import { supabase } from "./supabase";
import UsersView from "./components/pages/users/view/users-view";

function App() {
  const [, setUser] = useAtom(userAtom);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
      setIsloading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SignInView />
            </Suspense>
          }
        />
        <Route path="admin" element={<AdminLayout />}>
          <Route path="blogs" element={<DashboardView />} />
          <Route path="users" element={<UsersView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
