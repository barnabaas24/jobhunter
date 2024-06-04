import React from "react";

const CreateJob = () => {
  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        Cég neve
        <input type="text" className="grow" placeholder="Daisy" />
      </label>
    </div>
  );
};

export default CreateJob;
