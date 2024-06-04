import React from "react";
import { useGetAllJobsQuery } from "./state/jobApiSlice";

const Home = () => {
  const { data, isLoading, isError } = useGetAllJobsQuery();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <div>
      {data.map((d) => {
        <div>{d.name}</div>;
      })}
    </div>
  );
};

export default Home;
