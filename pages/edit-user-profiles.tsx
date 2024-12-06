import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormField from "../components/ui/FormField";
import ButtonLoading from "../components/ui/ButtonLoading";
import placeholder from "@assets/noImage.jpeg";
import {
  useGetUserQuery,
  GetUserQueryVariables,
  useUpdateUserMutation,
  UpdateUserMutationVariables,
  UserStatusType,
  GetUserQuery,
  //   useUsersQuery,
  //   useDuplicateDataCheckQuery,
} from "@utils/graphql";
import graphQLClient from "@utils/useGQLQuery";
import withPrivateRoute from "../utils/withPrivateRoute";
import Loader from "@components/ui/Loader";
import { UserCircleIcon } from "@heroicons/react/outline";
import Router from "next/router";
import toast from "react-hot-toast";
import { cities } from "../utils/cities";
import { states } from "../utils/states";
import { useState, useEffect, useRef } from "react";
import { ResizeImage } from "../components/image-Resizing/imageProfile";
import DashboardTemplate from "../components/templates/DashboardTemplate";
// import {welcomeMessage} from "../components/alerts/welcomeMessage"
import Swal from "sweetalert2";
import Image from "next/image";
import { GetErrorMessage, ToastMessage } from "@utils/ErrorCodes";

const renderingStates = states.map((state) => {
  return { label: state.state, value: state.state };
});

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

function welcomeMessage(props) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: props.name,
    showConfirmButton: false,
    timer: 1500,
  });
}

