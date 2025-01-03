"use client";
import React from "react";
import AuthButton from "./AuthButton";
import { loginWithCreds } from "@/actions/auth";

const LoginForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      await loginWithCreds(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-white p-2 px-4 text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-white p-2 px-4 text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <AuthButton />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
