import React from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const params = useParams();
  console.log(params);

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        Cég neve
        <input type="text" className="grow" placeholder="Daisy" />
      </label>
    </div>
  );
};

export default JobDetail;
