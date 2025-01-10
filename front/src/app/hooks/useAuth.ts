"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  email: string;
}

const base_url = "http://localhost:8000";

export const useAuth = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    if (access_token && storedUser) {
      setIsAuthed(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${base_url}/api/login`, {
        email,
        password,
      });
      const data = response.data;

      if (data.access_token && data.email) {
        localStorage.setItem("access_token", data.access_token);
        const user = { email: data.email };
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthed(true);
        setUser(user);
        router.push("/dashboard");
      } else {
        console.error("Login response does not contain access_token or email:", data);
        throw new Error("Login failed: Invalid response data");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Login error details:", error.response?.data || error.message);
      }
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${base_url}/api/register`, {
        email,
        password,
      });
      const data = response.data;
  
      if (data.email) {
        // Registration successful, email returned
        console.log("Registration successful for email:", data.email);
        
       await login(email, password);
        
      } else {
        console.error("Unexpected registration response:", data);
        throw new Error("Registration failed: Unexpected response");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Registration error details:", error.response?.data || error.message);
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsAuthed(false);
    setUser(null);
    router.push("/");
  };

  return { isAuthed, user, login, register, logout };
};