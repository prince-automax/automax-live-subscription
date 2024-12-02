import * as Yup from "yup";
import Image from "next/image";
import { Formik, Form, ErrorMessage, Field } from "formik";
import FormField from "../components/ui/FormField";
import ButtonLoading from "../components/ui/ButtonLoading";
import {
  useGetUserQuery,
  GetUserQueryVariables,
  GetUserQuery,
  UserRoleType,
  UserStatusType,
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
import {
  useUpdateUserMutation,
  UpdateUserMutationVariables,
} from "@utils/graphql";
import Swal from "sweetalert2";
import { GetErrorMessage, ToastMessage } from "@utils/ErrorCodes";

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
  const [documentType, setDocumentType] = useState("");
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [currentSection, setCurrentSection] = useState(1);

  const [imagePreviews, setImagePreviews] = useState({
    pancard_image: null,
    aadharcard_front_image: null,
    aadharcard_back_image: null,
    driving_license_front_image: null,
    driving_license_back_image: null,
  });

  useEffect(() => {
    if (selectedState != null && selectedState != "") {
      // filter cities and fill in cities object
      // setFilteredCities([]);
      const filteredC = cities.filter((c) => c.state === selectedState);

      setFilteredCities(
        filteredC.map((city, index) => {
          return {
            label: city.city,
            value: city.city,
          };
        })
      );
    }
  }, [selectedState]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      // Retrieve the value from localStorage
      const loggedInStatus = JSON.parse(localStorage.getItem("isVerified"));

      // If a value exists in localStorage, update the state
      // if (loggedInStatus !== null) {
      //   setShowDocumentForm(loggedInStatus);
      // }

      setUserId(id);
      setAccessToken(token);
    }
  }, []);

  const { data, isLoading: isLoadingGetUser } = useGetUserQuery<GetUserQuery>(
    graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    { where: { id } }
    // {
    //   enabled: accessToken !== "",
    // }
  );

  useEffect(() => {
    if (data && data["user"]) {
      // console.log("userData", data["user"]["firstName"]);
      setSelectedState(data["user"]["state"]);
    } else {
      // console.log("Loading or no user data available yet.");
    }
  }, [data?.["user"]?.["state"]]);

  // console.log("data from user", data);

  const callUpdateUserMutation =
    useUpdateUserMutation<UpdateUserMutationVariables>(
      graphQLClient({ Authorization: `Bearer ${accessToken}` })
    );

  // console.log(process.env.API_URL, "147147147");

  if (isLoadingGetUser) {
    return <Loader />;
  }

  // const validationSchema = Yup.object({
  //   id: Yup.string().required(),
  //   firstName: Yup.string().required("First name is required"),
  //   lastName: Yup.string().required("Last name is required"),
  //   email: Yup.string().email("Invalid email address"),
  //   password: Yup.string()
  //     .required("Password is required")
  //     .matches(/^(?=.{6,})/, "Password must contain at least 6 characters"),
  //   passwordConfirmation: Yup.string()
  //     .required("Confirm password is required")
  //     .oneOf([Yup.ref("password"), null], "Passwords do not match"),
  //   pancardNo: Yup.string()
  //     .required("Pan Card number is required")
  //     .max(10, "Invalid Pan Card number")
  //     .min(10, "Invalid Pan Card number"),
  //   mobile: Yup.string()
  //     .matches(/^[0-9]{10}$/, "Mobile number must be only 10 digits long")
  //     .required("Mobile number is required"),
  //   state: Yup.string()
  //     .required("State is required")
  //     .notOneOf(["Please Select State", ""], "Please select a valid State"),

  //   idProofNo: Yup.string()
  //     // .required("Aadhar number is required")
  //     .matches(/^\d+$/, "Aadhar number must contain only digits") // Ensure only digits
  //     .length(12, "Aadhar number must be exactly 12 digits long"), // Validate exact length
  //   pancard_image: Yup.mixed()
  //     .required("Pancard Image is required")
  //     .test(
  //       "fileFormat",
  //       "Unsupported Format. Please upload a file with one of the following formats: " +
  //         SUPPORTED_FORMATS.join(", "),
  //       (value) => value && SUPPORTED_FORMATS.includes(value.type)
  //     ),
  // });

  // const onSubmit = async (values) => {
  //   console.log("values", values);

  //   // try {
  //   //   // console.log("touched here", values);

  //   //   const result = await callUpdateUserMutation.mutateAsync({
  //   //     data: {
  //   //       firstName: values.firstName,
  //   //       lastName: values.lastName,
  //   //       email: values.email,
  //   //       city: values.city,
  //   //       state: values.state,
  //   //       country: "India",

  //   //       idProofType: values.idProofType || "Aadhar",
  //   //       password: values.password,
  //   //       pancardNo: values.pancardNo,
  //   //       idProofNo: values.idProofNo.toString(),

  //   //       // role: UserRoleType?.Dealer,
  //   //       status: UserStatusType?.Active,
  //   //     },
  //   //     where: { id: values.id },
  //   //   });

  //   //   // console.log("result", result);
  //   //   // Save
  //   //   // localStorage.setItem("isVerified", JSON.stringify(true));

  //   //   // // Retrieve
  //   //   // const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  //   //   // console.log(isLoggedIn); // Output: false

  //   //   // setShowDocumentForm(true);
  //   //   // Handle successful response
  //   //   // localStorage.setItem("isVerified", true);
  //   //   // localStorage.setItem("name", `${values.firstName}`);
  //   //   // let name = values.firstName;
  //   //   // Router.push("/dashboard");
  //   //   // toast.success(`Welcome ${name}`);
  //   // } catch (error) {
  //   //   console.error("Error during mutation:", error);

  //   //   // Display any error message returned from the backend
  //   //   const errorMessage =
  //   //     error?.response?.errors?.[0]?.message ||
  //   //     "An error occurred while processing your request.";
  //   //   toast.error(errorMessage);
  //   // }
  // };

  // const handleSubmit = (values) => {
  //   console.log('values', values);

  //   const formData = new FormData();

  //   // Append non-file fields
  //   formData.append("documentType", values.documentType);

  //   // Append file fields if they exist
  //   if (values.pancard_image) {
  //     formData.append("pancard_image", values.pancard_image);
  //   }
  //   if (values.aadharcard_front_image) {
  //     formData.append("aadharcard_front_image", values.aadharcard_front_image);
  //   }
  //   if (values.aadharcard_back_image) {
  //     formData.append("aadharcard_back_image", values.aadharcard_back_image);
  //   }
  //   if (values.driving_license_front_image) {
  //     formData.append("driving_license_front_image", values.driving_license_front_image);
  //   }
  //   if (values.driving_license_back_image) {
  //     formData.append("driving_license_back_image", values.driving_license_back_image);
  //   }

  //   // Assuming you have a userId variable defined in your scope
  //   // const userId = 'yourUserId'; // Replace with the actual userId you want to use
  //   const apiUrl = `${process.env.API_URL}/api/v1/fileupload/userprofile/${userId}`;

  //   // Make an API request to submit the form data
  //   fetch(apiUrl, {
  //     method: 'PUT',
  //     body: formData, // Send the FormData
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // };

  // const handleSubmit = async (values) => {
  //   // console.log("values", values);

  //   const formData = new FormData();

  //   // Append non-file fields
  //   formData.append("documentType", values.documentType);

  //   // Append file fields if they exist
  //   if (values.pancard_image) {
  //     formData.append("pancard_image", values.pancard_image);
  //   }
  //   if (values.aadharcard_front_image) {
  //     formData.append("aadharcard_front_image", values.aadharcard_front_image);
  //   }
  //   if (values.aadharcard_back_image) {
  //     formData.append("aadharcard_back_image", values.aadharcard_back_image);
  //   }
  //   if (values.driving_license_front_image) {
  //     formData.append(
  //       "driving_license_front_image",
  //       values.driving_license_front_image
  //     );
  //   }
  //   if (values.driving_license_back_image) {
  //     formData.append(
  //       "driving_license_back_image",
  //       values.driving_license_back_image
  //     );
  //   }

  //   const apiUrl = `https://api-dev.autobse.com/api/v1/fileupload/userprofile/${userId}`;

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "PUT",
  //       body: formData,
  //       headers: {
  //         "x-apollo-operation-name": "uploadUserProfile", // Include this header
  //         // Other headers can go  here
  //       },
  //     });

  //     // console.log("result", response);

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     if (data.success) {
  //       // Handle successful response
  //       localStorage.setItem("status", "active");
  //       localStorage.setItem("name", `${data?.res.firstName}`);
  //       let name = data?.res.firstName;
  //       Router.push("/dashboard");
  //       toast.success(`Welcome ${name}`);
  //     }
  //     console.log("Success:", data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const validationSchema = Yup.object({
    firstName: Yup.string().when("currentSection", {
      is: 1, // When section 1 is active
      then: Yup.string().required("First Name is required"),
      otherwise: Yup.string().notRequired(),
    }),
    lastName: Yup.string().when("currentSection", {
      is: 1,
      then: Yup.string().required("Last Name is required"),
      otherwise: Yup.string().notRequired(),
    }),
    email: Yup.string().when("currentSection", {
      is: 1,
      then: Yup.string().email("Invalid Email Address"),
      otherwise: Yup.string().notRequired(),
    }),
    password: Yup.string().when("currentSection", {
      is: 1,
      then: Yup.string()
        .required("Password is required")
        .matches(/^(?=.{6,})/, "Password must contain at least 6 characters"),
      otherwise: Yup.string().notRequired(),
    }),
    passwordConfirmation: Yup.string().when("currentSection", {
      is: 1,
      then: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords do not match"),
      otherwise: Yup.string().notRequired(),
    }),
    pancardNo: Yup.string().when("currentSection", {
      is: 1,
      then: Yup.string()
        .required("Pan Card number is required")
        .max(10, "Invalid Pan Card number")
        .min(10, "Invalid Pan Card number"),
      otherwise: Yup.string().notRequired(),
    }),
    mobile: Yup.string().when("currentSection", {
      is: 1,
      then: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be only 10 digits long")
        .required("Mobile number is required"),
      otherwise: Yup.string().notRequired(),
    }),
    state: Yup.string().when("currentSection", {
      is: 1,
      then: Yup.string()
        .required("State is required")
        .notOneOf(["Please Select State", ""], "Please select a valid State"),
      otherwise: Yup.string().notRequired(),
    }),
    idProofNo: Yup.string().when("currentSection", {
      is: 1,
      then: Yup.string()
        .matches(/^\d+$/, "Aadhar Card Number must contain only digits")
        .length(12, "Aadhar Card Number must be exactly 12 digits long"),
      otherwise: Yup.string().notRequired(),
    }),
    pancard_image: Yup.mixed().when("currentSection", {
      is: 2,
      then: Yup.mixed()
        .required("Pan Card image is required")
        .test("fileType", "Only JPG and JPEG formats are allowed", (value) => {
          if (value) {
            // Check MIME type for image
            const validTypes = ["image/jpeg", "image/jpg"];
            return validTypes.includes(value.type);
          }
          return true; // If no file selected, it's valid (it'll be caught by required)
        }),

    }),

    aadharcard_front_image: Yup.mixed().when("currentSection", {
      is: 2,
      then: Yup.mixed().test(
        "fileType",
        "Only JPG and JPEG formats are allowed",
        (value) => {
          if (value) {
            // Check MIME type for image
            const validTypes = ["image/jpeg", "image/jpg"];
            return validTypes.includes(value.type);
          }
          return true; // If no file selected, it's valid (it'll be caught by required)
        }
      ),
   
    }),
    aadharcard_back_image: Yup.mixed().when("currentSection", {
      is: 2,
      then: Yup.mixed().test(
        "fileType",
        "Only JPG and JPEG formats are allowed",
        (value) => {
          if (value) {
            // Check MIME type for image
            const validTypes = ["image/jpeg", "image/jpg"];
            return validTypes.includes(value.type);
          }
          return true; // If no file selected, it's valid (it'll be caught by required)
        }
      ),
      // .otherwise: Yup.mixed().notRequired(),
    }),
    driving_license_front_image: Yup.mixed().when("currentSection", {
      is: 2,
      then: Yup.mixed().test(
        "fileType",
        "Only JPG and JPEG formats are allowed",
        (value) => {
          if (value) {
            // Check MIME type for image
            const validTypes = ["image/jpeg", "image/jpg"];
            return validTypes.includes(value.type);
          }
          return true; // If no file selected, it's valid (it'll be caught by required)
        }
      ),
      // .otherwise: Yup.mixed().notRequired(),
    }),
    driving_license_back_image: Yup.mixed().when("currentSection", {
      is: 2,
      then: Yup.mixed().test(
        "fileType",
        "Only JPG and JPEG formats are allowed",
        (value) => {
          if (value) {
            // Check MIME type for image
            const validTypes = ["image/jpeg", "image/jpg"];
            return validTypes.includes(value.type);
          }
          return true; // If no file selected, it's valid (it'll be caught by required)
        }
      ),
      // .otherwise: Yup.mixed().notRequired(),
    }),
  });

  const handleCombinedSubmit = async (values) => {
    console.log("logged",values);

    const formData = new FormData();

    // Append non-file fields
    formData.append("documentType", values.documentType);

    // Append file fields if they exist
    if (values.pancard_image) {
      formData.append("pancard_image",values.pancard_image);
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

    const apiUrl = `https://api-dev.autobse.com/api/v1/fileupload/userprofile/${userId}`;

    try {
      // Step 1: Upload Image(s) via REST API
      const response = await fetch(apiUrl, {
        method: "PUT",
        body: formData,
        headers: {
          "x-apollo-operation-name": "uploadUserProfile", // Additional headers if needed
        },
      });
      console.log("response of image upload", response);

      if (!response.ok) {
        throw new Error(`Image upload failed with status: ${response.status}`);
      }


      const imageUploadData = await response.json();

      console.log("imageUploadData", imageUploadData);

      if (imageUploadData.success) {
        console.log("Image upload successful:", imageUploadData);

        // Step 2: Call GraphQL API to Update User Data
        const result = await callUpdateUserMutation.mutateAsync({
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            city: values.city,
            state: values.state,
            country: "India",
            idProofType: values.idProofType || "Aadhar",
            password: values.password,
            pancardNo: values.pancardNo,
            idProofNo: values.idProofNo.toString(),
            status: UserStatusType?.Active,
          },
          where: { id: values.id },
        });

        console.log('result',result);
        
        // Handle successful response from GraphQL API
        localStorage.setItem("status", "active");
        localStorage.setItem("name", `${result?.updateUser?.firstName}`);
        Router.push("/dashboard");
        toast.success(`Welcome ${result?.updateUser?.firstName}`);
      } 
      else {
        throw new Error("Image upload failed: " + imageUploadData.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response &&
        error.response.errors?.[0]?.errorCode
      ) {
        const errorCode =  error.response.errors?.[0]?.errorCode;
        console.log('ERROR CODE ', errorCode);
        
        const userFriendlyMessage = GetErrorMessage(errorCode);
        ToastMessage(userFriendlyMessage) 
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const documetSchema = Yup.object({
    pancard_image: Yup.mixed()
      .required("Pancard Image is required")
      .test(
        "fileFormat",
        "Unsupported Format. Please upload a file with one of the following formats: " +
          SUPPORTED_FORMATS.join(", "),
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const handleNext = async (
    values,
    { validateForm, setTouched, touched, validateField, setFieldValue }
  ) => {
    if (currentSection === 1) {
      // Fields to validate in Section 1
      // const section1Fields = ['email', 'password', 'firstName', 'lastName', 'mobile', 'state', 'idProofNo', 'pancardNo']; // Add only the fields of Section 1

      // Validate only the fields in Section 1
      const errors = await validateForm(values);
      console.log(errors);

      // Check if validation failed in Section 1
      if (Object.keys(errors).length > 0) {
        // If there are errors, mark the corresponding fields as touched
        const touchedFields = Object.keys(errors).reduce((acc, key) => {
          acc[key] = true; // Mark all fields with errors as touched
          return acc;
        }, {});

        setTouched(touchedFields); // Set touched fields dynamically
        return; // Don't proceed to next section if there are errors in Section 1
      }

      // If validation is successful, move to the next section
      setCurrentSection(2);
      setShowDocumentForm(true);
      // Show document section
      // setTouched({
      //   ...touched, // Preserve touched state of other fields
      //   pancard_image: true, // Mark pancard_image as touched
      // });

      // // Trigger validation for the specific field (pancard_image)
      // const fieldErrors = await validateForm(values);
      // console.log("Field-specific validation errors:", fieldErrors);

      // // If there are errors for pancard_image, ensure they're displayed
      // if (fieldErrors.pancard_image) {
      //   console.log("Pancard Image Error:", fieldErrors.pancard_image);
      // }
      setCurrentSection(2);
      setFieldValue("currentSection", 2); // Set the current section value for validation

      // Manually trigger validation for 'pancard_image' in Section 2
      await validateField("pancard_image"); // Validate pancard_image field

      setShowDocumentForm(true); // Show document s // Validate pancard_image only
    }
  };

  console.log("currentsection", currentSection);

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="space-y-8">
        <div className="py-8 bg-gray-100 rounded px-4 sm:px-6 flex items-center justify-between">
          <h2 className="text-xl leading-6 font-medium text-gray-900">
            Please update your profile
          </h2>
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
        </div>

        <Formik
          initialValues={{
            id: data?.["user"]?.["id"],
            firstName: data?.["user"]?.["firstName"],
            lastName: data?.["user"]?.["lastName"],
            email: data?.["user"]?.["email"],
            // city: data?.["user"]?.["city"] ? data["user"]?.["city"] : "",
            state: data?.["user"]?.["state"] ? data?.["user"]?.["state"] : "",
            country: data?.["user"]?.["country"]
              ? data?.["user"]?.["country"]
              : "India",
            password: "",
            passwordConfirmation: "",
            mobile: data?.["user"]?.["mobile"],
            idProofType: "Aadhar",
            idProofNo: data?.["user"]?.["idProofNo"],
            pancardNo: data?.["user"]?.["pancardNo"],
            documentType: "",
            pancard_image: null,
            aadharcard_front_image: null,
            aadharcard_back_image: null,
            driving_license_front_image: null,
            driving_license_back_image: null,
            currentSection,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleCombinedSubmit(values);

            // }
          }}
        >
          {({
            values,
            setFieldValue,
            isValid,
            dirty,
            handleChange,
            handleBlur,
            errors,
            touched,
            validateForm,
            setTouched,
            validateField,
            setFieldError,
          }) => (
            <Form>
              <div className="space-y-3 mt-4 pb-4">
                {currentSection === 1 && (
                  <>
                    <div className="mt-6 grid grid-cols-6 gap-6">
                      <div className="space-y-1 col-span-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Basic Details
                        </h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                          Please update your basic details.
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
                            setFieldValue("firstName", value);
                          }}
                          value={values.firstName}
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
                            setFieldValue("lastName", value);
                          }}
                          value={values.lastName}
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
                          placeholder="Mobile Number"
                          disabled={true}
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
                          name="state"
                          label="State"
                          width="w-full"
                          disabled={true}
                          placeholder="Please Select State"
                          options={renderingStates}
                          onChange={async (e) => {
                            const { value } = e.target;
                            setFieldValue("state", value);
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
                        placeholder="Please Select City"
                        options={filteredCities}
                        onChange={async (e) => {
                          const { value } = e.target;
                          props.setFieldValue("city", value);
                        }}
                      />
                    </div> */}

                      <div className="space-y-1 col-span-6 border-t border-gray-200 pt-8">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Your ID Proof
                        </h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                          Please enter your ID Proof details.
                        </p>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <FormField
                          field="inputWithChange"
                          name="idProofNo"
                          label="Aadhar Card Number"
                          placeholder="Aadhar Card Number"
                          type="text"
                          width="w-full"
                          maxLength="12"
                          onChange={(e) => {
                            // Allow only numeric input by replacing non-numeric characters
                            const numericValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ); // Remove non-numeric characters
                            setFieldValue("idProofNo", numericValue); // Update form value with numeric-only input
                          }}
                          value={values.mobile}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <FormField
                          field="input"
                          disabled={true}
                          name="pancardNo"
                          label="Pan Card Number"
                          placeholder="Pan Card Number"
                          required
                          maxLength="10"
                          width="w-full"
                          onBlur={(e) => {
                            setPanCheckData(e.target.value);
                            setPanEnabled(e.target.value != "");
                          }}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3"></div>

                      <div className="space-y-1 col-span-6 border-t border-gray-200 pt-8">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Set Your Password
                        </h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                          Required to login to your account.
                        </p>
                      </div>

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
                            id="passwordConfirmation"
                            label="Confirm Password"
                            name="passwordConfirmation"
                            type="password"
                            placeholder="********"
                            width="w-full"
                            showTogglePasswordButton
                          />
                        </div>
                    </div>

                    {/* {!showDocumentForm && ( */}
                    <button
                      type="button"
                      className="text-white bg-indigo-600 hover:bg-indigo-700 border-transparent inline-flex items-center justify-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none"
                      onClick={() =>
                        handleNext(values, {
                          validateForm,
                          setTouched,
                          touched,
                          validateField,
                          setFieldValue,
                        })
                      }
                    >
                      Next
                    </button>
                  </>
                )}

                {showDocumentForm && currentSection === 2 && (
                  <div>
                    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Upload Documents{" "}
                        <span className="block text-gray-700 text-sm font-semibold">
                   <span className="text-red-500">*</span>       Only JPEG and JPG formats are supported.
                        </span>
                      </h2>
                      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-10">
                        {/* Pan Card Field */}
                        <div>
                          <label
                            htmlFor="pancard_image"
                            className="block text-lg font-medium text-gray-700 mb-2"
                          >
                            Pan Card <span className="text-red-500 text-xs">*</span>
                          </label>
                          <Field name="pancard_image">
                            {({ field }) => (
                              <input
                                type="file"
                                accept=".jpg,.jpeg"

                                id="pancard_image"
                                className="w-full border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={async (e) => {
                                  handleChange(e);
                                  const file = e.target.files[0];

                                  // Check if the file type is JPG or JPEG
                                  if (
                                    file &&
                                    (file.type === "image/jpeg" ||
                                      file.type === "image/jpg")
                                  ) {
                                    console.log('@@@@@@');
                                    
                                    try {
                                      const image = await ResizeImage(file);
                                      console.log('compressed image',image);
                                      
                                      setFieldValue("pancard_image", image);
                                      setImagePreviews((prev) => ({
                                        ...prev,
                                        pancard_image: file
                                          ? URL.createObjectURL(file)
                                          : null,
                                      }));
                                      // Clear any previous error message
                                      setFieldError("pancard_image", "");
                                    } catch (error) {
                                      console.error(
                                        "Error resizing image:",
                                        error
                                      );
                                      toast.error(error?.message);
                                      // Handle error (e.g., display a custom error message if needed)
                                    }
                                  } else {
                                    // Set error if file type is not supported
                                    setFieldError(
                                      "pancard_image",
                                      "Please upload a JPG or JPEG image."
                                    );
                                  }
                                }}
                              />
                            )}
                          </Field>
                          <div className="mt-4">
                            {imagePreviews.pancard_image && (
                              <Image
                                src={imagePreviews.pancard_image}
                                alt="Pan Card Preview"
                                width={250}
                                height={150}
                                className="rounded-lg shadow-md object-cover"
                              />
                            )}
                          </div>
                          <ErrorMessage
                            name="pancard_image"
                            component="div"
                            className="text-red-500 text-sm mt-2"
                          />
                        </div>

                        {/* Aadhar Front Field */}
                        <div>
                          <label
                            htmlFor="aadharcard_front_image"
                            className="block text-lg font-medium text-gray-700 mb-2"
                          >
                            Aadhar Card Front
                          </label>
                          <Field name="aadharcard_front_image">
                            {({ field }) => (
                              <input
                                type="file"
                                accept=".jpg,.jpeg" // Restrict file selection to jpg and jpeg

                                id="aadharcard_front_image"
                                className="w-full border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                // onChange={async (e) => {
                                //   const file = e.target.files[0];
                                //   const image = await ResizeImage(file);

                                //   setFieldValue(
                                //     "aadharcard_front_image",
                                //     image
                                //   );
                                //   setImagePreviews((prev) => ({
                                //     ...prev,
                                //     aadharcard_front_image: file
                                //       ? URL.createObjectURL(file)
                                //       : null,
                                //   }));
                                // }}
                                onChange={async (e) => {
                                  handleChange(e);
                                  const file = e.target.files[0];

                                  // Check if the file type is JPG or JPEG
                                  if (
                                    file &&
                                    (file.type === "image/jpeg" ||
                                      file.type === "image/jpg")
                                  ) {
                                    try {
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
                                      // Clear any previous error message
                                      setFieldError(
                                        "aadharcard_front_image",
                                        ""
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error resizing image:",
                                        error
                                      );
                                      toast.error(error?.message);
                                      // Handle error (e.g., display a custom error message if needed)
                                    }
                                  } else {
                                    // Set error if file type is not supported
                                    setFieldError(
                                      "aadharcard_front_image",
                                      "Please upload a JPG or JPEG image."
                                    );
                                  }
                                }}
                              />
                            )}
                          </Field>
                          <div className="mt-4">
                            {imagePreviews.aadharcard_front_image && (
                              <Image
                                src={imagePreviews.aadharcard_front_image}
                                alt="Aadhar Front Preview"
                                width={250}
                                height={150}
                                className="rounded-lg shadow-md object-cover"
                              />
                            )}
                          </div>
                          <ErrorMessage
                            name="aadharcard_front_image"
                            component="div"
                            className="text-red-500 text-sm mt-2"
                          />
                        </div>

                        {/* Aadhar Back Field */}
                        <div>
                          <label
                            htmlFor="aadharcard_back_image"
                            className="block text-lg font-medium text-gray-700 mb-2"
                          >
                            Aadhar Card Back
                          </label>
                          <Field name="aadharcard_back_image">
                            {({ field }) => (
                              <input
                                type="file"
                                accept=".jpg,.jpeg" // Restrict file selection to jpg and jpeg

                                id="aadharcard_back_image"
                                className="w-full border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={async (e) => {
                                  handleChange(e);
                                  const file = e.target.files[0];

                                  // Check if the file type is JPG or JPEG
                                  if (
                                    file &&
                                    (file.type === "image/jpeg" ||
                                      file.type === "image/jpg")
                                  ) {
                                    try {
                                      const image = await ResizeImage(file);
                                      setFieldValue(
                                        "aadharcard_back_image",
                                        image
                                      );
                                      setImagePreviews((prev) => ({
                                        ...prev,
                                        aadharcard_back_image: file
                                          ? URL.createObjectURL(file)
                                          : null,
                                      }));
                                      // Clear any previous error message
                                      setFieldError(
                                        "aadharcard_back_image",
                                        ""
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error resizing image:",
                                        error
                                      );
                                      toast.error(error?.message);
                                      // Handle error (e.g., display a custom error message if needed)
                                    }
                                  } else {
                                    // Set error if file type is not supported
                                    setFieldError(
                                      "aadharcard_back_image",
                                      "Please upload a JPG or JPEG image."
                                    );
                                  }
                                }}
                              />
                            )}
                          </Field>
                          <div className="mt-4">
                            {imagePreviews.aadharcard_back_image && (
                              <Image
                                src={imagePreviews.aadharcard_back_image}
                                alt="Aadhar Back Preview"
                                width={250}
                                height={150}
                                className="rounded-lg shadow-md object-cover"
                              />
                            )}
                          </div>
                          <ErrorMessage
                            name="aadharcard_back_image"
                            component="div"
                            className="text-red-500 text-sm mt-2"
                          />
                        </div>

                        {/* Driving License Front */}
                        <div>
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
                                accept=".jpg,.jpeg" // Restrict file selection to jpg and jpeg

                                id="driving_license_front_image"
                                className="w-full border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={async (e) => {
                                  handleChange(e);
                                  const file = e.target.files[0];

                                  // Check if the file type is JPG or JPEG
                                  if (
                                    file &&
                                    (file.type === "image/jpeg" ||
                                      file.type === "image/jpg")
                                  ) {
                                    try {
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
                                      // Clear any previous error message
                                      setFieldError(
                                        "driving_license_front_image",
                                        ""
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error resizing image:",
                                        error
                                      );
                                      toast.error(error?.message);
                                      // Handle error (e.g., display a custom error message if needed)
                                    }
                                  } else {
                                    // Set error if file type is not supported
                                    setFieldError(
                                      "driving_license_front_image",
                                      "Please upload a JPG or JPEG image."
                                    );
                                  }
                                }}
                              />
                            )}
                          </Field>
                          <div className="mt-4">
                            {imagePreviews.driving_license_front_image && (
                              <Image
                                src={imagePreviews.driving_license_front_image}
                                alt="Driving License Front Preview"
                                width={250}
                                height={150}
                                className="rounded-lg shadow-md object-cover"
                              />
                            )}
                          </div>
                          <ErrorMessage
                            name="driving_license_front_image"
                            component="div"
                            className="text-red-500 text-sm mt-2"
                          />
                        </div>

                        {/* Driving License Back */}
                        <div>
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
                                accept=".jpg,.jpeg" // Restrict file selection to jpg and jpeg
                                id="driving_license_back_image"
                                className="w-full border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={async (e) => {
                                  handleChange(e);
                                  const file = e.target.files[0];

                                  // Check if the file type is JPG or JPEG
                                  if (
                                    file &&
                                    (file.type === "image/jpeg" ||
                                      file.type === "image/jpg")
                                  ) {
                                    try {
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
                                      // Clear any previous error message
                                      setFieldError(
                                        "driving_license_back_image",
                                        ""
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error resizing image:",
                                        error
                                      );
                                      toast.error(error?.message);
                                      // Handle error (e.g., display a custom error message if needed)
                                    }
                                  } else {
                                    // Set error if file type is not supported
                                    setFieldError(
                                      "driving_license_back_image",
                                      "Please upload a JPG or JPEG image."
                                    );
                                  }
                                }}
                              />
                            )}
                          </Field>
                          <div className="mt-4">
                            {imagePreviews.driving_license_back_image && (
                              <Image
                                src={imagePreviews.driving_license_back_image}
                                alt="Driving License Back Preview"
                                width={250}
                                height={150}
                                className="rounded-lg shadow-md object-cover"
                              />
                            )}
                          </div>
                          <ErrorMessage
                            name="driving_license_back_image"
                            component="div"
                            className="text-red-500 text-sm mt-2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="my-8 ml-1 flex justify-center">
                      <ButtonLoading
                        loading={callUpdateUserMutation.isLoading ? 1 : 0}
                        type="submit"
                        color="indigo"
                      >
                        Submit{" "}
                      </ButtonLoading>
                    </div>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* // )} */}
    </div>
  );
}

export default withPrivateRoute(ProfileUpdate);
