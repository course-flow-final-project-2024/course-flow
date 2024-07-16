import Button from "@/utils/button";
import React, { useState } from "react";
import { useRouter } from "next/router";

function AdminLogInForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handle = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setError("Name and password are required");
      return;
    }

    setError(null);

    try {
      const response = await fetch("/api/auth/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok || !data.user) {
        setError("Failed to sign in. Please check your credentials.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/admin/courses");
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError("Failed to sign in. Please try again later.");
    }
  };
  return (
    <form className="form-control w-full gap-8" onSubmit={handle}>
      <label className="form-control grow">
        <div className="label">
          <span className="label-text text-base font-normal">Username</span>
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Username"
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
      {error && <p className="text-red-500">{error}</p>}
      <Button text="Log in" style="primary" type="submit" />
    </form>
  );
}
export default AdminLogInForm;
