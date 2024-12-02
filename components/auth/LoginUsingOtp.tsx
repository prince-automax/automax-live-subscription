import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IsValidValue, IsValidMobile } from "../../utils/validations";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { CheckCircleIcon } from "@heroicons/react/solid";
import useStore from "../../utils/store";
import { Formik, Form, ErrorMessage } from "formik";
import FormField from "@components/ui/FormField";
import * as Yup from "yup";
import graphQLClient from "@utils/useGQLQuery";
import { states } from "@utils/states";
import { GetErrorMessage,ToastMessage } from "@utils/ErrorCodes";
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
} from "@utils/graphql";
import Link from "next/link";

export default function LoginUsingOtp() {
  const router = useRouter();
  const [success, setSuccess] = useState(null);
  const [verificationMode, setVerificationMode] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(null);

  const { setToken } = useStore((state) => ({
    setToken: (token) => state.setToken(token),
  }));

  const callOTPMutation = useSendOtpMutation<SendOtpDto>(graphQLClient());

  const callCreateUserMutation =
    useCreateUserMutation<CreateUserMutationVariables>(graphQLClient());

  const callVerifyOTP = useVerifyOtpMutation<VerfiyOtpDto>(graphQLClient());

  let currentPath = router.pathname;

  console.log("currentpath", currentPath);

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

  async function CallUserCreation(userInput) {
    console.log("hit on user Creation");
    console.log("User Input for creation:", userInput);

    try {
      const { firstName, lastName, pancard, state, mobile } = userInput;
      setMobileNumber(mobile);

      let isValid = true;

      if (!IsValidValue(mobile) || !IsValidMobile(mobile)) {
        setError({ text: "Please enter a valid Mobile Number" });
        isValid = false;
      }

      if (isValid) {
        // Proceed with user creation (sending OTP)
        const result = await callOTPMutation.mutateAsync({
          sendOtpDto: {
            firstName,
            lastName,
            pancardNo: pancard,
            state,
            mobile: mobile,
            forSignin: false,
          },
        });

        console.log("Result of user creation:", result);

        if (result?.sendOtp?.status === "Success") {
          setVerificationMode(true);
          setSuccess({
            text: "User created successfully. Please Enter the OTP.",
          });
        }
        // else {
        //   setError({ text: "User creation failed. Please try again." });
        // }
      }
    } catch (error: any) {
      console.log('ERROR', error);
      
      // console.log("pandi", error?.response?.errors?.[0]?.errorCode );

      // // Extracting the specific error message
      // const graphqlError =
      //   error?.response?.errors?.[0]?.errorCode ||
      //   "An error occurred during OTP sending. Please try again.";
      // // const graphqlError = error?.response?.errors?.[0]?.extensions?.exception?.originalError?.message?.[0] || "An error occurred during OTP sending. Please try again.";

      // console.log("grahqlError", graphqlError);

      // // Log full error for debugging purposes

      // // Display the extracted error message to the user
      console.log('ERROR CODE ', error.response.errors?.[0]?.errorCode);
      if (
        error.response &&
        error.response &&
        error.response.errors?.[0]?.errorCode
      ) {
        const errorCode =  error.response.errors?.[0]?.errorCode;
        console.log('ERROR CODE ', errorCode);
        
        const userFriendlyMessage = GetErrorMessage(errorCode);
        ToastMessage(userFriendlyMessage) // Show toast notification
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }

    
    }
  }

  async function CallLogin(values) {
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

        // console.log("Result of OTP sending for login:", result);

        if (result?.sendOtp?.status === "Success") {
          setVerificationMode(true);
          setSuccess({
            text: "Please enter the OTP received on your registered mobile number.",
          });
        }
        // else {
        //   setError({
        //     text: "Unable to send OTP. Please contact the support team.",
        //   });
        // }
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

  // handles the logic when the user clicks on the "Send OTP" button.
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

      // console.log('mobileNUmber:',mobileNumber,'otp:',otp);

      if (isValid) {
        const result = await callVerifyOTP.mutateAsync({
          verfiyOtpDto: { mobile: mobileNumber, otp },
        });

        // console.log("result of verify otp", result);

        if (result?.verifyOtp?.["access_token"]) {
          // console.log("hit");

          // Perform necessary actions upon successful OTP verification

          // router.push(`/dashboard`);

          setVerificationMode(true);
          setSuccess({
            text: "You have been successfully logged in.",
          });

          localStorage.setItem("token", result.verifyOtp?.["access_token"]);
          localStorage.setItem("id", result.verifyOtp?.["user"]["id"]);
          localStorage.setItem("status", result.verifyOtp["user"]["status"]);
          localStorage.setItem("name", result.verifyOtp["user"]["firstName"]);

          setToken(result.verifyOtp["access_token"]);
          setSuccess({
            text: "You have been successfully logged in.",
          });
          router.push(`/dashboard`);
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

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be only 10 digits long") // Ensures only 10 digits
      .required("Mobile number is required"),
  });

  const UservalidationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    pancard: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format")
      .required("PAN card is required"),
    state: Yup.string()
      .required("State is required")
      .notOneOf(["Please Select State", ""], "Please select a valid State"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be only 10 digits long") // Ensures only 10 digits
      .required("Mobile number is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  // Initial form values
  const UserInitialValues = {
    firstName: "",
    lastName: "",
    pancard: "",
    state: "Kerala", // default value
    mobile: "",
    terms: false, // checkbox initial value
  };

  // Initial form values
  const initialValues = {
    mobile: "",
    // checkbox initial value
  };
  const otpInitialValue = {
    otp: "",
  };
  const OTPvalidation = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]{4}$/, "OTP must be exactly 4 digits. ") // Ensures only 10 digits
      .required("OTP  is required"),
  });

  const renderingStates = states.map((state) => {
    return { label: state.state, value: state.state };
  });

  return (
    <>
      <div className="mt-4 w-full">
        {!verificationMode && (
          <>
            {router.pathname == "/register" ? (
              <>
                <Formik
                  initialValues={UserInitialValues}
                  validationSchema={UservalidationSchema}
                  onSubmit={CallUserCreation}
                >
                  {(props) => (
                    <Form>
                      {/* Form Container */}
                      <div className="p-2 w-full mx-auto">
                        {/* Title Section */}
                        <div className="mb-6">
                          <h2 className="text-2xl font-semibold text-gray-800">
                            Create Your Account
                          </h2>
                          <p className="text-gray-500 text-sm mt-1">
                            Fill in the details below to get started.
                          </p>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* First Name */}
                          <div>
                            <FormField
                              field="inputWithChange"
                              required
                              maxLength="30"
                              name="firstName"
                              label="First Name"
                              width="w-full"
                              placeholder="First Name"
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /[^a-zA-Z ]/g,
                                  ""
                                ); // Allow only letters and spaces
                                props.setFieldValue("firstName", value);
                              }}
                              value={props.values.firstName}
                              className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                          </div>

                          {/* Last Name */}
                          <div>
                            <FormField
                              field="inputWithChange"
                              required
                              maxLength="30"
                              name="lastName"
                              label="Last Name"
                              width="w-full"
                              placeholder="Last Name"
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /[^a-zA-Z ]/g,
                                  ""
                                ); // Allow only letters and spaces
                                props.setFieldValue("lastName", value);
                              }}
                              value={props.values.lastName}
                              className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                          </div>

                          {/* Pan Card */}
                          <div className="sm:col-span-2">
                            <FormField
                              field="inputWithChange"
                              maxLength="10"
                              required
                              name="pancard"
                              label="Pan Card"
                              width="w-full"
                              placeholder="Pan Card"
                              onChange={(e) => {
                                const upperCaseValue =
                                  e.target.value.toUpperCase();
                                props.setFieldValue("pancard", upperCaseValue);
                              }}
                              value={props.values.pancard}
                              className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                          </div>

                          {/* State */}
                          <div>
                            <FormField
                              field="select"
                              required
                              name="state"
                              label="State"
                              width="w-full"
                              placeholder="Please Select State"
                              options={renderingStates}
                              defaultValue=""
                              onChange={(e) => {
                                const { value } = e.target;
                                props.setFieldValue("state", value);
                              }}
                              className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                          </div>

                          {/* Mobile */}
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
                                props.setFieldValue("mobile", numericValue); // Update form value with numeric-only input
                              }}
                              value={props.values.mobile}
                              className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="mt-4 flex items-start">
                          <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="w-5 h-5 border-gray-300 rounded focus:ring-indigo-500"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            checked={props.values.terms}
                          />
                          <div className="ml-3">
                            <label className="text-gray-600 text-sm underline underline-offset-2 hover:text-blue-600 ">
                              I accept the{" "}
                              <Link
                                href="/tnc"
                                target="_blank" // Opens link in new tab
                                rel="noopener noreferrer" // Adds security
                                className="text-indigo-500 hover:underline"
                              >
                                <a target="_blank">Terms and Conditions</a>
                              </Link>
                            </label>
                            {props.errors.terms &&
                              props.touched.terms &&
                              typeof props.errors.terms === "string" && (
                                <div className="text-red-500 text-xs mt-1">
                                  {props.errors.terms}
                                </div>
                              )}
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

                        {/* Login Section */}
                        <div className=" mt-3 text-center">
                          <p className="text-base space-x-1 font-medium text-gray-700 flex justify-center">
                            Already have an account ?{" "}
                            <Link href="/login">
                              <p className="text-indigo-500 hover:text-indigo-700 hover:underline hover:border hover:cursor-pointer hover:bg-blue-200 rounded-full px-2 py-px">
                                Sign in
                              </p>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
                  {/* <div className="space-y-3">
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number{" "}
                      <span className="text-red-500 text-xs">*</span>
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      placeholder=" Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      maxLength={10}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

               
                  <div>
                    <Button
                      btnclass="w-full"
                      type="submit"
                      color="indigo"
                      onClick={CallLogin}
                    >
                      Send OTP
                    </Button>
                  </div> */}

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={CallLogin}
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
                              Sign In
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
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
              </>
            )}
          </>
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
                initialValues={otpInitialValue}
                validationSchema={OTPvalidation}
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
                onClick={CallLogin}
                className="text-sm font-medium text-indigo-600 hover:underline focus:outline-none"
              >
                Didn’t receive the OTP? Resend
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
