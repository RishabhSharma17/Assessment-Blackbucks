import { useDispatch } from "react-redux";
import { fetchMe, loginUser } from "../features/auth/authSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";


export default function Login() {
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((s: RootState) => s.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "ADMIN") navigate("/admin/users");
    if (user?.role === "MANAGER") navigate("/manager/projects");
    if (user?.role === "USER") navigate("/user/tasks");
  }, [user]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 shadow w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="border w-full mb-2 p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full mb-2 p-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={
            async() => {
              await dispatch(loginUser({ email, password }));
              await dispatch(fetchMe());
            }
          }
          className="bg-blue-600 text-white w-full p-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}