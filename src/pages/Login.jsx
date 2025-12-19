import { useState } from "react";
import api from "../services/api";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // NORMAL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful");
      console.log("Token:", res.data.token);
      console.log("User info:", res.data.user);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  // GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setMessage("Google login failed: missing credential");
      return;
    }

    try {
      const res = await api.post("/auth/google", {
        token: credentialResponse.credential,
      });
   
      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Google login successful");
      console.log("Token:", res.data.token);
      console.log("User info:", res.data.user);
    } catch (error) {
      console.error(error);
      setMessage("Google login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              className="input input-bordered"
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-full">Login</button>
        </form>

        <div className="divider">OR</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setMessage("Google Login Failed")}
        />

        {message && (
          <p className="text-center text-sm mt-4 text-error">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
