import Button from "@/utils/button";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
      const response = await axios.post("/api/auth/adminlogin", {
        name,
        password,
      });

      if (!response.data.token) {
        setError("Failed to sign in. Please try again later.");
        return;
      }

      localStorage.setItem("token", JSON.stringify(response.data.token));

      router.push("/admin/courses");
    } catch (error) {
      setError("Invalid username or password.");
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
