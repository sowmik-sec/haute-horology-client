import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { googleSignIn } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => console.error(err));
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
