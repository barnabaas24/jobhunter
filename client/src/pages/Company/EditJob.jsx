import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditJobMutation, useGetJobByIdQuery } from "../../state/api/jobApi";
import SecondaryHeader from "../../components/SecondaryHeader";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const EditJob = () => {
  const params = useParams();
  const jobId = params.jobId;
  const { data: job } = useGetJobByIdQuery(jobId);
  const [editJob] = useEditJobMutation();
  const [rangeValue, setRangeValue] = useState([0, 0]);

  useEffect(() => {
    if (job) {
      setRangeValue([job.salaryFrom, job.salaryTo]);
    }
  }, [job]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = {
      company: e.target.company.value,
      position: e.target.position.value,
      description: e.target.description.value,
      salaryFrom: rangeValue[0],
      salaryTo: rangeValue[1],
      type: e.target.jobtype.value,
      city: e.target.city.value,
      homeOffice: e.target.homeOffice.checked,
    };

    try {
      await editJob({ id: Number.parseInt(jobId), body: formData }).unwrap();
      toast.success("Hírdetés módosítva!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <SecondaryHeader>Hírdetés szerkesztése</SecondaryHeader>

        <div className="w-1/2 p-6 rounded-lg mx-auto mt-6 shadow-lg">
          <form onSubmit={handleFormSubmit} className=" w-1/2 mx-auto flex flex-col gap-6">
            <label className="input input-bordered flex items-center gap-2">
              Cég neve
              <input type="text" name="company" defaultValue={job?.company} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Pozíció neve
              <input type="text" name="position" defaultValue={job?.position} />
            </label>
            <textarea
              name="description"
              rows={4}
              className="textarea textarea-bordered"
              placeholder="Leírás a munkáról"
              defaultValue={job?.description}
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
                {new Intl.NumberFormat("hu-HU", {
                  style: "currency",
                  currency: "HUF",
                  maximumFractionDigits: 0,
                }).format(rangeValue[1])}
              </div>
            </div>
            <select
              name="jobtype"
              defaultValue={job?.type}
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
              <input type="text" name="city" defaultValue={job?.city} />
            </label>
            <label className="label cursor-pointer w-[45%]">
              <span className="label-text">Home Office lehetőség</span>
              <input
                type="checkbox"
                className="checkbox"
                name="homeOffice"
                defaultChecked={job?.homeOffice}
              />
            </label>
            <div>
              <button type="submit" className="btn bg-primary hover:bg-accent">
                Hírdetés frissítése
              </button>
            </div>
          </form>
        </div>
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
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default EditJob;
