import { FormErrorMessage } from "@chakra-ui/react";
import React, { useState } from "react";
import Button from "@/utils/button";
import { useRouter } from "next/router";

function RegistrationForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [education_bg, setEducation_bg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!name || !birthday || !education_bg || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ name, birthday, education_bg, email, password }),
      });
      const data = await response.json();

      if (response.status !== 200) {
        setError(data.error || "failed to register.");
        return;
      }

      setName("");
      setBirthday("");
      setEducation_bg("");
      setEmail("");
      setPassword("");
      setError("");

      router.push("/login");

      console.log(" User registered successfully:", data.user);
    } catch (error) {
      setError("Registration failed. Please try again later.");
      console.error("Error registering user", error);
    }
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <form className="form-control w-full gap-8" onSubmit={handleOnSubmit}>
      <label className="form-control grow" isInvalid={!!error}>
        <div className="label">
          <span className="label-text text-base font-normal">Name</span>
        </div>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Name and Lastname"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      <label className="form-control grow" isInvalid={!!error}>
        <div className="label">
          <span className="label-text text-base font-normal">
            Date of Birth
          </span>
        </div>
        <input
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          placeholder="DD/MM/YY"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      <label className="form-control grow" isInvalid={!!error}>
        <div className="label">
          <span className="label-text text-base font-normal">
            Education Background
          </span>
        </div>
        <input
          id="education_bg"
          value={education_bg}
          onChange={(e) => setEducation_bg(e.target.value)}
          type="text"
          placeholder="Enter Education Background"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      <label className="form-control grow" isInvalid={!!error}>
        <div className="label">
          <span className="label-text text-base font-normal">Email</span>
        </div>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      <label className="form-control grow" isInvalid={!!error}>
        <div className="label">
          <span className="label-text text-base font-normal">Password</span>
        </div>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
          className="input input-bordered grow bg-white"
          required
        />
      </label>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      <Button text="Register" style="primary" />
    </form>
  );
}
export default RegistrationForm;
