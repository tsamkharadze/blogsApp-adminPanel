import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, useEffect, useState } from "react";
import SignInView from "./components/pages/sign-in/view/sign-in-view";
import DashboardView from "./components/pages/dashboard/view/dashboard-view";
import AdminLayout from "./components/layout/admin-layout/admin-layout";
import { useAtom } from "jotai";
import { userAtom } from "./store/auth";
import { supabase } from "./supabase";
import UsersView from "./components/pages/users/views/users-view";
import EditView from "./components/pages/users/views/edit-view";
import CreateUserView from "./components/pages/users/views/create-user-view";

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
          <Route path="users/edit/:id" element={<EditView />} />
          <Route path="users/create" element={<CreateUserView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
