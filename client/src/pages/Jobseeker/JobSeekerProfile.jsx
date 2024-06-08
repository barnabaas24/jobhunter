import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetExperiencesQuery } from "../../state/api/experienceApi";
import SecondaryHeader from "../../components/SecondaryHeader";

const JobSeekerProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: experiences } = useGetExperiencesQuery();
  const [editEnabled, setEditEnabled] = useState(false);

  return (
    <div>
      <SecondaryHeader>Profilom</SecondaryHeader>
      <div className="w-1/2 mx-auto mt-12 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col gap-6 pt-12 ">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold">Személyes adatok</h1>
              <p>Adatait és tapasztalataid egy helyen.</p>
            </div>
            <button onClick={() => setEditEnabled(true)} className="btn btn-sm">
              Tapasztalatok szerkesztése
            </button>
          </div>

          <table className="table">
            <tbody>
              <tr>
                <td>Név</td>
                <td>{user?.fullname}</td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>{user?.email}</td>
              </tr>
              <tr>
                <td>Státusz</td>
                <td>{user?.role}</td>
              </tr>
              <tr>
                <td colSpan={2} className="font-bold">
                  Previous experiences
                </td>
              </tr>

              {experiences?.map((experience) => (
                <tr key={experience.id}>
                  <td>{experience.company}</td>
                  <td>{experience.interval + " " + experience.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
