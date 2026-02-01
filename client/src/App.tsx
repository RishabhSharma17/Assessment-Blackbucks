import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import { ProtectedRoute } from './routes/ProptectedRoute'
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminProjects from "./pages/Admin/AdminProjects";
import ManagerProjects from "./pages/Manager/ManagerProjects";
import UserTasks from "./pages/User/UserTask";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "./features/auth/authSlice";
import ProjectDetails from "./pages/Manager/ProjectDetails";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "./app/store";

function RootRedirect() {
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "ADMIN")
    return <Navigate to="/admin/users" replace />;

  if (user.role === "MANAGER")
    return <Navigate to="/manager/projects" replace />;

  return <Navigate to="/user/tasks" replace />;
}


export default function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/projects"
          element={
            <ProtectedRoute roles={["MANAGER"]}>
              <ManagerProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/projects/:id"
          element={
            <ProtectedRoute roles={["MANAGER"]}>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/tasks"
          element={
            <ProtectedRoute roles={["USER"]}>
              <UserTasks />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}