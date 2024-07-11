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
    <form className="flex flex-col w-full gap-8" onSubmit={handleOnSubmit}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Name and Lastname"
          backgroundColor="#fff"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          placeholder="DD/MM/YY"
          backgroundColor="#fff"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Education Background</FormLabel>
        <Input
          onChange={(e) => setEducation_bg(e.target.value)}
          type="text"
          placeholder="Enter Education Background"
          backgroundColor="#fff"
          required
        />
      </FormControl>
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
      <Button text="Register" style="primary" height="60px" />
    </form>
  );
}
export default RegistrationForm;
