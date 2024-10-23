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
import { countries } from "../utils/countries";
import { useState, useEffect } from "react";
import { ResizeImage } from "../components/image-Resizing/imageProfile";
import DashboardTemplate from "../components/templates/DashboardTemplate";
// import {welcomeMessage} from "../components/alerts/welcomeMessage"
import Swal from "sweetalert2";
import Image from "next/image";

const userIdProofTypes = [
  { label: "Aadhar Number", value: "aadhar" },
  { label: "Passport Number", value: "passport" },
  { label: "Driving License Number", value: "drivingLicense" },
];

const renderingCities = cities.map((city, index) => {
  return {
    label: city.city,
    value: `${city.city}-${city.state}`,
  };
});

const renderingStates = states.map((state) => {
  return { label: state.state, value: state.state };
});

const renderingCountries = countries.map((country) => {
  return { label: country.name, value: country.name };
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

  // const token = localStorage.getItem("token");
  const [emailCheckData, setEmailCheckData] = useState("");
  const [panCheckData, setPanCheckData] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [panEnabled, setPanEnabled] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    pancard_image: null,
    aadharcard_front_image: null,
    aadharcard_back_image: null,
    driving_license_front_image: null,
    driving_license_back_image: null,
  });
  const [accessToken, setAccessToken] = useState("");
  const [selectedState, setSelectedState] = useState("Kerala");
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (selectedState != null && selectedState != "") {
      // filter cities and fill in cities object

      const filteredC = cities.filter((c) => c.state === selectedState);

      setFilteredCities(
        filteredC.map((city, index) => {
          return {
            label: city.city,
            value: `${city.city}-${city.state}`,
          };
        })
      );
    }
  }, [selectedState]);

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
        enabled: accessToken !== "",
      }
    );

  //  useEffect(() => {
  //   if (data) {
  //     setImagePreviews({
  //       pancard_image: data.user?.pancard_image || null,
  //       aadharcard_front_image: data?.user?.aadharcard_front_image || null,
  //       aadharcard_back_image: data?.user?.aadharcard_back_image || null,
  //       driving_license_front_image: data?.user?.driving_license_front_image || null,
  //       driving_license_back_image: data?.user?.driving_license_back_image || null,
  //     });
  //   }
  // }, [data]);

  // console.log("datas", data);

  // const pancard = data ? data["user"]?.pancard?.url : "";

  //   const { data: duplicateEmailCheckData } = useDuplicateDataCheckQuery(
  //     graphQLClient({ Authorization: `Bearer ${accessToken}` }),
  //     {
  //       where: {
  //         email: {
  //           equals: emailCheckData,
  //         },
  //         id: {
  //           not: {
  //             equals: id,
  //           },
  //         },
  //       },
  //     },
  //     {
  //       enabled: emailEnabled && accessToken != "",
  //     }
  //   );

  //   const { data: duplicatePanCheckData } = useDuplicateDataCheckQuery(
  //     graphQLClient({ Authorization: `Bearer ${accessToken}` }),
  //     {
  //       where: {
  //         pancardNo: {
  //           equals: panCheckData,
  //         },
  //         id: {
  //           not: {
  //             equals: id,
  //           },
  //         },
  //       },
  //     },
  //     {
  //       enabled: panEnabled && accessToken != "",
  //     }
  //   );

  //   useEffect(() => {
  //     if (duplicateEmailCheckData?.sudoUsersCount > 0 && emailEnabled) {
  //       alert(
  //         "The Email you have entered has already been connected with another account."
  //       );
  //       setEmailEnabled(false);
  //     }
  //   }, [duplicateEmailCheckData, emailEnabled]);

  //   useEffect(() => {
  //     if (duplicatePanCheckData?.sudoUsersCount > 0 && panEnabled) {
  //       alert(
  //         "The Pan you have entered has already been connected with another account."
  //       );
  //       setPanEnabled(false);
  //     }
  //   }, [duplicatePanCheckData, panEnabled]);

  const callUpdateUserMutation =
    useUpdateUserMutation<UpdateUserMutationVariables>(
      graphQLClient({ Authorization: `Bearer ${accessToken}` })
    );

  if (isLoadingGetUser) {
    return <Loader />;
  }

  const validationSchema = Yup.object({
    id: Yup.string().required(),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    // password: Yup.string()
    //   .required("Password is required")
    //   .matches(/^(?=.{6,})/, "Password must contain at least 8 characters"),
    // passwordConfirmation: Yup.string()
    //   .required("Confirm password is required")
    //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
    idProofType: Yup.string(),
    // .required("Id proof type is required"),
    idProofNo: Yup.string(),
    // .required("Id proof number is required"),
    pancardNo: Yup.string(),
    // .required("Pan Card number is required")
    // .max(10, "Invalid Pan Card number")
    // .min(10, "Invalid Pan Card number"),
    pancard: Yup.mixed(),
    // .required("Pancard is required")
    // .test(
    //   "fileFormat",
    //   "Unsupported Format. Please upload a file with one of the following formats: " +
    //     SUPPORTED_FORMATS.join(", "),
    //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
    // ),
    idProof: Yup.mixed(),
    // .required("ID proof is required")
    // .test(
    //   "fileFormat",
    //   "Unsupported Format. Please upload a file with one of the following formats: " +
    //     SUPPORTED_FORMATS.join(", "),
    //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
    // ),
    idProofBack: Yup.mixed(),
    // .required("ID proof is required")
    // .test(
    //   "fileFormat",
    //   "Unsupported Format. Please upload a file with one of the following formats: " +
    //     SUPPORTED_FORMATS.join(", "),
    //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
    // ),
    mobile: Yup.string().required("Mobile number is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
  });

  const onSubmit = async (values) => {
    const result = await callUpdateUserMutation.mutateAsync({
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        city: values.city,
        state: values.state,
        country: values.country,
      
        pancardNo: values.pancardNo,
     
        status: UserStatusType.Active,
      },
      where: { id: values.id },
    });
    localStorage.setItem("status", "active");
    localStorage.setItem("name", `${values.firstName}`);
    // localStorage.setItem("username", `${values.firstName}`);
    let name = values.firstName;

    // welcomeMessage(name)
    Router.push("/dashboard");
    toast.success(`Welcome ${name}`);
  };

  const getIdProofPlaceholder = (idProofSelected) => {
    switch (idProofSelected) {
      case "aadhar":
        return "Enter your Aadhar Number";
      case "passport":
        return "Enter your Passport Number";
      case "drivingLicense":
        return "Enter your Driving License Number";
      default:
        return "Enter your Aadhar Number";
    }
  };

  const getIdProofLabel = (idProofSelected) => {
    switch (idProofSelected) {
      case "aadhar":
        return "Aadhar ";
      case "passport":
        return "Passport ";
      case "drivingLicense":
        return "Driving License ";
      default:
        return "Aadhar ";
    }
  };

  const documetSchema = Yup.object({
   
  });

  const handleSubmit = async (values) => {
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
        Router.push("/dashboard");
        toast.success(`Welcome ${name}`);
      }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
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
                city: data["user"]["city"]
                  ? data["user"]["city"]
                  : "Kochi-Kerala",
                state: data["user"]["state"] ? data["user"]["state"] : "Kerala",
                country: data["user"]["country"]
                  ? data["user"]["country"]
                  : "India",
                password: "",
                passwordConfirmation: "",
                mobile: data["user"]["mobile"],
                idProofType: "aadhar",
                idProofNo: data["user"]["idProofNo"],
                pancardNo: data["user"]["pancardNo"],
                pancard: null,
                idProof: null,
                idProofBack: null,
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(props) => (
                <Form>
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
                          name="lastName"
                          required
                          label="Last Name"
                          width="w-full"
                          placeholder="Last Name"
                        />
                      </div>

                      <div className="col-span-6  sm:col-span-3">
                        <FormField
                          field="input"
                          required
                          name="email"
                          label="Email Address"
                          width="w-full"
                          placeholder="Please enter email address here"
                          custom
                          onBlur={(e) => {
                            setEmailCheckData(e.target.value);
                            setEmailEnabled(e.target.value != "");
                          }}
                        />
                      </div>

                      <div className="col-span-6  sm:col-span-3">
                        <FormField
                          field="input"
                          required
                          disabled
                          name="mobile"
                          label="Mobile Number"
                          width="w-full"
                          className="bg-gray-50 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        
                        <FormField
                          field="select"
                          required
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
                          onChange={async (e) => {
                            const { value } = e.target;
                            props.setFieldValue("state", value);
                            setSelectedState(value);
                          }}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <FormField
                          field="select"
                          required
                          name="city"
                          label="City"
                          width="w-full"
                          placeholder="City"
                          options={filteredCities}
                          onChange={async (e) => {
                            const { value } = e.target;
                            props.setFieldValue("city", value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="my-8 flex justify-center">
                      <ButtonLoading
                        // loading={callUpdateUserMutation.isLoading ? 1 : 0}
                        type="submit"
                        color="indigo"
                      >
                        Update Details
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
              onSubmit={handleSubmit}
              validationSchema={documetSchema}
            >
              {({ values, setFieldValue }) => (
                <Form className="mx-auto ">
                  <div className="space-y-3 mt-4 pb-4">
                    <div className="mt-6 ">
                      <div className="space-y-1 mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Documents Details
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
