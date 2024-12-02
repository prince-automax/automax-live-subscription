import Button from "../ui/Button";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IsValidValue, IsValidMobile } from "../../utils/validations";
import useStore from "../../utils/store";
import graphQLClient from "@utils/useGQLQuery";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { Formik, Form, ErrorMessage } from "formik";
import FormField from "@components/ui/FormField";
import * as Yup from "yup";
import { GetErrorMessage,ToastMessage } from "@utils/ErrorCodes";

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

  async function CallPasswordLogin(values) {
    console.log("values on pasword login", values);
    const { mobile, password } = values;

    console.log(mobile, "mobile");
    console.log(password, "password");

    let isValid = true;

    if (!IsValidValue(mobile) || !IsValidMobile(mobile)) {
      setError({ text: "Please enter a valid Mobile Number" });
      isValid = false;
    }

    if (isValid && !IsValidValue(password)) {
      setError({ text: "Please enter a valid Password" });
      isValid = false;
    }

    if (isValid) {
      try {
        const result =
          await callAuthenticateUserWithPasswordMutation.mutateAsync({
            loginInput: {
              mobile: mobile,
              password,
            },
          });

          console.log('result of password login', result);
          

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
        if (
          error?.response &&
          error?.response &&
          error?.response.errors?.[0]?.errorCode
        ) {
          const errorCode = error?.response?.errors?.[0]?.errorCode
          const userFriendlyMessage = GetErrorMessage(errorCode);
          ToastMessage(userFriendlyMessage) // Show toast notification
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  }

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be only 10 digits long") // Ensures only 10 digits
      .required("Mobile number is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^(?=.{6,})/, "Password must contain at least 6 characters"),
  });

  // Initial form values
  const initialValues = {
    mobile: "",
    password: "",
  };

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
        <div className="mt-4 space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={CallPasswordLogin}
          >
            {(props) => (
              <Form>
                {/* Form Container */}
                <div className="p-2 w-full mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    <div>
                      <FormField
                        field="inputWithChange"
                        type="tel"
                        maxLength="10"
                        inputMode="numeric"
                        required
                        name="mobile"
                        label="Mobile Number"
                        width="w-full"
                        placeholder=" Mobile Number"
                        onChange={(e) => {
                          // Allow only numeric input by replacing non-numeric characters
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Remove non-numeric characters
                          props.setFieldValue("mobile", numericValue); // Update form value with numeric-only input
                        }}
                        value={props.values.mobile}
                        className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <FormField
                        field="input"
                        required
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        width="w-full"
                        placeholder="********"
                        showTogglePasswordButton
                      />
                    </div>
                    {/* <div
                      onClick={handleShowPassword}
                      className="absolute inset-y-0 top-2 right-3"
                    >
                      {!showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </div> */}
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <Button
                      btnclass="w-full py-3 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-md transition duration-300"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link href="/reset-password">
              <a className="text-sm font-medium text-indigo-600 hover:underline">
                Forgot your password?
              </a>
            </Link>
          </div>

          <div className=" text-center">
            <p className="text-base space-x-1 font-medium text-gray-700 flex justify-center">
              New to{" "}
              <span className="text-indigo-600 font-bold ml-1"> Autobse</span>?{" "}
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
