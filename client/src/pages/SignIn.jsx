import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Fixed: Added dispatch
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart()); // Fixed: Use dispatch instead of setLoading
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // Fixed: Use dispatch instead of dispatchEvent
        return;
      }
      dispatch(signInSuccess(data)); // Fixed: Use dispatch instead of dispatchEvent
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message)); // Fixed: Use error.message instead of data.message
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg" // Fixed: rounded-lg instead of rounded lg
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg" // Fixed: rounded-lg instead of rounded lg
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" // Fixed: disabled:opacity-80
        >
          {loading ? "Loading.." : "Sign In"}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don't Have an Account?</p>
        <Link to={"/signup"}>
          {" "}
          {/* Fixed: Changed to /signup instead of /signin */}
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
