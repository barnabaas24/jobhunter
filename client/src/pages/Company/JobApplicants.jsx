import React from "react";
import { useGetJobByIdQuery } from "../../state/api/jobApi";
import { useParams } from "react-router-dom";
import SecondaryHeader from "../../components/SecondaryHeader";
import { useGetJobApplicantsQuery } from "../../state/api/applicantsApi";

const JobApplicants = () => {
  const params = useParams();
  const jobId = params.jobId;
  const { data: job } = useGetJobByIdQuery(jobId);
  const { data: applicants } = useGetJobApplicantsQuery(jobId);
  console.log(applicants);

  return (
    <div>
      <SecondaryHeader>
        <div>
          <div className="flex flex-col items-center">
            <p>{job?.position}</p>
            <p className="text-sm font-normal">{job?.company}</p>
          </div>
          <div className="absolute right-4 flex flex-col text-base text-center">
            <div>{job?.salaryFrom + "-" + job?.salaryTo + " Ft"}</div>
            <div className="font-normal">{job?.type}</div>
          </div>
        </div>
      </SecondaryHeader>
      <div className="w-1/2 mx-auto mt-12 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col gap-6 pt-6 ">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-xl">Jelentkezők</h1>
            <p>Itt láthatod, hogy eddig kik jelentkeztek a pozícióra.</p>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Név</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {applicants?.map((applicant) => (
                <tr>
                  <td>{applicant.user.fullname}</td>
                  <td>{applicant.user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobApplicants;
