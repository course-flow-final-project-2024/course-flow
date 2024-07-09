import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
          required
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Register
      </Button>
    </form>
  );
}
export default LogInForm;
