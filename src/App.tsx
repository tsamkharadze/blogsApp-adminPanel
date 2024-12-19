import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, useEffect, useState } from "react";
import SignInView from "./components/pages/sign-in/view/sign-in-view";
import { useAtom } from "jotai";
import { userAtom } from "./store/auth";
import { supabase } from "./supabase";
import UsersView from "./components/pages/users/views/users-view";
import EditView from "./components/pages/users/views/edit-view";
import CreateUserView from "./components/pages/users/views/create-user-view";
import BlogsListView from "./components/pages/blogs/views/blogs-list-view";
import BlogEditView from "./components/pages/blogs/views/blog-edit-view";
import IsAuthorizedGuard from "./components/route-guards/authorized/is-authorized-guard";
import IsUnauthorizedGuard from "./components/route-guards/unauthorized/is-unauthorized-guard";
import AddBlogView from "./components/pages/blogs/views/add-blog-view";
import DashboardLayout from "./components/layout/admin-layout/admin-layout";
import AuthLayout from "./components/layout/auth/authlayout";

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
        <Route element={<AuthLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <IsAuthorizedGuard>
                  <SignInView />
                </IsAuthorizedGuard>
              </Suspense>
            }
          />
        </Route>
        <Route
          path="admin"
          element={
            <IsUnauthorizedGuard>
              <DashboardLayout />
            </IsUnauthorizedGuard>
          }
        >
          <Route path="users" element={<UsersView />} />
          <Route path="users/edit/:id" element={<EditView />} />
          <Route path="users/create" element={<CreateUserView />} />
          <Route path="blogs" element={<BlogsListView />} />
          <Route path="blogs/edit/:id" element={<BlogEditView />} />
          <Route path="blogs/create" element={<AddBlogView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
