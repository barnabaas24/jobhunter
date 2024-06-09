import React, { useState } from "react";
import SecondaryHeader from "../../components/SecondaryHeader";
import { useCreateNewJobMutation } from "../../state/api/jobApi";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateJob = () => {
  const [jobType, setJobType] = useState("");
  const [createNewJob] = useCreateNewJobMutation();
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = {
      company: e.target.company.value,
      position: e.target.position.value,
      description: e.target.description.value,
      salaryFrom: Number.parseInt(e.target.from.value),
      salaryTo: Number.parseInt(e.target.to.value),
      type: jobType,
      city: e.target.city.value,
      homeOffice: e.target.homeOffice.checked,
    };
    console.log(formData);

    try {
      await createNewJob(formData).unwrap();
      navigate("/companyprofile");
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  //TODO: render error component

  return (
    <div>
      <SecondaryHeader>Új hírdetés létrehozása</SecondaryHeader>

      <div className="w-1/2 p-6 rounded-lg mx-auto mt-12 shadow-lg">
        <form onSubmit={handleFormSubmit} className=" w-1/2 mx-auto flex flex-col gap-6">
          <label className="input input-bordered flex items-center gap-2">
            Cég neve
            <input type="text" name="company" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Pozíció neve
            <input type="text" name="position" />
          </label>
          <textarea
            name="description"
            rows={4}
            className="textarea textarea-bordered"
            placeholder="Leírás a munkáról"
          ></textarea>
          <div className="flex flex-col gap-3">
            <div>Fizetési sáv</div>
            <div className="flex justify-between">
              <div className="w-1/3 flex">
                <label className="input input-bordered flex items-center">
                  <input type="number" name="from" className="w-[100%]" />
                  <label>tól</label>
                </label>
              </div>
              <div className="w-1/3 flex">
                <label className="input input-bordered flex items-center">
                  <input type="number" name="to" className="w-[100%]" />
                  <label>ig</label>
                </label>
              </div>
            </div>
          </div>
          <select
            name="jobtype"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="" disabled>
              Foglalkoztatás formája
            </option>
            <option value="full-time">Teljes állás</option>
            <option value="part-time">Részmunkaidős</option>
            <option value="internship">Gyakornok</option>
          </select>
          <label className="input input-bordered flex items-center gap-2">
            Település
            <input type="text" name="city" />
          </label>
          <label className="label cursor-pointer w-[45%]">
            <span className="label-text">Home Office lehetőség</span>
            <input type="checkbox" className="checkbox" name="homeOffice" />
          </label>
          <div>
            <button type="submit" className="btn bg-primary hover:bg-accent">
              Hírdetés létrehozása
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default CreateJob;
