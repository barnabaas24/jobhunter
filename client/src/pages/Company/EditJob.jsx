import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditJobMutation, useGetJobByIdQuery } from "../../state/api/jobApi";
import SecondaryHeader from "../../components/SecondaryHeader";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditJob = () => {
  const params = useParams();
  const jobId = params.jobId;
  const { data: job } = useGetJobByIdQuery(jobId);
  const [editJob] = useEditJobMutation();
  const navigate = useNavigate();
  console.log("JobId: " + jobId);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = {
      company: e.target.company.value,
      position: e.target.position.value,
      description: e.target.description.value,
      salaryFrom: Number.parseInt(e.target.from.value),
      salaryTo: Number.parseInt(e.target.to.value),
      type: e.target.jobtype.value,
      city: e.target.city.value,
      homeOffice: e.target.homeOffice.checked,
    };


    try {
      await editJob({ id: Number.parseInt(jobId), body: formData });
      toast("Hírdetés módosítva!");
      //TODO: only navigate if there is no error
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <SecondaryHeader>Hírdetés szerkesztése</SecondaryHeader>

        <div className="w-1/2 p-6 rounded-lg mx-auto mt-12 shadow-lg">
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
            <div className="flex flex-col gap-3">
              <div>Fizetési sáv</div>
              <div className="flex justify-between">
                <div className="w-1/3 flex">
                  <label className="input input-bordered flex items-center">
                    <input type="number" name="from" defaultValue={job?.salaryFrom} className="w-[100%]" />
                    <label>tól</label>
                  </label>
                </div>
                <div className="w-1/3 flex">
                  <label className="input input-bordered flex items-center">
                    <input type="number" name="to" defaultValue={job?.salaryTo} className="w-[100%]" />
                    <label>ig</label>
                  </label>
                </div>
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
