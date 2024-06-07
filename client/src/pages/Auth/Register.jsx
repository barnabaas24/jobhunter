import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../state/api/authApi";
import { useAddExperiencesMutation } from "../../state/api/experienceApi";

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
      await register(formData);
      console.log("succesfull register");
      await login({ email: formData.email, password: e.target.password.value });
      console.log("succesfull login");

      if (userType === "jobseeker") {
        const experienceData = e.target.experiences.value.trim().split("\n");
        const experiences = [];
        experienceData.forEach((line) => {
          const tokens = line.split(";");
          experiences.push({ company: tokens[0], title: tokens[1], interval: tokens[2] });
        });
        await addExperiences(experiences);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //TODO: render error component

  return (
    <form onSubmit={handleFormSubmit} className="w-1/5 mx-auto">
      <div className="flex flex-col gap-6">
        <label className="input input-bordered flex items-center gap-2">
          Vezetéknév
          <input type="text" name="lastname" className="grow" placeholder="" required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Keresztnév
          <input type="text" name="firstname" className="grow" placeholder="" required />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          Email
          <input type="text" name="email" className="grow" placeholder="" required />
        </label>
        <select
          name="role"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="select select-bordered w-full max-w-xs"
          required
        >
          <option value="" disabled>
            Fiók típus
          </option>
          <option value="jobseeker">Munka vállaló</option>
          <option value="company">Munkáltató</option>
        </select>

        <label className="input input-bordered flex items-center gap-2">
          Password
          <input type="password" name="password" className="grow" placeholder="" required />
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
    </form>
  );
};

export default Register;
