import React from "react";
import { useLoginMutation } from "./state/authApiSlice";
import { useDispatch } from "react-redux";
import { login } from "./state/authSlice";

const Login = () => {
  const [apiLogin] = useLoginMutation();

  return (
    <button
      onClick={() => {
        apiLogin({ body: { email: "user1@jobhunter.hu", password: "user1" } });
      }}
    >
      Login
    </button>
  );
};

export default Login;
