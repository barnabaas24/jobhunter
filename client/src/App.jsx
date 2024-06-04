import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Home";
import JobDetail from "./JobDetail";
import Layout from "./Layout";
import Login from "./Login";
import NoAuthRequired from "./NoAuthRequired";
import Register from "./Register";

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
      {
        path: "/jobs/:jobId",
        element: (
          // <RequireAuth>
          <JobDetail />
          // </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
