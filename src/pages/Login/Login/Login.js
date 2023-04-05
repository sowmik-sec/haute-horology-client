import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { googleSignIn, signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="w-80 mx-auto mt-10">
      <p className="text-center text-xl">Login</p>
      <form onSubmit={handleLogin}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <Link className="text-sm text-blue-500 hover:text-blue-700">
          Forgot password?
        </Link>
        {error && <p className="text-error">{error}</p>}
        <input
          className="btn btn-primary mt-3 w-full"
          type="submit"
          value="Login"
        />
      </form>

      <div>
        <p>
          New to this website?{" "}
          <Link to="/signup" className="text-primary">
            Create an account
          </Link>
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline mt-3 w-full"
        >
          Continue with google
        </button>
      </div>
    </div>
  );
};

export default Login;
