{showDocumentForm && (
    <></>
    // <Formik
    //   initialValues={{
    //     documentType: "",
    //     pancard_image: null,
    //     aadharcard_front_image: null,
    //     aadharcard_back_image: null,
    //     driving_license_front_image: null,
    //     driving_license_back_image: null,
    //   }}
    //   onSubmit={handleSubmit}
    //   validationSchema={documetSchema}
    // >
    //   {({ values, setFieldValue }) => (
    //     <Form className="max-w-4xl mx-auto p-10 bg-white rounded-lg shadow-lg border border-gray-200">
    //       <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
    //         {/* Document Type */}

    //         {/* Pan Card Field */}
    //         <div className="col-span-1">
    //           <label
    //             htmlFor="pancard_image"
    //             className="block text-lg font-medium text-gray-700 mb-2"
    //           >
    //             Pan Card
    //           </label>
    //           <Field name="pancard_image">
    //             {({ field }) => (
    //               <input
    //                 type="file"
    //                 id="pancard_image"
    //                 className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //                 onChange={async (e) => {
    //                   const file = e.target.files[0];
    //                   const image = await ResizeImage(file);

    //                   setFieldValue("pancard_image", image);
    //                   setImagePreviews((prev) => ({
    //                     ...prev,
    //                     pancard_image: file
    //                       ? URL.createObjectURL(file)
    //                       : null,
    //                   }));
    //                 }}
    //               />
    //             )}
    //           </Field>
    //           <div className="mt-2">
    //             {imagePreviews.pancard_image && (
    //               <Image
    //                 src={imagePreviews.pancard_image}
    //                 alt="Pan Card Preview"
    //                 width={250}
    //                 height={128}
    //                 className="mt-2 object-cover"
    //               />
    //             )}
    //           </div>
    //           <ErrorMessage
    //             name="pancard_image"
    //             component="div"
    //             className="text-red-500 text-sm mt-1"
    //           />
    //         </div>

    //         {/* Aadhar Form Fields */}
    //         <div className="col-span-1">
    //           <label
    //             htmlFor="aadharcard_front_image"
    //             className="block text-lg font-medium text-gray-700 mb-2"
    //           >
    //             Aadhar Front
    //           </label>
    //           <Field name="aadharcard_front_image">
    //             {({ field }) => (
    //               <input
    //                 type="file"
    //                 id="aadharcard_front_image"
    //                 className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //                 onChange={async (e) => {
    //                   const file = e.target.files[0];
    //                   const image = await ResizeImage(file);

    //                   setFieldValue("aadharcard_front_image", image);
    //                   setImagePreviews((prev) => ({
    //                     ...prev,
    //                     aadharcard_front_image: file
    //                       ? URL.createObjectURL(file)
    //                       : null,
    //                   }));
    //                 }}
    //               />
    //             )}
    //           </Field>
    //           <div className="mt-2">
    //             {imagePreviews.aadharcard_front_image && (
    //               <Image
    //                 src={imagePreviews.aadharcard_front_image}
    //                 alt="Aadhar Front Preview"
    //                 width={250}
    //                 height={128}
    //                 className="mt-2 object-cover"
    //               />
    //             )}
    //           </div>
    //           <ErrorMessage
    //             name="aadharcard_front_image"
    //             component="div"
    //             className="text-red-500 text-sm mt-1"
    //           />
    //         </div>

    //         <div className="col-span-1">
    //           <label
    //             htmlFor="aadharcard_back_image"
    //             className="block text-lg font-medium text-gray-700 mb-2"
    //           >
    //             Aadhar Back
    //           </label>
    //           <Field name="aadharcard_back_image">
    //             {({ field }) => (
    //               <input
    //                 type="file"
    //                 id="aadharcard_back_image"
    //                 className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //                 onChange={async (e) => {
    //                   const file = e.target.files[0];
    //                   const image = await ResizeImage(file);

    //                   setFieldValue("aadharcard_back_image", image);
    //                   setImagePreviews((prev) => ({
    //                     ...prev,
    //                     aadharcard_back_image: file
    //                       ? URL.createObjectURL(file)
    //                       : null,
    //                   }));
    //                 }}
    //               />
    //             )}
    //           </Field>
    //           <div className="mt-2">
    //             {imagePreviews.aadharcard_back_image && (
    //               <Image
    //                 src={imagePreviews.aadharcard_back_image}
    //                 alt="Aadhar Back Preview"
    //                 width={250}
    //                 height={128}
    //                 className="mt-2 object-cover"
    //               />
    //             )}
    //           </div>
    //           <ErrorMessage
    //             name="aadharcard_back_image"
    //             component="div"
    //             className="text-red-500 text-sm mt-1"
    //           />
    //         </div>

    //         {/* Driving License Form Fields */}
    //         <div className="col-span-1">
    //           <label
    //             htmlFor="driving_license_front_image"
    //             className="block text-lg font-medium text-gray-700 mb-2"
    //           >
    //             Driving License Front
    //           </label>
    //           <Field name="driving_license_front_image">
    //             {({ field }) => (
    //               <input
    //                 type="file"
    //                 id="driving_license_front_image"
    //                 className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //                 onChange={async (e) => {
    //                   const file = e.target.files[0];
    //                   const image = await ResizeImage(file);

    //                   setFieldValue("driving_license_front_image", image);
    //                   setImagePreviews((prev) => ({
    //                     ...prev,
    //                     driving_license_front_image: file
    //                       ? URL.createObjectURL(file)
    //                       : null,
    //                   }));
    //                 }}
    //               />
    //             )}
    //           </Field>
    //           <div className="mt-2">
    //             {imagePreviews.driving_license_front_image && (
    //               <Image
    //                 src={imagePreviews.driving_license_front_image}
    //                 alt="Driving License Front Preview"
    //                 width={250}
    //                 height={128}
    //                 className="mt-2 object-cover"
    //               />
    //             )}
    //           </div>
    //           <ErrorMessage
    //             name="driving_license_front_image"
    //             component="div"
    //             className="text-red-500 text-sm mt-1"
    //           />
    //         </div>

    //         <div className="col-span-1">
    //           <label
    //             htmlFor="driving_license_back_image"
    //             className="block text-lg font-medium text-gray-700 mb-2"
    //           >
    //             Driving License Back
    //           </label>
    //           <Field name="driving_license_back_image">
    //             {({ field }) => (
    //               <input
    //                 type="file"
    //                 id="driving_license_back_image"
    //                 className="w-64 border border-gray-300 rounded-lg shadow-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //                 onChange={async (e) => {
    //                   const file = e.target.files[0];
    //                   const image = await ResizeImage(file);

    //                   setFieldValue("driving_license_back_image", image);
    //                   setImagePreviews((prev) => ({
    //                     ...prev,
    //                     driving_license_back_image: file
    //                       ? URL.createObjectURL(file)
    //                       : null,
    //                   }));
    //                 }}
    //               />
    //             )}
    //           </Field>
    //           <div className="mt-2">
    //             {imagePreviews.driving_license_back_image && (
    //               <Image
    //                 src={imagePreviews.driving_license_back_image}
    //                 alt="Driving License Back Preview"
    //                 width={250}
    //                 height={128}
    //                 className="mt-2 object-cover"
    //               />
    //             )}
    //           </div>
    //           <ErrorMessage
    //             name="driving_license_back_image"
    //             component="div"
    //             className="text-red-500 text-sm mt-1"
    //           />
    //         </div>
    //       </div>

    //       <button
    //         type="submit"
    //         className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       >
    //         Submit
    //       </button>
    //     </Form>
    //   )}
    // </Formik>
  )}
