import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase/initSupabase";

export default function LogInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setSignInError("Email and password are required");
      return;
    }

    setSignInError(null);

    try {
      const { error, user } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        setSignInError("Failed to sign in. Please check your credentials.");
        return;
      }
  
      //console.log("User logged in:", "yeah");
      //router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error.message);
      setSignInError("Failed to sign in. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <FormControl isInvalid={signInError}>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          required
        />
        <FormErrorMessage>{signInError}</FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={signInError}>
        <FormLabel>Password</FormLabel>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
          required
        />
        <FormErrorMessage>{signInError}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Login
      </Button>
    </form>
  );
}
