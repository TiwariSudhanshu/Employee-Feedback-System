"use client";

import { useState } from "react";


export default function LoginPage() {

  const [formData, setFormData] = useState({
    identifier: "", // username OR email
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dynamically set username or email
    const payload: {
      username?: string;
      email?: string;
      password: string;
    } = {
      password: formData.password,
    };

    if (formData.identifier.includes("@")) {
      payload.email = formData.identifier;
    } else {
      payload.username = formData.identifier;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // for refreshToken cookie
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.accessToken);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("Logged in successfully ✅");
        window.location.href = "/dashboard"; 
    } else {
        alert(result.error || "Login failed ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <p>Please enter your credentials to log in.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="identifier">Username or Email:</label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          required
          value={formData.identifier}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}
