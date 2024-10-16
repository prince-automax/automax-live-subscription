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

export default function LoginUsingOtp() {
  const router = useRouter();
  const [success, setSuccess] = useState(null);
  const [verificationMode, setVerificationMode] = useState(false);
  const [otpPhase, setOtpPhase] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

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

  //This function, CallOTP, is an asynchronous function that handles the logic when the user clicks on the "Send OTP" button.
  // async function CallOTP() {
  //   try {
  //     console.log("mobile", mobile);

  //     let isValid = true;
  //     if (!IsValidValue(mobile) || !IsValidMobile(mobile)) {
  //       setError({ text: "Please enter a valid Mobile Number" });
  //       isValid = false;
  //     }

  //     if (isValid) {
  //       // the callOTPMutation to send the OTP, passing the mobile value as a parameter
  //       const result = await callOTPMutation.mutateAsync({
  //         sendOtpDto: { mobile }, // Wrap mobile in the sendOtpDto object
  //       });

  //       console.log("result of otp", result);

  //       if (result?.sendOtp?.status === "Success") {
  //         // user with the provided mobile number exists.
  //         setOtpPhase(true);
  //         setSuccess({
  //           text: "Please enter the OTP received on your registered mobile number.",
  //         });
  //       } else {
  //         setVerificationMode(false);
  //         setError({
  //           text: "Unable to send OTP. Please contact the support team.",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);

  //     // General error handling for failures in OTP sending process
  //     setError({
  //       text: "An unexpected error occurred. Please try again later.",
  //     });
  //     setVerificationMode(false);
  //   }
  // }

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
            mobile,
          },
        });
  
        console.log("Result of user creation:", result);
  
        if (result?.sendOtp?.status === "Success") {
          setVerificationMode(true);
          setSuccess({
            text: "User created successfully. Please enter the OTP.",
          });
        } else {
          setError({ text: "User creation failed. Please try again." });
        }
      }
    } catch (error: any) {
      // Extracting the specific error message
      const graphqlError = error?.response?.errors?.[0]?.message || "An error occurred during OTP sending. Please try again.";
  
      // Log full error for debugging purposes
      console.error("Error during OTP sending for user creation:", error);
  
      // Display the extracted error message to the user
      setError({
        text: graphqlError,
      });
    }
  }
  

  async function CallLogin() {
    console.log("hit on login");

    console.log("Mobile for login:", mobileNumber);

    try {
      let isValid = true;

      // Validate mobile number
      if (!IsValidValue(mobileNumber) || !IsValidMobile(mobileNumber)) {
        setError({ text: "Please enter a valid Mobile Number" });
        isValid = false;
      }

      // Proceed with OTP sending for login
      if (isValid) {
        const result = await callOTPMutation.mutateAsync({
          sendOtpDto: { mobile: mobileNumber },
        });

        console.log("Result of OTP sending for login:", result);

        if (result?.sendOtp?.status === "Success") {
          setVerificationMode(true);
          setSuccess({
            text: "Please enter the OTP received on your registered mobile number.",
          });
        } else {
          setError({
            text: "Unable to send OTP. Please contact the support team.",
          });
        }
      }
    } catch (error) {
      // Extracting the specific error message
      const graphqlError = error?.response?.errors?.[0]?.message || "An error occurred during OTP sending. Please try again.";
  
      // Log full error for debugging purposes
      console.error("Error during OTP sending for user creation:", error);
  
      // Display the extracted error message to the user
      setError({
        text: graphqlError,
      });
    }
  }

  // handles the logic when the user clicks on the "Send OTP" button.
  async function CallOTPVerify() {
    try {
      let isValid = true;

      if (!IsValidValue(otp)) {
        setError({ text: "Please enter a valid OTP." });
        isValid = false;
      }

      console.log('mobileNUmber:',mobileNumber,'otp:',otp);
      

      if (isValid) {
        const result = await callVerifyOTP.mutateAsync({
          verfiyOtpDto: { mobile: mobileNumber, otp },
        });

        console.log("result of verify otp", result);

        if (result?.verifyOtp?.["access_token"]) {
          console.log("hit");

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
          
        } else {
          setError({
            text: "OTP verification failed. Please contact the support team.",
          });
        }
      }
    } catch (error) {
      const graphqlError = error?.response?.errors?.[0]?.message || "An error occurred during OTP sending. Please try again.";
  
      // Log full error for debugging purposes
      console.error("Error during OTP sending for user creation:", error);
  
      // Display the extracted error message to the user
      setError({
        text: graphqlError,
      }); 
      setVerificationMode(false);
    }
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    pancard: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format")
      .required("PAN card is required"),
    state: Yup.string().required("State is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be only 10 digits long") // Ensures only 10 digits
      .required("Mobile number is required"),
  });

  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    pancard: "",
  };
  // Submit handler
  const onSubmit = (values) => {
    console.log(values);
    // You can perform actions like sending the data to an API here
  };
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
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={CallUserCreation}
                >
                  {(props) => (
                    <Form>
                      <div className="mt-6 grid grid-cols-1 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <FormField
                            field="input"
                            required
                            name="firstName"
                            label="First Name"
                            width="w-full"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <FormField
                            field="input"
                            required
                            name="lastName"
                            label="Last Name"
                            width="w-full"
                            placeholder="Last Name"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <FormField
                            field="input"
                            required
                            name="pancard"
                            label="Pan Card"
                            width="w-full"
                            placeholder="Pan Card"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <FormField
                            field="select"
                            required
                            name="state"
                            label="State"
                            width="w-full"
                            placeholder="State"
                            options={renderingStates}
                            defaultValue="Kerala"
                            onChange={async (e) => {
                              const { value } = e.target;
                              props.setFieldValue("state", value);
                            }}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <FormField
                            field="input"
                            required
                            name="mobile"
                            label="Enter Mobile Number"
                            width="w-full"
                            placeholder="Mobile Number"
                          />
                        </div>
                        <Button
                          btnclass="w-full"
                          type="submit"
                          color="indigo"
                          // onClick={CallUserCreation}
                        >
                          Send OTP
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Please enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                  }}
                  maxLength={10}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <Button
                  btnclass="w-full"
                  type="submit"
                  color="indigo"
                  onClick={CallLogin}
                >
                  Send OTP
                </Button>
              </>
            )}
          </>
        )}

        {verificationMode && (
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
                    OTP sent successfully!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Please enter the OTP received on your registered mobile
                      number.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Please enter otp"
                  value={otp}
                  onChange={(e) => {
                    setOTP(e.target.value);
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Button
                btnclass="w-full"
                type="submit"
                color="indigo"
                onClick={CallOTPVerify}
              >
                Submit
              </Button>

              <button
                className="w-full text-center text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 rounded"
                onClick={() => {
                  setVerificationMode(false);
                }}
              >
                Cancel
              </button>
            </div>
            <button
              type="button"
              // onClick={CallOTP}
              className="w-full flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 hover:text-indigo-800 focus:outline-none"
            >
              Click here to resend OTP
            </button>
          </div>
        )}
      </div>
    </>
  );
}
