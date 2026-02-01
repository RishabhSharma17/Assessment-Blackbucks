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

export default function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <Routes>
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