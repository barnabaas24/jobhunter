import React from "react";
import SecondaryHeader from "../../components/SecondaryHeader";
import { useSelector } from "react-redux";
import { useGetJobsByUserIdQuery, useRemoveJobMutation } from "../../state/api/jobApi";
import { useNavigate } from "react-router-dom";
import JobApplicants from "./JobApplicants";

const CompanyProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: jobs } = useGetJobsByUserIdQuery(user.id);
  const [removeJob] = useRemoveJobMutation();
  const navigate = useNavigate();

  const handleModalClick = (jobId) => {
    document.getElementById("applicants_modal").showModal();
    navigate(`/companyprofile/${jobId}`);
  };

  return (
    <>
      <div>
        <SecondaryHeader>Profilom</SecondaryHeader>
        <div className="mx-auto w-[60%] mt-10">
          <div className="text-2xl font-semibold mb-2">A te hirdetéseid:</div>
          <div className="flex flex-col gap-6">
            {jobs?.map((job) => (
              <div key={job.id} className="flex justify-between p-4 shadow-sm rounded-sm">
                <div>
                  <div className="text-2xl font-bold">{job.position}</div>
                  <div className="flex gap-4">
                    <p>{job.type}</p>
                    <p>{job.homeOffice ? "Remote" : "In-Office"}</p>
                    <p>{job.salaryFrom + "-" + job.salaryTo + " Ft"}</p>
                    <p></p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <button onClick={() => navigate(`/jobs/${job.id}/edit`)} className="btn btn-sm">
                    Szerkesztés
                  </button>
                  <button onClick={() => handleModalClick(job.id)} className="btn btn-sm">
                    Megtekintés
                  </button>
                  <button
                    onClick={() => removeJob(job.id)}
                    className="btn btn-sm text-white bg-red-500 hover:bg-red-300"
                  >
                    Törlés
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto flex mt-10">
          <button onClick={() => navigate("/createjob")} className="btn btn-lg mx-auto bg-primary">
            Hírdetés hozzáadása
          </button>
        </div>
      </div>
      <dialog id="applicants_modal" className="modal">
        <div className="modal-box">
          <JobApplicants />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Vissza</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CompanyProfile;
