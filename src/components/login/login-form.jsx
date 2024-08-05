import Button from "@/utils/button";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import isNumber from "@/utils/numberChecking";

export default function LogInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(null);
  const { redirect } = router.query;

  const handle = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setSignInError("Email and password are required");
      return;
    }

    setSignInError(null);

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (!response.data.token) {
        setSignInError("Invalid email or password.");
        return;
      }

      localStorage.setItem("token", JSON.stringify(response.data.token));

      if (redirect && isNumber(redirect)) {
        router.push(`/courses/${redirect}`);
      } else {
        router.push(`/`);
      }
    } catch (error) {
      setSignInError("Failed to sign in. Please try again later.");
    }
  };

  return (
    <form className="form-control w-full gap-8" onSubmit={handle}>
      <label className="form-control grow">
        <div className="label">
          <span className="label-text text-base font-normal">Email</span>
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      <label className="form-control grow">
        <div className="label">
          <span className="label-text text-base font-normal">Password</span>
        </div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
          className="input input-bordered grow bg-white"
          required
        />
      </label>

      {signInError && <p className="text-red-500">{signInError}</p>}

      <Button text="Log in" style="primary" />
    </form>
  );
}
