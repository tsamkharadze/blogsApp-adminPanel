/* eslint-disable react-refresh/only-export-components */

import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const UsersView = lazy(
  () => import("../../components/pages/users/views/users-view")
);
const EditView = lazy(
  () => import("../../components/pages/users/views/edit-view")
);
const CreateUserView = lazy(
  () => import("../../components/pages/users/views/create-user-view")
);
const BlogsListView = lazy(
  () => import("../../components/pages/blogs/views/blogs-list-view")
);
const BlogEditView = lazy(
  () => import("../../components/pages/blogs/views/blog-edit-view")
);
const AddBlogView = lazy(
  () => import("../../components/pages/blogs/views/add-blog-view")
);

export const DASHBOARD_ROUTES = [
  <Route
    path="users"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <UsersView />
      </Suspense>
    }
  />,
  <Route
    path="users/edit/:id"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <EditView />
      </Suspense>
    }
  />,
  <Route
    path="users/create"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <CreateUserView />
      </Suspense>
    }
  />,
  <Route
    path="blogs"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <BlogsListView />
      </Suspense>
    }
  />,
  <Route
    path="blogs/edit/:id"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <BlogEditView />
      </Suspense>
    }
  />,
  <Route
    path="blogs/create"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <AddBlogView />
      </Suspense>
    }
  />,
];
