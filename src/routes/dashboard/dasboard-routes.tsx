/* eslint-disable react-refresh/only-export-components */
import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import EditView from "../../components/pages/users/views/edit-view";
import { DASHBOARD_PATHS } from "./dashboard.enum";

const UsersView = lazy(
  () => import("../../components/pages/users/views/users-view")
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

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

const routes = [
  {
    key: " users-list",
    path: DASHBOARD_PATHS.USERS_LIST,
    element: <UsersView />,
  },
  { key: "user-edit", path: DASHBOARD_PATHS.USERS_EDIT, element: <EditView /> },
  {
    key: "create-user",
    path: DASHBOARD_PATHS.USERS_CREATE,
    element: <CreateUserView />,
  },
  {
    key: "blogs-list",
    path: DASHBOARD_PATHS.BLOGS_LIST,
    element: <BlogsListView />,
  },
  {
    key: "blogs-edit",
    path: DASHBOARD_PATHS.BLOGS_EDIT,
    element: <BlogEditView />,
  },
  {
    key: "add-blog",
    path: DASHBOARD_PATHS.BLOGS_CREATE,
    element: <AddBlogView />,
  },
];

export const DASHBOARD_ROUTES = routes.map(({ path, element }) => (
  <Route
    key={path}
    path={path}
    element={<SuspenseWrapper>{element}</SuspenseWrapper>}
  />
));
