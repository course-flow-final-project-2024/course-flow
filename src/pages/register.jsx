import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
function RegisterPage() {
  return (
    <div className="container mx-auto">
      {/* NavBar */}
      <h1>Register to start learning!</h1>
      <form action="">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Enter Name and Lastname" />
        </FormControl>
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input type="date" placeholder="DD/MM/YY" lang="fr-CA" />
        </FormControl>
        <FormControl>
          <FormLabel>Education Background</FormLabel>
          <Input type="text" placeholder="Enter Education Background" />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter Email" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter Password" />
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          //   isLoading={}
          type="submit"
        >
          Register
        </Button>
        <div>Already have an account? {/*<Link>Log in</Link>*/}</div>
      </form>
    </div>
  );
}
export default RegisterPage;
