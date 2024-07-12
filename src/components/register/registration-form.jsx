import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Button from "@/utils/button";
function RegistrationForm() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState();
  const [education_bg, setEducation_bg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const userProfile = { name, birthday, education_bg, email, password };
    console.log(userProfile);
  };
  return (
    <form className="form-control w-full gap-8" onSubmit={handleOnSubmit}>
      <label class="form-control grow">
        <div class="label">
          <span class="label-text text-base font-normal">Name</span>
        </div>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Name and Lastname"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      <label class="form-control grow">
        <div class="label">
          <span class="label-text text-base font-normal">Date of Birth</span>
        </div>
        <input
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          placeholder="DD/MM/YY"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      <label class="form-control grow">
        <div class="label">
          <span class="label-text text-base font-normal">
            Education Background
          </span>
        </div>
        <input
          onChange={(e) => setEducation_bg(e.target.value)}
          type="text"
          placeholder="Enter Education Background"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      <label class="form-control grow">
        <div class="label">
          <span class="label-text text-base font-normal">Email</span>
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      <label class="form-control grow">
        <div class="label">
          <span class="label-text text-base font-normal">Password</span>
        </div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
          className="input input-bordered grow bg-white"
          required
        />
      </label>

      <Button text="Log in" style="primary" />
    </form>
  );
}
export default RegistrationForm;
