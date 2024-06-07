import React from "react";
import { useSelector } from "react-redux";
import { useGetAllJobsQuery } from "./state/api/jobApi";

const Home = () => {
  const { data: jobs } = useGetAllJobsQuery();
  const authState = useSelector((state) => state.auth);
  console.log(authState);

  return (
    <div className="container mx-auto p-4">
      {jobs?.map((d) => {
        <div>{d.name}</div>;
      })}
    </div>
  );
};

export default Home;
