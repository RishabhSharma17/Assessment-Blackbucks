import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

export const ProtectedRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: string[];
}) => {
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) return <Navigate to="/login" />;

  if (!roles.includes(user.role)) return <div>Unauthorized</div>;

  return children;
};