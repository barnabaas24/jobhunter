import React, { useState } from "react";
import SecondaryHeader from "../../components/SecondaryHeader";
import { useCreateNewJobMutation } from "../../state/api/jobApi";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const CreateJob = () => {
  const [jobType, setJobType] = useState("");
  const [createNewJob] = useCreateNewJobMutation();
  const navigate = useNavigate();
  const [rangeValue, setRangeValue] = useState([50000, 200000]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = {
      company: e.target.company.value,
      position: e.target.position.value,
      description: e.target.description.value,
      salaryFrom: rangeValue[0],
      salaryTo: rangeValue[1],
      type: jobType,
      city: e.target.city.value,
      homeOffice: e.target.homeOffice.checked,
    };

    try {
      await createNewJob(formData).unwrap();
      navigate("/companyprofile");
    } catch (error) {
      toast.error(error.data.message);
    }
  }

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
          <div>Fizetési sáv</div>
          <RangeSlider min={0} max={1000000} step={1000} value={rangeValue} onInput={setRangeValue} />
          <div className="flex justify-between">
            <div>
              {new Intl.NumberFormat("hu-HU", {
                style: "currency",
                currency: "HUF",
                maximumFractionDigits: 0,
              }).format(rangeValue[0])}
            </div>
            <div>
              {" "}
              {new Intl.NumberFormat("hu-HU", {
                style: "currency",
                currency: "HUF",
                maximumFractionDigits: 0,
              }).format(rangeValue[1])}
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
