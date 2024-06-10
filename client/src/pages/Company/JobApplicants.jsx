import React from "react";
import { useParams } from "react-router-dom";
import { useGetJobApplicantsQuery } from "../../state/api/applicantsApi";

const JobApplicants = () => {
  const params = useParams();
  const jobId = params.jobId;
  const { data: applicants } = useGetJobApplicantsQuery(jobId, { skip: !jobId });

  return (
    <div className="mx-auto p-6">
      {!!applicants && applicants.length === 0 ? (
        <h1 className="font-bold text-xl">Még nincsenek jelentkezők erre a pozícióra</h1>
      ) : (
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
                <tr key={applicant.user.id}>
                  <td>{applicant.user.fullname}</td>
                  <td>{applicant.user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobApplicants;
