import React from "react";
import { useLoginMutation } from "../../state/api/authApi";

const Login = () => {
  const [login] = useLoginMutation();

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      await login({
        email: e.target.email.value,
        password: e.target.password.value,
      });
      console.log("succesfull login");

      // localStorage.setItem("accessToken", responseData.accessToken);
      // localStorage.setItem("user", responseData.user);
    } catch (error) {
      console.log(error);
    }
  }

  //TODO: render error component

  return (
    <form onSubmit={handleFormSubmit} className="w-1/6 mx-auto mt-10">
      <div className="flex flex-col gap-6">
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input type="text" name="email" className="grow" placeholder="" required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input type="password" name="password" className="grow" placeholder="" required />
        </label>
      </div>
      <div className="pt-6">
        <button type="submit" className="btn">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
