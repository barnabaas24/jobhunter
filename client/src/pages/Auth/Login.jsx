import React, { useState } from "react";
import { useLoginMutation } from "../../state/api/authApi";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [login] = useLoginMutation();

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      await login({
        email: e.target.email.value,
        password: e.target.password.value,
      }).unwrap();
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="w-1/6 mx-auto mt-10 ">
      <div className="flex flex-col gap-6">
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input type="text" name="email" className="grow" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input type="password" name="password" className="grow" />
        </label>
      </div>
      <div className="pt-6">
        <button type="submit" className="btn">
          Login
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </form>
  );
};

export default Login;
