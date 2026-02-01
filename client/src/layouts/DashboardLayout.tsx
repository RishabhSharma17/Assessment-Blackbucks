import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { logoutUser } from "../features/auth/authSlice";

export default function DashboardLayout() {
  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch<any>();

  const firstLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="h-14 bg-white shadow flex items-center justify-between px-6">
        <h1 className="text-xl font-bold">TaskFlow</h1>

        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {firstLetter}
          </div>

          <button
            onClick={() => dispatch(logoutUser())}
            className="text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r p-4">
          {user?.role === "ADMIN" && (
            <>
              <Link to="/admin/users" className="block mb-3">
                Users
              </Link>
              <Link to="/admin/projects" className="block">
                Projects
              </Link>
            </>
          )}

          {user?.role === "MANAGER" && (
            <Link to="/manager/projects" className="block">
              Projects
            </Link>
          )}

          {user?.role === "USER" && (
            <Link to="/user/tasks" className="block">
              My Tasks
            </Link>
          )}
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
