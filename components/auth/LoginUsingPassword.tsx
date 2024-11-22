import Button from "../ui/Button";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IsValidValue, IsValidMobile } from "../../utils/validations";
import useStore from "../../utils/store";
import graphQLClient from "@utils/useGQLQuery";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
// import {
//     useAuthenticateUserWithPasswordMutation,
//     AuthenticateUserWithPasswordMutationVariables,
// } from "@utils/graphql";
import {
  useLoginUsingPasswordMutation,
  LoginUsingPasswordMutationVariables,
} from "@utils/graphql";

import Link from "next/link";

export default function LoginUsingPassword() {
  const router = useRouter();
  const [success, setSuccess] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [inputFieldType, setInputFieldType] = useState("password");

  const handleShowPassword = () => {
    if (showPassword) {
      setInputFieldType("password");
    } else {
      setInputFieldType("text");
    }
    setShowPassword(!showPassword);
  };

  // console.log("username",username);
  // console.log("password",password);

  const callAuthenticateUserWithPasswordMutation =
    useLoginUsingPasswordMutation<LoginUsingPasswordMutationVariables>(
      graphQLClient()
    );

  const { setToken } = useStore((state) => ({
    setToken: (token) => state.setToken(token),
  }));

  useEffect(() => {
    if (success) {
      toast.success(success.text ? success.text : "Success");
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
    if (error) {
      toast.error(
        error.text ? error.text : "Something went wrong. Please contact support"
      );
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [success, error]);

  async function CallPasswordLogin() {
    let isValid = true;
    
    if (!IsValidValue(username) || !IsValidMobile(username)) {
      setError({ text: "Please enter a valid Mobile Number" });
      isValid = false;
    }
    
    if (isValid && !IsValidValue(password)) {
      setError({ text: "Please enter a valid Password" });
      isValid = false;
    }
    
    if (isValid) {
      try {
        const result = await callAuthenticateUserWithPasswordMutation.mutateAsync({
          loginInput: {
            mobile: username,
            password,
          },
        });
  
        // console.log("result of the login", result);
        // console.log("token", result?.login["access_token"]);
  
        if (result?.login["access_token"]) {
          localStorage.setItem("token", result.login["access_token"]);
          localStorage.setItem("id", result.login["user"]["id"]);
          localStorage.setItem("status", result.login["user"]["status"]);
          localStorage.setItem("name", result.login["user"]["firstName"]);
  
          setToken(result.login["access_token"]);
          setSuccess({
            text: "You have been successfully logged in.",
          });
          router.push(`/dashboard`);
        } else {
          setError({
            text: "Invalid username or password.",
          });
        }
      } catch (error) {
        const graphqlError = error?.response?.errors?.[0]?.message || "An error occurred while trying to log in. Please try again later.";

        // Showing the user-friendly message
        setError({
          text: graphqlError,
        });
      }
    }
  }
  

  return (
    <>
      <div className="max-w-md mx-auto mt-12 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
  {/* Header */}
  <div className="text-center">
    <h2 className="text-xl font-semibold text-gray-800">Welcome Back</h2>
    <p className="mt-2 text-sm text-gray-600">
      Sign in to your account to continue.
    </p>
  </div>

  {/* Form Fields */}
  <div className="mt-8 space-y-6">
    {/* Mobile Number Field */}
    <div>
      <label
        htmlFor="mobile"
        className="block text-sm font-medium text-gray-700"
      >
        Mobile Number <span className="text-red-500 text-xs">*</span>
      </label>
      <div className="mt-2">
        <input
          id="mobile"
          name="mobile"
          type="text"
          autoComplete="username"
          placeholder="Enter your mobile number"
          required
          maxLength={10}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
        />
      </div>
    </div>

    {/* Password Field */}
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password <span className="text-red-500 text-xs">*</span>
      </label>
      <div className="mt-2 relative">
        <input
          id="password"
          name="password"
          type={inputFieldType}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
        />
        <button
          type="button"
          onClick={handleShowPassword}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          {showPassword ? (
            <EyeIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <EyeOffIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>

    {/* Forgot Password Link */}
    <div className="flex justify-end">
      <Link href="/reset-password">
        <a className="text-sm font-medium text-indigo-600 hover:underline">
          Forgot your password?
        </a>
      </Link>
    </div>

    {/* Sign-In Button */}
    <div>
      <Button
        btnclass="w-full"
        type="submit"
        color="indigo"
        onClick={CallPasswordLogin}
      >
        Sign in
      </Button>
    </div>
    <div className=" text-center">
                    <p className="text-base space-x-1 font-medium text-gray-700 flex justify-center">
                      New to{" "}
                      <span className="text-indigo-600 font-bold ml-1">
                        {" "}
                        Autobse
                      </span>
                      ?{" "}
                      <Link href="/register">
                        <p className="text-indigo-500 hover:text-indigo-700 hover:underline hover:border hover:cursor-pointer hover:bg-blue-200 rounded-full px-2 py-px">
                          Join Now
                        </p>
                      </Link>
                    </p>
                  </div>
  </div>
</div>

    </>
  );
}
