import React from "react";
import { useSelector } from "react-redux";
import { useGetExperiencesQuery } from "../../state/api/experienceApi";
import SecondaryHeader from "../../components/SecondaryHeader";

const JobSeekerProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: experiences } = useGetExperiencesQuery();

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
            <button className="btn btn-sm">Tapasztalatok szerkesztése</button>
          </div>

          <div className="flex gap-48">
            <div className="flex flex-col gap-6">
              <div>Név</div>
              <div>E-mail</div>
              <div>Státusz</div>
              <div className="font-bold">Previous experiences</div>
              {experiences?.map((experience) => (
                <div key={experience.id}>{experience.company}</div>
              ))}
            </div>
            <div className="flex flex-col gap-6 justify-start">
              <div className="font-bold">{user.fullname}</div>
              <div>{user.email}</div>
              <div className="text-left font-bold">Munkakereső</div>
              <div></div>
              <div></div>
              {experiences?.map((experience) => (
                <div key={experience.id} className="font-bold">
                  {experience.interval + " " + experience.title}{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
