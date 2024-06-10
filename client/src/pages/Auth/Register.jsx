import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../state/api/authApi";
import { useAddExperiencesMutation } from "../../state/api/experienceApi";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [addExperiences] = useAddExperiencesMutation();
  const [userType, setUserType] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
      fullname: e.target.lastname.value + " " + e.target.firstname.value,
      role: e.target.elements.role.value,
    };

    try {
      await register(formData).unwrap();
      await login({ email: formData.email, password: e.target.password.value });
      if (userType === "jobseeker") {
        const experienceData = e.target.experiences.value.trim().split("\n");
        const experiences = [];
        experienceData.forEach((line) => {
          const tokens = line.split(";");
          if (tokens.length === 3) {
            experiences.push({
              company: tokens[0].trim(),
              title: tokens[1].trim(),
              interval: tokens[2].trim(),
            });
            console.log(tokens);
          }
        });
        await addExperiences(experiences);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="w-1/5 mx-auto mt-10">
      <div className="flex flex-col gap-6">
        <label className="input input-bordered flex items-center gap-2">
          Vezetéknév
          <input type="text" name="lastname" className="grow" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Keresztnév
          <input type="text" name="firstname" className="grow" />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          Email
          <input type="text" name="email" className="grow" />
        </label>
        <select
          name="role"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" disabled>
            Fiók típus
          </option>
          <option value="jobseeker">Munka vállaló</option>
          <option value="company">Munkáltató</option>
        </select>

        <label className="input input-bordered flex items-center gap-2">
          Password
          <input type="password" name="password" className="grow" />
        </label>

        {userType === "jobseeker" && (
          <textarea
            name="experiences"
            rows={6}
            className="textarea textarea-bordered"
            placeholder={`Add meg az eddigi tapasztalataidat, az alábbi formátumban: \nCég neve;Pozíció;Mettől-meddig`}
          ></textarea>
        )}
      </div>
      <div className="pt-6">
        <button type="submit" className="btn">
          Register
        </button>
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
    </form>
  );
};

export default Register;
