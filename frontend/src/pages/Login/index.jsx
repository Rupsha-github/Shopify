import { useState } from "react";
import { useAuth } from "../../context/auth-context.jsx";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

export const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData.email, formData.password);
    if (!res.success) setError(res.message);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
