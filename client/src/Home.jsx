import React from "react";
import { useSelector } from "react-redux";
import { useGetAllJobsQuery } from "./state/api/jobApi";
import { useNavigate } from "react-router-dom";
import SecondaryHeader from "./components/SecondaryHeader";
import { selectUserRole } from "./state/authSlice";

const Home = () => {
  const { data: jobs } = useGetAllJobsQuery();
  const userRole = useSelector(selectUserRole);
  const navigate = useNavigate();

  function handleJobClick(jobId) {
    if (userRole === "jobseeker") {
      navigate(`/jobs/${jobId}`);
      return;
    }
    if (userRole === "company") return;
    navigate("/login");
  }

  return (
    <div>
      <SecondaryHeader>Főoldal</SecondaryHeader>
      <div className="container mx-auto w-1/2 mt-6">
        <div className="overflow-x-auto shadow-lg rounded-lg p-6">
          {!!jobs && jobs.length === 0 ? (
            <div>Még nincs elérhető álláshírdetés</div>
          ) : (
            <table className="table">
              <thead>
                <tr className="flex justify-between">
                  <th>Állás neve</th>
                  <th>Fizetés</th>
                </tr>
              </thead>
              <tbody>
                {jobs?.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => handleJobClick(job.id)}
                    className={`flex justify-between ${
                      userRole === "jobseeker" || userRole !== "company" ? "cursor-pointer" : ""
                    } hover:bg-base-200`}
                  >
                    <td>
                      <div className="flex flex-col justify-start">
                        <span className="font-bold">{job.position}</span>
                        <span>{job.city}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col justify-start">
                        <span className="font-bold">
                          {new Intl.NumberFormat("hu-HU").format(job.salaryFrom) +
                            " - " +
                            new Intl.NumberFormat("hu-HU", {
                              style: "currency",
                              currency: "HUF",
                              maximumFractionDigits: 0,
                            }).format(job.salaryTo)}
                        </span>
                        <span className="text-center">
                          {(() => {
                            switch (job.type) {
                              case "full-time":
                                return "Teljes munkaidő";
                              case "part-time":
                                return "Részmunkaidő";
                              case "internship":
                                return "Gyakornoki";
                              default:
                                return "";
                            }
                          })()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
