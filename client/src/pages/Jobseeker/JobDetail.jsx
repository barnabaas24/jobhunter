import React from "react";
import { useParams } from "react-router-dom";
import SecondaryHeader from "../../components/SecondaryHeader";
import { useGetJobByIdQuery } from "../../state/api/jobApi";
import { useApplyForJobMutation, useGetJobApplicantsQuery } from "../../state/api/applicantsApi";
import { useSelector } from "react-redux";

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <SecondaryHeader>
        <div>
          <div>{job?.company}</div>
          <div className="absolute right-4 flex flex-col text-base text-center">
            <div>{job?.salaryFrom + "-" + job?.salaryTo + " Ft"}</div>
            <div>{job?.type}</div>
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
              <div className="bg-green-500 my-auto p-1 rounded-lg font-semibold">Már jelentkeztél.</div>
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
                <td>{job?.company}</td>
              </tr>
              <tr>
                <td>Pozíció</td>
                <td>{job?.position}</td>
              </tr>
              <tr>
                <td>Leírás</td>
                <td>{job?.description}</td>
              </tr>
              <tr>
                <td>Fizetési sáv</td>
                <td>{"Bruttó " + job?.salaryFrom + "-" + job?.salaryTo + " Ft"}</td>
              </tr>
              <tr>
                <td>Foglalkoztatás típusa</td>
                <td>{job?.type}</td>
              </tr>
              <tr>
                <td>Település</td>
                <td>{job?.city}</td>
              </tr>
              <tr>
                <td>Home office</td>
                <td>{job?.homeOffice ? "Van" : "Nincs"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
