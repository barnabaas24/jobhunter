import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import NoAuthRequired from "./NoAuthRequired";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Navigate to={"/"} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <NoAuthRequired>
            <Login />
          </NoAuthRequired>
        ),
      },
      {
        path: "/register",
        element: (
          <NoAuthRequired>
            <Register />
          </NoAuthRequired>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
