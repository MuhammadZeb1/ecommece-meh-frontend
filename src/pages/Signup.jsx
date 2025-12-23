import { useState } from "react";
import api from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // NORMAL SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Signup successful", {
        position: "bottom-right",
      });
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  // GOOGLE SIGNUP / LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post("/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      setMessage("Google signup successful");
    } catch (error) {
      setMessage("Google signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              className="input border border-black"
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              className="input border border-black"
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
              className="input border border-black"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-full">Signup</button>
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

export default Signup;
