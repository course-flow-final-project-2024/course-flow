import Button from "@/utils/button";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function LogInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(null);

  const handle = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setSignInError("Email and password are required");
      return;
    }

    setSignInError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok || !data.user) {
        setSignInError("Failed to sign in. Please check your credentials.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error.message);
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
