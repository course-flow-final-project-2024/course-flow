import { useState } from "react";
import { supabase } from "../utils/supabase/initSupabase"; // เชื่อมต่อ Supabase
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [education_bg, setEducation_bg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // เช็คเงื่อนไขการสมัครต้องใส่ให้ครบ
    if (!name || !birthday || !education_bg || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // เช็ครูปแบบอีเมลที่ถูกต้อง
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    // เช็คความยาวของพาสเวิร์ด
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      // ลงทะเบียนผู้ใช้ด้วย Supabase
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // เพิ่มข้อมูลผู้ใช้ลงในตาราง profiles ของ Supabase
        const { data, error } = await supabase
          .from("profiles")
          .insert([
            { id: user.id, user_name, birthday, education_bg, user_email },
          ]);

        if (error) {
          throw error;
        }

        console.log("User profile created successfully:", data);
        setError("");
        // ลงทะเบียนสำเร็จ
        // สามารถทำการ redirect
      }
    } catch (error) {
      setError("Registration failed. Please try again later.");
      console.error("Error registering user:", error);
    }
  };

  // ฟังก์ชันตรวจสอบรูปแบบเมล
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Name and Lastname"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          placeholder="YYYY-MM-DD"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Education Background</FormLabel>
        <Input
          value={education_bg}
          onChange={(e) => setEducation_bg(e.target.value)}
          type="text"
          placeholder="Enter Education Background"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
          required
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Register
      </Button>
      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </form>
  );
}

export default RegistrationForm;
