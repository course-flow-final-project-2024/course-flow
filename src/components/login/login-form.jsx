import Button from "@/utils/button";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form className="form-control w-full gap-8" onSubmit={handleOnSubmit}>
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
export default LogInForm;
