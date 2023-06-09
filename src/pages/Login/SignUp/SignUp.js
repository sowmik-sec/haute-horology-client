import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useToken from "../../../hooks/useToken";
import useTitle from "../../../hooks/useTitle";

const SignUp = () => {
  useTitle("Sign Up");
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [createdEmail, setCreatedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token] = useToken(createdEmail);
  // const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/";
  if (token) {
    navigate("/");
  }
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, e.target.role.value);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUser(firstName, lastName)
          .then(() => {
            console.log("Profile Updated");
            userFn(firstName + " " + lastName, email, e.target.role.value);
            setCreatedEmail(email);
            // setFirstName("");
            // setLastName("");
            // setEmail("");
            // setPassword("");
            // navigate(from, { replace: true });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => setError(err.message));
  };

  const userFn = (name, email, role) => {
    const mkUser = { name, email, role };
    fetch(`https://houte-horology-server.vercel.app/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mkUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        userFn(result.user.displayName, result.user.email, "buyer");
        setCreatedEmail(result.user.email);
        // navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="w-80 mx-auto mt-10">
      <p className="text-center text-xl">Sign Up</p>
      <form onSubmit={handleLogin}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
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
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Choose a role</span>
          </label>
          <select name="role" id="" className="select select-bordered w-full">
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        {error && <p className="text-error">{error}</p>}
        <input
          className="btn btn-primary mt-3 w-full"
          type="submit"
          value="Sign Up"
        />
      </form>

      <div>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
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

export default SignUp;
