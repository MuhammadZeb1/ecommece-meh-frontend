import { useState } from "react";
import api from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // NORMAL LOGIN
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", form);

    // ✅ SAVE TOKEN + ROLE
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    console.log("ROLE FROM LOGIN:", res.data.user.role);

    toast.success("Login successful");
    navigate("/");
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
  }
};

  
  // GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const res = await api.post("/auth/google", {
      token: credentialResponse.credential,
    });

    // ✅ SAVE TOKEN + ROLE
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    console.log("ROLE FROM GOOGLE LOGIN:", res.data.user.role);

    toast.success("Login successful");
    navigate("/");
  } catch (error) {
    toast.error("Google login failed");
  }
};

  

  return (
    <motion.div
      className="flex justify-center items-center h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="card w-96 bg-white shadow-xl p-6"
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              className="input border border-black"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input border border-black"
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary w-full"
          >
            Login
          </motion.button>
        </form>

        <div className="divider">OR</div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setMessage("Google Login Failed")}
          />
        </motion.div>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </NavLink>
        </p>

        {message && (
          <p className="text-center text-sm mt-2 text-error">{message}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Login;