function ProfileUpdate() {
  const id = localStorage.getItem("id");
  const fieldRefs = useRef({}); // Store refs for each field

  // const token = localStorage.getItem("token");
  const [emailCheckData, setEmailCheckData] = useState("");
  const [panCheckData, setPanCheckData] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [panEnabled, setPanEnabled] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to manage button disabled state

  const [imagePreviews, setImagePreviews] = useState({
    pancard_image: null,
    aadharcard_front_image: null,
    aadharcard_back_image: null,
    driving_license_front_image: null,
    driving_license_back_image: null,
  });
  const [accessToken, setAccessToken] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setAccessToken(token);
    }
  }, []);

  const { data: data, isLoading: isLoadingGetUser } =
    useGetUserQuery<GetUserQuery>(
      graphQLClient({ Authorization: `Bearer ${accessToken}` }),
      { where: { id } },
      {
        enabled: !!accessToken && !!id, // Enable query only when `isReady` is true
        refetchOnWindowFocus: false,
        refetchInterval: false, // Do not refetch on window focus
        refetchOnMount: false, // Prevent refetch on component mount
        // staleTime: 1000 * 60 * 5,         // Cache the result for 5 minutes
      }
    );

  useEffect(() => {
    if (data?.user?.state) {
      setSelectedState(data?.user?.state);
    }
  }, [data?.user]);

  useEffect(() => {
    // if (selectedState != null && selectedState != "") {
    // filter cities and fill in cities object
    // console.log("789");
    // setFieldValue("state", "Karnataka");

    const filteredC = cities.filter((c) => c.state === selectedState);

    setFilteredCities(
      filteredC.map((city, index) => {
        return {
          label: city.city,
          value: city.city,
        };
      })
    );
    // }
  }, [selectedState, data?.user]);

  const callUpdateUserMutation =
    useUpdateUserMutation<UpdateUserMutationVariables>(
      graphQLClient({ Authorization: `Bearer ${accessToken}` })
    );

  if (isLoadingGetUser) {
    return <Loader />;
  }

  const userValidation = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),

    email: Yup.string()
      // .required("Email is required")
      .email("Invalid Email Address"), // Built-in email validation
    // city: Yup.string()
    // .required("city  is required")
    // .test(
    //     "is-not-placeholder",
    //     "Please select a valid City",
    //     (value) => value !== "Please Select a City" && value !== ""
    //   ),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be only 10 digits long")
      .required("Mobile number is required"),
    state: Yup.string()
      .required("State is required")
      .test(
        "is-not-placeholder",
        "Please select a valid state",
        (value) => value !== "Please Select State" && value !== ""
      ),
  });

  const handleUserDetails = async (values, { setSubmitting }) => {
    console.log(values);

    setIsButtonDisabled(true); // Disable the button

    console.log("setSubmitting", setSubmitting);
    setSubmitting(true);
    try {
      const result = await callUpdateUserMutation.mutateAsync({
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          city: values.city,
          state: values.state,
          country: "India",
          pancardNo: values.pancardNo,
          status: UserStatusType.Active,
        },
        where: { id: values.id },
      });
      console.log("result", result);
      // Save information to localStorage on successful mutation
      localStorage.setItem("status", "active");
      localStorage.setItem("name", `${values.firstName}`);
      let name = values.firstName;

      // Display success message

      if (result?.updateUser?.id) {
        setTimeout(() => {
          toast.success(` Profile Updated`);
        }, 1000);
        setSubmitting(false);
      }
    } catch (error) {
      // Handle errors gracefully
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    } finally {
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
    }
  };

  const documetSchema = Yup.object({});

  const handleDocumentSubmit = async (values) => {
    // console.log("values", values);

    const formData = new FormData();

    // Append non-file fields
    formData.append("documentType", values.documentType);

    // Append file fields if they exist
    if (values.pancard_image) {
      formData.append("pancard_image", values.pancard_image);
    }
    if (values.aadharcard_front_image) {
      formData.append("aadharcard_front_image", values.aadharcard_front_image);
    }
    if (values.aadharcard_back_image) {
      formData.append("aadharcard_back_image", values.aadharcard_back_image);
    }
    if (values.driving_license_front_image) {
      formData.append(
        "driving_license_front_image",
        values.driving_license_front_image
      );
    }
    if (values.driving_license_back_image) {
      formData.append(
        "driving_license_back_image",
        values.driving_license_back_image
      );
    }

    const apiUrl = `https://api-dev.autobse.com/api/v1/fileupload/userprofile/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        body: formData,
        headers: {
          "x-apollo-operation-name": "uploadUserProfile", // Include this header
          // Other headers can go here
        },
      });

      // console.log("result", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Handle successful response
        localStorage.setItem("status", "active");
        localStorage.setItem("name", `${data?.res.firstName}`);
        let name = data?.res.firstName;
        // Router.push("/dashboard");
        toast.success(`Documents Updated`);
      }
      console.log("Success:", data);
    } catch (error) {
      if (
        error.response &&
        error.response &&
        error.response.errors?.[0]?.errorCode
      ) {
        const errorCode = error.response.errors?.[0]?.errorCode;
        console.log("ERROR CODE ", errorCode);

        const userFriendlyMessage = GetErrorMessage(errorCode);
        ToastMessage(userFriendlyMessage); // Show toast notification
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const scrollToError = (errors) => {
    console.log("scrollToError", errors);
    
    const firstErrorField = Object.keys(errors)[0]; // Find first invalid field
    if (firstErrorField && fieldRefs.current[firstErrorField]) {
      fieldRefs.current[firstErrorField].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      fieldRefs.current[firstErrorField].focus();
    }
  };

  return (
    <DashboardTemplate>
      <div className="max-w-full mx-auto my-16 px-4">
        {data && (
          <div className="space-y-8">
            <div className="py-8 bg-gray-100 rounded px-4 sm:px-6 flex items-center justify-between">
              <h2 className="text-xl leading-6 font-medium text-gray-900">
                Please update your profile
              </h2>
              <UserCircleIcon className="w-8 h-8 text-gray-400" />
            </div>

            <Formik
              initialValues={{
                id: data["user"]["id"],
                firstName: data["user"]["firstName"],
                lastName: data["user"]["lastName"],
                email: data["user"]["email"],
                // city: data["user"]["city"] ? data["user"]["city"] : "",
                state: data["user"]["state"] ? data["user"]["state"] : "",
                country: data["user"]["country"]
                  ? data["user"]["country"]
                  : "India",
                // password: "",
                // passwordConfirmation: "",
                mobile: data["user"]["mobile"],
                // idProofType: "aadhar",
                // idProofNo: data["user"]["idProofNo"],
                // pancardNo: data["user"]["pancardNo"],
                // pancard: null,
                // idProof: null,
                // idProofBack: null,
              }}
              validationSchema={userValidation}
              onSubmit={handleUserDetails}
            >
              {(props) => (
                <Form
                // onSubmit={async (e) => {
                //   console.log('trigrred validated onsubmit ',);

                //   e.preventDefault(); // Prevent default form submission
                //   const validationErrors = await props?.validateForm(); // Trigger validation
                //   if (Object.keys(validationErrors).length > 0) {
                //     // If validation fails, scroll to first error
                //     console.log('validation errors',validationErrors);

                //     console.log('error contains in form');

                //     scrollToError(validationErrors);
                //   } else {
                //     // If validation passes, proceed with submission
                //     props?.handleSubmit(e);
                //     console.log('All validation passes',);

                //   }
                // }}
                >
                  <div className="space-y-3 mt-4 pb-4">
                    <div className="mt-6 grid grid-cols-6 gap-6">
                      <div className="space-y-1 col-span-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Basic Details
                        </h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                          Please update your basic details here.
                        </p>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
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

                      <div className="col-span-6 sm:col-span-3">
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

                      <div className="col-span-6  sm:col-span-3">
                        <FormField
                          field="input"
                          name="email"
                          label="Email Address"
                          width="w-full"
                          placeholder="Email Address"
                          custom
                          fieldRef={fieldRefs}
                          onBlur={(e) => {
                            setEmailCheckData(e.target.value);
                            setEmailEnabled(e.target.value != "");
                          }}
                        />
                      </div>

                      <div className="col-span-6  sm:col-span-3">
                        <FormField
                          field="input"
                          fieldRef={fieldRefs}
                          disabled={true}
                          name="mobile"
                          label="Mobile Number"
                          width="w-full"
                          placeholder="Mobile Number"
                          className="bg-gray-50 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      {/* <div className="col-span-6 sm:col-span-3">
                        <FormField
                          field="select"
                          name="country"
                          label="Country"
                          width="w-full"
                          placeholder="Country"
                          options={renderingCountries}
                          defaultValue="India"
                          onChange={async (e) => {
                            const { value } = e.target;
                            props.setFieldValue("country", value);
                          }}
                        />
                      </div> */}
                      <div className="col-span-6 sm:col-span-3">
                        <FormField
                          field="select"
                          fieldRef={fieldRefs}
                          disabled={true}
                          name="state"
                          label="State"
                          width="w-full"
                          placeholder="Please Select State"
                          options={renderingStates}
                          onChange={async (e) => {
                            const { value } = e.target;
                            props.setFieldValue("state", value);
                            props.setFieldValue("city", "");
                            setSelectedState(value);
                          }}
                        />
                      </div>

                      {/* <div className="col-span-6 sm:col-span-3">
                        <FormField
                          field="select"
                          name="city"
                          label="City"
                          width="w-full"
                          placeholder="Please Select a City"
                          options={filteredCities}
                          onChange={async (e) => {
                            const { value } = e.target;
                            props.setFieldValue("city", value);
                          }}
                        />
                      </div> */}
                    </div>

                    <div className="my-8 flex justify-center">
                      <ButtonLoading
                        // loading={callUpdateUserMutation.isLoading ? true : false}
                        disabled={props?.isSubmitting || isButtonDisabled}
                        type="submit"
                        color="indigo"
                      >
                        {props?.isSubmitting || isButtonDisabled
                          ? "Updating..."
                          : "Update Details"}
                      </ButtonLoading>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <Formik
              initialValues={{
                documentType: "",
                pancard_image: null,
                aadharcard_front_image: null,
                aadharcard_back_image: null,
                driving_license_front_image: null,
                driving_license_back_image: null,
              }}
              onSubmit={handleDocumentSubmit}
              validationSchema={documetSchema}
            >
              {({ values, setFieldValue }) => (
                <Form className="mx-auto ">
                  <div className="space-y-3 mt-4 pb-4">
                    <div className="mt-6 ">
                      <div className="space-y-1 mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Document Details
                        </h3>
                        <p className="max-w-2xl text-sm text-gray-500 mb-4">
                          Please update your document details here.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-8 place-items-center">
                        {/* Pan Card Field */}
                        <div className="col-span-1">
                          <div className="mt-2">
                            <Image
                              src={
                                imagePreviews.pancard_image ||
                                (data?.user?.pancard_image &&
                                !values.pancard_image
                                  ? data.user.pancard_image
                                  : placeholder)
                              }
                              alt="Pan Card Preview"
                              width={250}
                              height={128}
                              className="mt-2 object-cover rounded-lg"
                            />
                          </div>
                          <label
                            htmlFor="pancard_image"
                            className="block text-lg font-medium text-gray-700 mb-2"
                          >
                            Pan Card
                          </label>
                          <Field name="pancard_image">
                            {({ field }) => (
                              <input
                                type="file"
                                accept=".jpg,.jpeg"
                                id="pancard_image"
                                className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={async (e) => {
                                  const file = e.target.files[0];
                                  const image = await ResizeImage(file);

                                  setFieldValue("pancard_image", image);
                                  setImagePreviews((prev) => ({
                                    ...prev,
                                    pancard_image: file
                                      ? URL.createObjectURL(file)
                                      : null,
                                  }));
                                }}
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="pancard_image"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        {/* Aadhar Form Fields */}
                        <div className="col-span-1">
                          <div className="mt-2">
                            <Image
                              src={
                                imagePreviews.aadharcard_front_image ||
                                (data?.user?.aadharcard_front_image &&
                                !values.aadharcard_front_image
                                  ? data.user.aadharcard_front_image
                                  : placeholder)
                              }
                              alt="Aadhar Front Preview"
                              width={250}
                              height={128}
                              className="mt-2 object-cover rounded-lg"
                            />
                          </div>
                          <label
                            htmlFor="aadharcard_front_image"
                            className="block text-lg font-medium text-gray-700 mb-2"
                          >
                            Aadhar Front
                          </label>
                          <Field name="aadharcard_front_image">
                            {({ field }) => (
                              <input
                                type="file"
                                accept=".jpg,.jpeg"
                                id="aadharcard_front_image"
                                className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={async (e) => {
                                  const file = e.target.files[0];
                                  const image = await ResizeImage(file);

                                  setFieldValue(
                                    "aadharcard_front_image",
                                    image
                                  );
                                  setImagePreviews((prev) => ({
                                    ...prev,
                                    aadharcard_front_image: file
                                      ? URL.createObjectURL(file)
                                      : null,
                                  }));
                                }}
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="aadharcard_front_image"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="col-span-1">
                          <div className="mt-2">
                            <Image
                              src={
                                imagePreviews.aadharcard_back_image ||
                                (data?.user?.aadharcard_back_image &&
                                !values.aadharcard_back_image
                                  ? data.user.aadharcard_back_image
                                  : placeholder)
                              }
                              alt="Aadhar Back Preview"
                              width={250}
                              height={128}
                              className="mt-2 object-cover rounded-lg"
                            />
                          </div>
                          <label
                            htmlFor="aadharcard_back_image"
                            className="block text-lg font-medium text-gray-700 mb-2"
                          >
                            Aadhar Back
                          </label>
                          <Field name="aadharcard_back_image">
                            {({ field }) => (
                              <input
                                type="file"
                                accept=".jpg,.jpeg"
                                id="aadharcard_back_image"
                                className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={async (e) => {
                                  const file = e.target.files[0];
                                  const image = await ResizeImage(file);

                                  setFieldValue("aadharcard_back_image", image);
                                  setImagePreviews((prev) => ({
                                    ...prev,
                                    aadharcard_back_image: file
                                      ? URL.createObjectURL(file)
                                      : null,
                                  }));
                                }}
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="aadharcard_back_image"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        {/* Driving License Form Fields */}
                        <div className="col-span-1">
                          <div className="mt-2">
                            <Image
                              src={
                                imagePreviews.driving_license_front_image ||
                                (data?.user?.driving_license_front_image &&
                                !values.driving_license_front_image
                                  ? data.user.driving_license_front_image
                                  : placeholder)
                              }
                              alt="Driving License Front Preview"
                              width={250}
                              height={128}
                              className="mt-2 object-cover rounded-lg"
                            />
                          </div>
                          <label
                            htmlFor="driving_license_front_image"
                            className="block text-lg font-medium text-gray-700 mb-2"
                          >
                            Driving License Front
                          </label>
                          <Field name="driving_license_front_image">
                            {({ field }) => (
                              <input
                                type="file"
                                accept=".jpg,.jpeg"
                                id="driving_license_front_image"
                                className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={async (e) => {
                                  const file = e.target.files[0];
                                  const image = await ResizeImage(file);

                                  setFieldValue(
                                    "driving_license_front_image",
                                    image
                                  );
                                  setImagePreviews((prev) => ({
                                    ...prev,
                                    driving_license_front_image: file
                                      ? URL.createObjectURL(file)
                                      : null,
                                  }));
                                }}
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="driving_license_front_image"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="col-span-1">
                          <div className="mt-2">
                            <Image
                              src={
                                imagePreviews.driving_license_back_image ||
                                (data?.user?.driving_license_back_image &&
                                !values.driving_license_back_image
                                  ? data.user.driving_license_back_image
                                  : placeholder)
                              }
                              alt="Driving License Back Preview"
                              width={250}
                              height={128}
                              className="mt-2 object-cover rounded-lg"
                            />
                          </div>
                          <label
                            htmlFor="driving_license_back_image"
                            className="block text-lg font-medium text-gray-700 mb-2"
                          >
                            Driving License Back
                          </label>
                          <Field name="driving_license_back_image">
                            {({ field }) => (
                              <input
                                type="file"
                                accept=".jpg,.jpeg"
                                id="driving_license_back_image"
                                className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={async (e) => {
                                  const file = e.target.files[0];
                                  const image = await ResizeImage(file);

                                  setFieldValue(
                                    "driving_license_back_image",
                                    image
                                  );
                                  setImagePreviews((prev) => ({
                                    ...prev,
                                    driving_license_back_image: file
                                      ? URL.createObjectURL(file)
                                      : null,
                                  }));
                                }}
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="driving_license_back_image"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>

                      <div className="my-8 flex justify-center">
                        <ButtonLoading
                          // loading={callUpdateUserMutation.isLoading ? 1 : 0}
                          type="submit"
                          color="indigo"
                        >
                          Update Documents{" "}
                        </ButtonLoading>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
}

export default withPrivateRoute(ProfileUpdate);
