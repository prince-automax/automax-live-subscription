import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import {
  CreatePaymentMutationVariables,
  PaymentStatusType,
  useCreatePaymentMutation,
} from "@utils/graphql";
import graphQLClient from "@utils/useGQLQuery";
import ButtonLoading from "@components/ui/ButtonLoading";
import toast from "react-hot-toast";
import FormField from "@components/ui/FormField";
import { ResizeImage } from "../image-Resizing/imagePayment";
import Loader from "@components/ui/Loader";

export default function PaymentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to manage button disabled state


  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const paymentOptions = [
    {
      label: "Registration Pay",
      value: "registrations",
    },
    {
      label: "EMD Payment",
      value: "emd",
    },
    // {
    //   label: "Open Bid Payment",
    //   value: "openBids",
    // },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setAccessToken(token);
    }
  }, []);

  const callPaymentCreate =
    useCreatePaymentMutation<CreatePaymentMutationVariables>(
      graphQLClient({ Authorization: `Bearer ${accessToken}` })
    );

  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .max(2147483647, "Amount must not exceed 1 Crore "),
    paymentFor: Yup.string().required("Payment for is required"),
    proof: Yup.string().required("Image is required"),
    description: Yup.string()
      .max(255, "Description must not exceed 255 characters")
      .required("Description is required"),
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true); // Indicate that the form is submitting

    setIsLoading(true);
    console.log("Submitting payment details:", values);
    if (values?.paymentFor == "Select Payment") {
      toast.error("Select an Option");
      setSubmitting(false); // Reset submitting state

    }

    try {
      // Step 1: Call GraphQL API to create payment
      const response = await callPaymentCreate.mutateAsync({
        createPaymentInput: {
          amount: parseInt(values.amount),
          paymentFor: values.paymentFor,
          description: values.description,
          status: PaymentStatusType.Pending,
        },
      });

      console.log("response frm details", response);
      const paymentId = response?.createPayment?.id;

      // Step 2: If GraphQL API is successful, proceed to call the REST API for image upload
      if (paymentId && values?.proof !== "") {
        // console.log("GraphQL API successful, uploading image...");
        console.log("GOT HIT");

        // Call REST API to upload the image (proof)
        const formData = new FormData();
        formData.append("image", values.proof);
        const apiUrl = `https://api-dev.autobse.com/api/v1/fileupload/paymentImg/${paymentId}`;

        const uploadResponse = await fetch(apiUrl, {
          method: "PUT",
          body: formData,
          headers: {
            "x-apollo-operation-name": "uploadUserProfile", // Include this header
            // Other headers can go here
          },
        });

        console.log("upload response of image", uploadResponse);

        if (uploadResponse.ok) {
          toast.success("Payment  successfully.");
          resetForm({ proof: "" });
          // setIsLoading(false)
        } else {
          throw new Error("Image upload failed");
        }
      }
    } catch (error) {
      const errorMessage =
        error?.response?.errors?.[0]?.message || error.message;
      toast.error(
        errorMessage || "Request was not submitted. Please try again."
      );
    } finally {
      setIsLoading(false); // Reset loading state
      setSubmitting(false); // Indicate that the form is no longer submitting
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Formik
      initialValues={{
        amount: "",
        paymentFor: "",
        proof: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
      }}
    >
      {(props) => (
        <Form>
          <div className="max-w-lg my-8 space-y-4">
            <div className="font-semibold">Payment Request</div>
            <div>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">Rs.</span>
                </div>
                <FormField
                  field="inputWithChange"
                  required
                  name="amount"
                  label="Amount"
                  width="w-full"
                  placeholder="Amount"
                  onChange={(e) => {
                    props.setFieldValue(
                      "amount",
                      e.target.value.replace(/\D/g, "")
                    );
                  }}
                />
              </div>
            </div>
            <div>
              <FormField
                field="select"
                name="paymentFor"
                label="Payment For"
                placeholder="Select Payment"
                required
                width="w-full"
                options={paymentOptions}
                onChange={(e) => {
                  const { value } = e.target;
                  props.setFieldValue("paymentFor", value);
                }}
              />
            </div>

            <div>
              <div className="flex justify-between">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Add your Description
              </label>
              <span id="message" className="text-sm text-gray-500">
              Max. 255 characters
              </span>
              </div>
              <div className="mt-1  text-end">
                <textarea
                  rows={4}
                  name="description"
                  placeholder="Eg: For Registration"
                  id="description"
                  className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md text-left placeholder:text-left "
                  value={props.values.description}
                  onChange={(event) => {
                    props.setFieldValue("description", event.target.value);
                  }}
                  // maxLength={255} // Add maxLength attribute to limit characters
                />
              </div>

              <div className="mt-2 text-xs text-red-600">
                <ErrorMessage name="description" />
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Upload image <span className="text-red-500 text-xs">*</span>
                <span className="text-blue-600">(Payment Receipt)</span>
              </label>
              <input
                onChange={async (event) => {
                  try {
                    const file = event.target.files[0];

                    const image = await ResizeImage(file);

                    props.setFieldValue("proof", image);
                  } catch (err) {
                    // console.log("error", err);
                  }
                }}
                name="proof"
                id="proof"
                type="file"
                className="text-sm text-grey-500
                        file:mr-5 file:py-2 file:px-6
                        file:rounded-md file:border-0
                        file:text-sm file:font-medium
                        file:bg-blue-50 file:text-blue-700
                        hover:file:cursor-pointer hover:file:bg-amber-50
                        hover:file:text-amber-700
                        block w-full border border-gray-300 rounded-md
                        "
              />
              <div className="mt-2 text-xs text-red-600">
                <ErrorMessage name="proof" />
              </div>
            </div>

            <ButtonLoading
              // loading={callPaymentCreate.isLoading ? 1 : 0}
              disabled={props?.isSubmitting }
              type="submit"
              color="indigo"
            >
            
              {props?.isSubmitting || isButtonDisabled ? 'Submitting...' : 'Submit'}  

            </ButtonLoading>
          </div>
        </Form>
      )}
    </Formik>
  );
}
