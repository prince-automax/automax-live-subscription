import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  IsValidValue,
  IsValidMobile,
  IsValidPassword,
  IsSameValue,
} from "../../utils/validations";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Formik, Form, ErrorMessage } from "formik";
import FormField from "@components/ui/FormField";
import * as Yup from "yup";
import graphQLClient from "@utils/useGQLQuery";
import {
  useCreateUserMutation,
  CreateUserMutationVariables,
  SendOtpMutation,
  SendOtpMutationVariables,
  VerifyOtpMutation,
  VerifyOtpMutationVariables,
  useSendOtpMutation,
  SendOtpDto,
  useVerifyOtpMutation,
  VerfiyOtpDto,
  useResetPasswordMutation,
  ResetPasswordMutationVariables,
} from "@utils/graphql";
import {
  GetErrorMessage,
  ToastMessage,
  SuccessMessage,
} from "@utils/ErrorCodes";

export default function ResetPassword() {
  const router = useRouter();
  const [success, setSuccess] = useState(null);

  const [mobileMode, setMobileMode] = useState(true);
  const [verificationMode, setVerificationMode] = useState(false);
  const [updatePasswordMode, setUpdatePasswordMode] = useState(false);

  const [mobile, setMobile] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const callOTPMutation = useSendOtpMutation<SendOtpDto>(graphQLClient());

  const callVerifyOTP = useVerifyOtpMutation<VerfiyOtpDto>(graphQLClient());
  const callResetPassword =
    useResetPasswordMutation<ResetPasswordMutationVariables>(
      graphQLClient({ Authorization: `Bearer ${token}` })
    );

  const HandleCancel = () => {
    setMobileMode(true);
    setVerificationMode(false);
    setUpdatePasswordMode(false);
  };

  const mobileFormValidation = Yup.object({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be only 10 digits long") // Ensures only 10 digits
      .required("Mobile number is required"),
  });
  const verifyFormValidation = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]{4}$/, "OTP must be exactly 4 digits. ") // Ensures only 10 digits
      .required("OTP  is required"),
  });

  const passwordFormValidation = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(64, "Password cannot be more than 64 characters")
      .matches(/^(?=.{6,})/, "Password must contain at least 6 characters"),

    passwordConfirmation: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .min(6, "Confirm password must be at least 6 characters")
      .max(64, "Confirm password cannot be more than 64 characters"),
  });

  async function CallOTP(values) {
    console.log("values", values);

    const { mobile } = values;
    const MobilePhone = mobile ? mobile : mobileNumber;
    try {
      let isValid = true;

      // Validate mobile number
      if (!IsValidValue(MobilePhone) || !IsValidMobile(MobilePhone)) {
        setError({ text: "Please enter a valid Mobile Number" });
        isValid = false;
      }

      // Proceed with OTP sending for login
      if (isValid) {
        const result = await callOTPMutation.mutateAsync({
          sendOtpDto: { mobile: MobilePhone, forSignin: true },
        });

        console.log("Result of OTP sending for login:", result);

        if (result?.sendOtp?.status === "Success") {
          console.log("ENTERED HERE");
          SuccessMessage(
            "Please enter the OTP received on your registered mobile number."
          );

          // setSuccess({
          //   text: "Please enter the OTP received on your registered mobile number.",
          // });
          setVerificationMode(true);
          setMobileMode(false);
        } else {
          setError({
            text: "Unable to send OTP. Please contact the support team.",
          });
        }
      }
    } catch (error) {
      console.log("PASSWORD RESET OTP ERROR", error);

      if (
        error?.response &&
        error?.response &&
        error?.response.errors?.[0]?.errorCode
      ) {
        const errorCode = error?.response?.errors?.[0]?.errorCode;
        const userFriendlyMessage = GetErrorMessage(errorCode);
        ToastMessage(userFriendlyMessage); // Show toast notification
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  async function CallOTPVerify(values) {
    console.log("otp form", values);
    const { otp } = values;
    console.log("mobileNumber", mobileNumber);

    try {
      let isValid = true;

      if (!IsValidValue(otp)) {
        setError({ text: "Please enter a valid OTP." });
        isValid = false;
      }

      if (isValid) {
        const result = await callVerifyOTP.mutateAsync({
          verfiyOtpDto: { mobile: mobileNumber, otp },
        });

        if (result?.verifyOtp?.["access_token"]) {
          setToken(result?.verifyOtp?.["access_token"]);
          SuccessMessage(
            "OTP verification successful. please update your new password"
          );

          setVerificationMode(false);
          setUpdatePasswordMode(true);

          setToken(result.verifyOtp["access_token"]);

          //   router.push(`/dashboard`);
          setMobileNumber("");
        }
        // else {
        //   setError({
        //     text: "OTP verification failed. Please contact the support team.",
        //   });
        // }
      }
    } catch (error) {
      console.log("error of verify otp", error);

      let graphqlError =
        error?.response?.errors?.[0]?.message ||
        "An error occurred during OTP sending. Please try again.";

      // Log full error for debugging purposes
      console.error("Error during OTP sending for user creation:", error);
      if (graphqlError === "Invalid otp.") {
        graphqlError = "Invalid OTP";
        setVerificationMode(true);
        setOTP("");
      }
      //  else {
      //   setVerificationMode(false);
      // }
      // Display the extracted error message to the user
      setError({
        text: graphqlError,
      });
      // setVerificationMode(false);
    }
  }

  const ResetPassword = async (values) => {
    try {
      const result = await callResetPassword.mutateAsync({
        data: {
          password: values?.password,
        },
      });
      console.log(result);

      if (result?.resetUserPassword?.id) {
        toast.success("Password successfully reset, Please Login");
        router.push("/login");
      }
    } catch (error) {
      const err = error.response.errors[0].message;
      if (err === "Password must be at least 6 characters long") {
        toast.error("Password must be at least 6 characters long");
      } else if (err === "Password cannot exceed 64 characters") {
        toast.error(" Password cannot exceed 64 characters");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="mt-4">
        {mobileMode && (
          <Formik
            initialValues={{ mobile: "" }}
            validationSchema={mobileFormValidation}
            onSubmit={CallOTP}
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
                        placeholder="Enter Mobile Number"
                        onChange={(e) => {
                          // Allow only numeric input by replacing non-numeric characters
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Remove non-numeric characters
                          setMobileNumber(numericValue);
                          props.setFieldValue("mobile", numericValue); // Update form value with numeric-only input
                        }}
                        value={props.values.mobile}
                        className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <Button
                      btnclass="w-full py-3 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-md transition duration-300"
                      type="submit"
                    >
                      Send OTP
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {verificationMode && (
          <div className="max-w-lg mx-auto  bg-white border border-gray-200 rounded-lg shadow-md p-6">
            {/* Header Section */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Verify Your OTP
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter the One-Time Password sent to your registered mobile
                number.
              </p>
            </div>

            {/* Success Message */}
            <div className="mt-6 flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircleIcon
                className="h-6 w-6 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-3 text-sm text-green-700">
                OTP sent successfully! Please check your messages.
              </p>
            </div>

            {/* OTP Input */}
            <div className="mt-6">
              {/* <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                One-Time Password
              </label>
              <input
                type="text"
                id="otp"
                maxLength={4}
                value={otp}
                // onChange={(e) => setOTP(e.target.value)}
                onChange={(e) => {
                  // Allow only numeric input by replacing non-numeric characters
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setOTP(numericValue);
                }}
                placeholder="Enter OTP"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              /> */}
              <Formik
                initialValues={{ otp: "" }}
                validationSchema={verifyFormValidation}
                onSubmit={CallOTPVerify}
              >
                {(props) => (
                  <Form>
                    {/* Form Container */}
                    <div className="p-2 w-full mx-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                        <div>
                          <FormField
                            field="inputWithChange"
                            type="text"
                            maxLength="4"
                            inputMode="numeric"
                            required
                            name="otp"
                            label="Enter OTP"
                            width="w-full"
                            placeholder="OTP"
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              props.setFieldValue("otp", numericValue); // Update form value with numeric-only input
                            }}
                            value={props.values.otp}
                            className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <button
                          type="submit"
                          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium"
                        >
                          Verify OTP
                        </button>
                        <button
                          type="button"
                          onClick={() => router.push("/")}
                          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            {/* Action Buttons */}

            {/* Resend OTP */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={CallOTP}
                className="text-sm font-medium text-indigo-600 hover:underline focus:outline-none"
              >
                Didn’t receive the OTP? Resend
              </button>
            </div>
          </div>
        )}

        {updatePasswordMode && (
          <div className="space-y-6">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    OTP successfully verified!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Please enter your new password.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <Formik
                initialValues={{
                  password: "",
                  passwordConfirmation: "",
                }}
                validationSchema={passwordFormValidation}
                onSubmit={ResetPassword}
              >
                {(props) => (
                  <Form>
                    {/* Form Container */}
                    <div className="p-2 w-full mx-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                        <div className="col-span-6 sm:col-span-3">
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

                        <div className="col-span-6 sm:col-span-3">
                          <FormField
                            field="input"
                            required
                            id="passwordConfirmation"
                            label="Confirm Password"
                            name="passwordConfirmation"
                            type="password"
                            placeholder="********"
                            width="w-full"
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
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            {/* <div className="space-y-4">
              <Button
                btnclass="w-full"
                type="submit"
                color="indigo"
                // onClick={CallUpdatePassword}
              >
                Update Password
              </Button>

              <button
                className="w-full text-center text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 rounded"
                onClick={HandleCancel}
              >
                Cancel
              </button>
            </div> */}
          </div>
        )}
      </div>
    </>
  );
}
