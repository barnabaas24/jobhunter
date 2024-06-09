import React from "react";
import { useParams } from "react-router-dom";
import SecondaryHeader from "../../components/SecondaryHeader";
import { useGetJobByIdQuery } from "../../state/api/jobApi";
import { useApplyForJobMutation, useGetJobApplicantsQuery } from "../../state/api/applicantsApi";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetail = () => {
  const params = useParams();
  const jobId = Number.parseInt(params.jobId);
  const { data: job } = useGetJobByIdQuery(jobId);
  const [applyForJob] = useApplyForJobMutation();
  const { data: applicants } = useGetJobApplicantsQuery(jobId);
  const user = useSelector((state) => state.auth.user);
  const alreadyApplied = applicants?.some((applicant) => applicant.userId === user.id);

  async function handleJobApplication() {
    try {
      await applyForJob({ jobId: job.id });
      toast("Sikeres jelentkezés!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <SecondaryHeader>
          <div>
            <div className="flex gap-8">
              <div>{job?.company}</div>
              <div className="badge badge-info text-base my-auto">
                {job?.homeOffice ? "Home Office" : "Office"}
              </div>
            </div>
            <div className="absolute right-4 flex flex-col text-base text-center">
              <div>
                {new Intl.NumberFormat("hu-HU").format(job?.salaryFrom) +
                  " - " +
                  new Intl.NumberFormat("hu-HU", {
                    style: "currency",
                    currency: "HUF",
                    maximumFractionDigits: 0,
                  }).format(job?.salaryTo)}
              </div>
              <div className="font-normal">
                {(() => {
                  switch (job?.type) {
                    case "full-time":
                      return "Teljes munkaidő";
                    case "part-time":
                      return "Részmunkaidő.";
                    case "internship":
                      return "Gyakornoki";
                    default:
                      return "";
                  }
                })()}
              </div>
            </div>
          </div>
        </SecondaryHeader>
        <div className="w-1/2 mx-auto mt-12 p-6 shadow-lg rounded-lg">
          <div className="flex flex-col gap-6 pt-12 ">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="font-bold">Cég részletei</h1>
                <p>Megtetszett a lehetőség? Jelentkezz!</p>
              </div>

              {applicants !== null && alreadyApplied ? (
                <div className="badge badge-success badge-lg my-auto p-2 font-semibold">
                  Már jelentkeztél.
                </div>
              ) : (
                <button
                  onClick={handleJobApplication}
                  className="btn btn-sm bg-primary text-white hover:bg-secondary"
                >
                  Jelentkezés
                </button>
              )}
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <td>Név</td>
                  <td className="font-semibold">{job?.company}</td>
                </tr>
                <tr>
                  <td>Pozíció</td>
                  <td className="font-semibold">{job?.position}</td>
                </tr>
                <tr>
                  <td>Leírás</td>
                  <td className="font-semibold">{job?.description}</td>
                </tr>
                <tr>
                  <td>Fizetési sáv</td>
                  <td className="font-semibold">
                    {"Bruttó " +
                      new Intl.NumberFormat("hu-HU").format(job?.salaryFrom) +
                      " - " +
                      new Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                        maximumFractionDigits: 0,
                      }).format(job?.salaryTo)}
                  </td>
                </tr>
                <tr>
                  <td>Foglalkoztatás típusa</td>
                  <td className="font-semibold">{job?.type}</td>
                </tr>
                <tr>
                  <td>Település</td>
                  <td className="font-semibold">{job?.city}</td>
                </tr>
                <tr>
                  <td>Home office</td>
                  <td className="font-semibold">{job?.homeOffice ? "Van" : "Nincs"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default JobDetail;
