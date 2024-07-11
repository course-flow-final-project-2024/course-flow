import Button from "@/utils/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
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
    <form className="flex flex-col w-full gap-8" onSubmit={handleOnSubmit}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          backgroundColor="#fff"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
          backgroundColor="#fff"
          required
        />
      </FormControl>
      <Button text="Log in" style="primary" height="60px" />
    </form>
  );
}
export default LogInForm;
