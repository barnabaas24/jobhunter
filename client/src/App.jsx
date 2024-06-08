import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Home";
import JobDetail from "./pages/Jobseeker/JobDetail";
import Layout from "./components/Layout";
import Login from "./pages/Auth/Login";
import NoAuth from "./components/NoAuth";
import Register from "./pages/Auth/Register";
import CreateJob from "./pages/Company/CreateJob";
import JobSeekerProfile from "./pages/Jobseeker/JobSeekerProfile";
import JobSeekerRoleRequired from "./pages/Jobseeker/JobSeekerRoleRequired";
import CompanyRoleRequired from "./pages/Company/CompanyRoleRequired";
import RequireAuth from "./components/Auth";
import CompanyProfile from "./pages/Company/CompanyProfile";
import Logout from "./pages/Auth/Logout";
import EditJob from "./pages/Company/EditJob";
import JobApplicants from "./pages/Company/JobApplicants";

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
          <NoAuth>
            <Login />
          </NoAuth>
        ),
      },
      {
        path: "/register",
        element: (
          <NoAuth>
            <Register />
          </NoAuth>
        ),
      },
      {
        path: "/logout",
        element: (
          <RequireAuth>
            <Logout />
          </RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <JobSeekerRoleRequired>
            <RequireAuth>
              <JobSeekerProfile />
            </RequireAuth>
          </JobSeekerRoleRequired>
        ),
      },
      {
        path: "/jobs/:jobId",
        element: (
          <JobSeekerRoleRequired>
            <RequireAuth>
              <JobDetail />
            </RequireAuth>
          </JobSeekerRoleRequired>
        ),
      },
      {
        path: "/jobs/:jobId/edit",
        element: (
          <CompanyRoleRequired>
            <RequireAuth>
              <EditJob />
            </RequireAuth>
          </CompanyRoleRequired>
        ),
      },
      {
        path: "/companyprofile/:jobId?",
        element: (
          <CompanyRoleRequired>
            <RequireAuth>
              <CompanyProfile />
            </RequireAuth>
          </CompanyRoleRequired>
        ),
      },
      {
        path: "/createjob",
        element: (
          <CompanyRoleRequired>
            <RequireAuth>
              <CreateJob />
            </RequireAuth>
          </CompanyRoleRequired>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
