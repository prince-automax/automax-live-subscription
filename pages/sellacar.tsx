// import React from "react";
// import * as Yup from "yup";

// import Image from "next/image";
// import bck from "../public/assets/Sell a car/bck2.jpg";
// import { useState, useRef, useEffect } from "react";
// import {
//   fuel,
//   mileageRanges,
//   registrationStateAndCode,
//   truckBody,
//   vehicleCondition,
//   vehicleLocation,
// } from "../utils/sellacar/sellACarData";
// import {
//   RegistrationNumber,
//   BodyComponent,
//   SearchBrandComponent,
//   ModelComponent,
//   RegistrationStateComponent,
//   ImageInterior,
//   ImageExterior,
//   PlanningToSell,
//   UserDetails,
// } from "../components/sellcarcomponents/components";
// import { Tabs } from "../utils/sellacar/sellACarTab";
// import SellACarOtp from "../components/sellacar/sellACarOtp";
// import storage from "../components/firebase/firebaseConfig";
// import { HandleUpload } from "../components/firebase/firebaseHandleupload";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";
// import WelcomePage from "../components/sellacar/WelcomePage";
// import SubmitMessage from "../components/sellacar/submitMessage";
// import { Formik, Form, ErrorMessage } from "formik";
// import graphQLClient from "@utils/useGQLQuery";
// import {
//   useCreateSellACarMutation,
//   CreateSellACarMutationVariables,
//   useUpdateUserMutation,
//   UpdateUserMutationVariables,
// } from "@utils/graphql";
// import toast from "react-hot-toast";
// import PulseLoader from "react-spinners/PulseLoader";
// const years = Array.from({ length: 44 }, (_, index) => 1980 + index);

// const SellACar = () => {
//   const [activeTab, setActiveTab] = useState(1);
//   const [components, setComponents] = useState(1);
//   const [accessToken, setAccessToken] = useState("");
//   const [Interorimage, setInteriorImage] = useState([]);
//   const [Exterorimage, setEXteriorImage] = useState([]);
//   const [firebaseInteriorImage, setFirebaseInteriorImage] = useState("");
//   const [firebaseExteriorImage, setFirebaseExteriorImage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState("");
//   const [count, setcount] = useState(0);
//   const [formData, setFormData] = useState({
//     registrationNumber: "",
//     make: "",  
//     yearOfManufacture: "",
//     model: "",
//     body: "",
//     state: "",
//     rtocode: "",
//     kmReading: "",
//     fuel: "",
//     vehicleCondition: "",
//     veicleLocation: "",
//     interiorImages: "",
//     exteriorImages: "",
//     expectToSell: "",
//     clientContactPerson: "",
//     clientContactNo: "",
//     address: "",
//     landmark: "",
//     pincode: "",
//   });
//   const scrollContainerRef = useRef();
//   let container;

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const dataContains = JSON.parse(localStorage.getItem("sellacar")) || {};
      

//       const token = localStorage.getItem("token");
//       if (
//         token &&
//         dataContains?.registrationNumber !== "" &&
//         dataContains?.registrationNumber !== undefined
//       ) {
        
//         setComponents(3);
//       } else if (token) {
       
//         setComponents(2);
//       }

//       // token && setComponents(2);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
    

//       const token = localStorage.getItem("token");
//       const id = localStorage.getItem("id");
//       setAccessToken(token);
//       setUserId(id);
//     }
//   }, [components]);



//   const handleInteriorImage = (file) => {
 

//     setInteriorImage([...Interorimage, file]);
//   };

//   const handleExteriorImage = (file) => {
//     setEXteriorImage([...Exterorimage, file]);
//   };

//   useEffect(() => {
//     if (formData.registrationNumber !== "") {
//       const formDataString = JSON.stringify(formData);
//       const activeString=JSON.stringify(activeTab);
//       localStorage.setItem("sellacar", formDataString);
     
//     }
//   }, [formData]);

//   useEffect(()=>{
//     const activeString=JSON.stringify(activeTab);
//     localStorage.setItem('activetab',activeString)
//   },[activeTab])

//   useEffect(() => {
//     const savedFormData = JSON.parse(localStorage.getItem("sellacar")) || {};

//     setFormData(savedFormData);
//   }, [activeTab]);

//   useEffect(() => {
//     const savedFormData = JSON.parse(localStorage.getItem("sellacar")) || {};
//     setFormData(savedFormData);
//   }, []);

//   useEffect(() => {
//     if (success) {
//       toast.success(success.text ? success.text : "Success");
//       setTimeout(() => {
//         setSuccess(null);
//       }, 2000);
//     }
//     if (error) {
//       toast.error(
//         error.text ? error.text : "Something went wrong. Please contact support"
//       );
//       setTimeout(() => {
//         setError(null);
//       }, 2000);
//     }
//   }, [success, error]);

//   const AddSellACarMutation =
//     useCreateSellACarMutation<CreateSellACarMutationVariables>(
//       graphQLClient({ Authorization: `Bearer ${accessToken}` })
//     );

//   const UpdateUserMutation = useUpdateUserMutation<UpdateUserMutationVariables>(
//     graphQLClient({ Authorization: `Bearer ${accessToken}` })
//   );

//   async function SubmitFiles(values, { resetForm }) {
  

//     try {
//       setIsLoading(true);
//       const interiorImages = Interorimage || []; // Assuming values.interiorImage is an array
//       const ExteriorImages = Exterorimage || [];

//       try {
//         const interiorImageUrl = await HandleUpload(
//           interiorImages,
//           "interiorImage",
//           "interior"
//         );
     
//         setFirebaseInteriorImage(interiorImageUrl);
//       } catch (ex) {
       

//         return ""; // Handle error, you may want to log or handle differently
//       }

//       try {
//         const ExteriorImageUrl = await HandleUpload(
//           ExteriorImages,
//           "exteriorImages",
//           "exterior"
//         );
       
//         setFirebaseExteriorImage(ExteriorImageUrl);

    
      
//       } catch (error) {
//         console.log("Exteriro image uploading error", error);
//       }

//       const result = await AddSellACarMutation.mutateAsync({
//         data: {
//           registrationNumber: values?.registrationNumber,
//           make: values?.make,
//           yearOfManufacture: values?.yearOfManufacture,
//           model: values?.model,
//           body: values?.body,
//           state: values?.state,
//           rtoCode: values?.rtoCode,
//           kmRead: values?.kmReading,
//           fuel: values?.fuel,
//           vehicleCondition: values?.vehicleCondition,
//           veicleLocation: values?.veicleLocation,
//           interiorImages: firebaseInteriorImage,
//           exteriorImages: firebaseExteriorImage,
//           expectToSell: new Date(values?.expectToSell).toISOString(),
//           address: values?.address,
//           landmark: values?.landmark,
//           pincode: values?.pincode,
//           user:{connect:{id:userId}}
//         },
//       });

  

//       if (result) {
        
//         const userUpdate = await UpdateUserMutation.mutateAsync({
//           where: { id: userId },
//           data: { firstName: values?.clientContactPerson },
         
//         });
        

//         if (userUpdate) {
//           setComponents(4);
//           setSuccess({
//             text: "Form has been successfully submitted",
//           });
//         }
//       }
//       setIsLoading(false);
//     } catch (error) {
//       setError({
//         text: `Form submission Failed ${error}`,
//       });
//     } finally {
//       setIsLoading(false);
//     }

 
//     setFormData({
//       registrationNumber: "",
//       make: "",
//       yearOfManufacture: "",
//       model: "",
//       body: "",
//       state: "",
//       rtocode: "",
//       kmReading: "",
//       fuel: "",
//       vehicleCondition: "",
//       veicleLocation: "",
//       interiorImages: "",
//       exteriorImages: "",
//       expectToSell: "",
//       clientContactPerson: "",
//       clientContactNo: "",
//       address: "",
//       landmark: "",
//       pincode: "",
//     });
//     resetForm();
//     localStorage.removeItem("sellacar");
//   }

//   const handleScroll = (direction) => {
//     container = scrollContainerRef.current;
//     const scrollAmount = 100;

//     if (direction === "right") {
//       container.scrollLeft += scrollAmount;
//     } else if (direction === "left") {
//       container.scrollLeft -= scrollAmount;
//     } else {
//       container.scrollLeft = direction;
//     }
//   };

//   const handleClose = () => {
//     setActiveTab(1);
//     handleScroll(0);

//     localStorage.removeItem("sellacar");
//     setFormData({
//       registrationNumber: "",
//       make: "",
//       yearOfManufacture: "",
//       model: "",
//       body: "",
//       state: "",
//       rtocode: "",
//       kmReading: "",
//       fuel: "",
//       vehicleCondition: "",
//       veicleLocation: "",
//       interiorImages: "",
//       exteriorImages: "",
//       expectToSell: "",
//       clientContactPerson: "",
//       clientContactNo: "",
//       address: "",
//       landmark: "",
//       pincode: "",
//     });
//   };
// // scroll
//   const handleTabClick = (tabNo) => {
//     setActiveTab(tabNo);
//     if (activeTab < tabNo) {
//       handleScroll("right");
//     } else {
//       handleScroll("left");
//     }
//   };

//   const validationSchema = Yup.object().shape({
//     clientContactPerson: Yup.string().required(
//       "clientContactPerson is required"
//     ),
//     address: Yup.string().required("address is required"),
//     landmark: Yup.string().required("landmark is required"),
//     pincode: Yup.string().required("pincode is required"),
//     // Add other validations for other fields here
//     // ...
//   });
//   return (
//     <div className="w-full min-h-screen relative flex items-center justify-center sm:p-10  ">
//       <div className="w-full h-full absolute  z-[-1] ">
//         <Image
//           src={bck}
//           alt="key"
//           layout="fill"
//           objectFit="cover"
//           className="bg-opacity-50 "
//         />
//       </div>
//       <div className="w-full h-full flex items-center justify-center relative  px-10  ">
//         {isLoading && (
//           <div className=" absolute z-10">
// <PulseLoader
//   color="#010101"
//   size={20}
// />
//           </div>
//         )}
//         {components === 1 && <SellACarOtp index={setComponents} />}

//         {components === 2 && <WelcomePage index={setComponents} />}
//         <div className="max-md:w-96 md:max-w-lg m-3 md:m-0  rounded-xl bg-opacity md:relative bg-white bg-opacity-90">
//           {components === 3 && (
//             <div
//               onClick={handleClose}
//               className="hidden md:block md:absolute top-4 left-4 cursor-pointer text-lg text-[#989898] font-semibold"
//             >
//               X
//             </div>
//           )}

//           {components === 3 && (
//             <div className="w-full h-full  ">
//               <div
//                 ref={scrollContainerRef}
//                 style={{ whiteSpace: "nowrap" }}
//                 className="hidden space-x-4 md:flex overflow-scroll scroll scrollbar-hide   mt-12 h-20 items-center px-6 scroll-smooth "
//               >
//                 {Tabs.map((tab) => (
//                   <button
//                     key={tab.tabIndex}
//                     className={`h-9 px-6 min-w-fit border  border-[#A5A5A5] rounded-md font-poppins font-semibold text-xs p-2 ${
//                       activeTab === tab.tabIndex
//                         ? "text-white bg-blue-500 "
//                         : "bg-white"
//                     }   `}
//                     onClick={() => handleTabClick(tab.tabIndex)}
//                   >
//                     {tab.tabName}
//                   </button>
//                 ))}
//               </div>

//               <Formik
//                 initialValues={formData}
//                 onSubmit={SubmitFiles}
//                 enableReinitialize={true}
//                 // validationSchema={validationSchema}
//               >
//                 {(props) => (
//                   <Form>
//                     <div>
//                       {activeTab === 1 && (
//                         <RegistrationNumber
//                           setActiveTab={setActiveTab}
//                           name="registrationNumber"
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                           isValid={props.isValid}
//                         />
//                       )}
//                       {activeTab === 2 && (
//                         <BodyComponent
//                           name="yearOfManufacture"
//                           setActiveTab={setActiveTab}
//                           constData={years}
//                           label="Select Car Manufacturing Year"
//                           placeholder=" Enter Car Manufacturing Year"
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 3 && (
//                         <SearchBrandComponent
//                           setActiveTab={setActiveTab}
//                           name="make"
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 4 && (
//                         <ModelComponent
//                           name="model"
//                           setActiveTab={setActiveTab}
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 5 && (
//                         <BodyComponent
//                           name="body"
//                           setActiveTab={setActiveTab}
//                           constData={truckBody}
//                           label="Select Vehicle Body Type"
//                           placeholder=" Enter Vehicle Body Type"
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 6 && (
//                         <RegistrationStateComponent
//                           state="state"
//                           rtocode="rtocode"
//                           setActiveTab={setActiveTab}
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 7 && (
//                         <BodyComponent
//                           name="kmReading"
//                           setActiveTab={setActiveTab}
//                           constData={mileageRanges}
//                           label=" Select kilometers Driven"
//                           placeholder="Enter kilometers Driven"
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 8 && (
//                         <BodyComponent
//                           name="fuel"
//                           setActiveTab={setActiveTab}
//                           constData={fuel}
//                           label="Select FuelType"
//                           placeholder=" Enter Fuel Type"
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 9 && (
//                         <BodyComponent
//                           name="vehicleCondition"
//                           setActiveTab={setActiveTab}
//                           constData={vehicleCondition}
//                           label="Select Vehicle condition"
//                           placeholder="Enter Vehicle condition"
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 10 && (
//                         <BodyComponent
//                           name="veicleLocation"
//                           setActiveTab={setActiveTab}
//                           constData={vehicleLocation}
//                           label="Select Vehicle Location"
//                           placeholder="Enter Vehicle Location"
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 11 && (
//                         <ImageInterior
//                           name="image"
//                           setActiveTab={setActiveTab}
//                           handleScroll={handleScroll}
//                           handleImage={handleInteriorImage}
//                           Interorimage={Interorimage}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 12 && (
//                         <ImageExterior
//                           name="image"
//                           setActiveTab={setActiveTab}
//                           handleScroll={handleScroll}
//                           handleImage={handleExteriorImage}
//                           Exterorimage={Exterorimage}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 13 && (
//                         <PlanningToSell
//                           name="expectToSell"
//                           setActiveTab={setActiveTab}
//                           handleScroll={handleScroll}
//                           setFormData={setFormData}
//                           formData={formData}
//                         />
//                       )}
//                       {activeTab === 14 && (
//                         <div className="py-4 w-full flex flex-col items-center ">
//                           <UserDetails
//                             setFormData={setFormData}
//                             formData={formData}
//                           />

//                           <button
//                             type="submit"
//                             disabled={props.isSubmitting}
//                             className="bg-[#135A9E] py-1  w-52 rounded-md md:w-96  px-4 sm:py-2 sm:px-8 hover:bg-[#264b6d]  font-poppins text-white "
//                           >
//                             Submit
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           )}
//         </div>
//         {components === 4 && (
//           <SubmitMessage
//             setActiveTab={setActiveTab}
//             setComponents={setComponents}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default SellACar;

// import { useState,useEffect,useMemo } from "react";
// import DashboardTemplate from "../components/templates/DashboardTemplate"
// import withPrivateRoute from "../utils/withPrivateRoute";

// import Datatable from "../components/ui/Datatable";
// import Loader from "../components/ui/Loader";
// import moment from "moment";
// import {
//   CalendarIcon,
//   DocumentDownloadIcon,
//   PrinterIcon,
// } from "@heroicons/react/outline";

// import AlertModal from "../components/ui/AlertModal";
// import {

//   CheckCircleIcon,
//   LightningBoltIcon,
// } from "@heroicons/react/outline";
// import {
  
//   useUserPaymentsQuery,
//   UserPaymentsQuery,
// } from "@utils/graphql";
// import graphQLClient from "@utils/useGQLQuery";

// function Passbook() {

// const [accessToken, setAccessToken] = useState("");

// const id = localStorage.getItem("id");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       setAccessToken(token);
//     }
//   }, []);


//   const { data , isLoading ,error} = useUserPaymentsQuery<UserPaymentsQuery>(
//     graphQLClient({ Authorization: `Bearer ${accessToken}` }),
   
//     {
     
//      where:{id}
//     },
//     { refetchInterval: 10000, enabled: accessToken !== "" }
//   );

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Ref No",
//         accessor: "refNo",
        
//       },
  
//     {
//       Header: "Payment For",
//       accessor: "paymentFor",
//     },
//     {
//       Header: "Description",
//       accessor: "description",
//     },
//     {
//       Header: "Created AT",
//       accessor: "createdAt",
//       Cell: ({ cell: { value } }) => CreatedAt(value),

//     },
//     {
//       Header: "Updated At",
//       accessor: "updatedAt",
//       Cell: ({ cell: { value } }) => UpdatedAt(value),
//     },
    
//     {
//       Header: "Amount",
//       accessor: "amount",
//       Cell: ({ cell: { value, row: { original: { paymentFor } } } }) => (
//         <div className="flex flex-col">
//           <span className={paymentFor === 'refund' ? 'text-green-400' : 'text-red-400'}>
//             {value}
//           </span>
//           <span className="text-xs text-gray-500">
//         {paymentFor === 'refund' ? (
//           <span className="text-green-400 font-bold">CREDIT</span>
//         ) : (
//           <span className="text-red-400 font-bold">DEBIT</span>
//         )}
//       </span>
//         </div>
//       ),
//     },
    
      
      
    
//       {
//         Header: "Status",
//         accessor: "status",
        
//       },
       
//       ,
//     ],
//     []
//   );
//   if (error) {
    
//     return <div>Error fetching payments data</div>;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
  
 
//   if (data?.user?.payments === undefined) {
   
//   } else {
    
//   }
  

//   const renderPaymentFor = (paymentFor) => {
//     switch (paymentFor) {
//       case "registrations":
//         return "Registration Pay";
//       case "emd":
//         return "EMD Payment";
//       case "refund":
//         return "Refund";
//       case "other":
//         return "Other";
//       default:
//         return "-";
//     }
//   };
//   function CreatedAt(value) {
//     return (
//       <div>
//         <div className="flex space-x-2">
//           <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
//           <div className="space-y-1 font-medium">
//             <div className="text-sm text-gray-900 whitespace-nowrap">
//               <span>{moment(value).format("MMMM Do, YYYY")}</span>
//             </div>
//             <div className="text-xs text-gray-500 bg-gray-200 rounded">
//               <span className="text-left">
//                 {moment(value).format("ddd h:mm a")}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//     function UpdatedAt(value) {
//     return (
//       <div>
//         <div className="flex space-x-2">
//           <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
//           <div className="space-y-1 font-medium">
//             <div className="text-sm text-gray-900 whitespace-nowrap">
//               <span>{moment(value).format("MMMM Do, YYYY")}</span>
//             </div>
//             <div className="text-xs text-gray-500 bg-gray-200 rounded">
//               <span className="text-left">
//                 {moment(value).format("ddd h:mm a")}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//     return (
//         <DashboardTemplate heading="Passbook">
//             <>
//             <div className="relative bg-white">
//         <div className="mx-auto max-w-md text-center  sm:max-w-3xl lg:max-w-7xl">
//           {/* {showHeadings && ( */}
//             {/* <div className="pt-4 pb-1">
//               { data && data?.user?.payments && <p className="mt-px text-3xl font-extrabold text-gray-900 tracking-tight sm:text-3xl animate-pulse">
//                PASSBOOK
//               </p>

//               }
             
//             </div> */}
//           {/* )} */}

//           {isLoading ? (
//             <Loader />
//           ) : (
//             <>
//               {/* {data &&
//                 data?.upcomingEvents &&
//                 data?.upcomingEvents?.length > 0 && ( */}
//                   <>
//                     {/* <div className="sm:hidden">
//                       {data?.user?.payments.map((event, eventIdx) => {
//                         return (
//                           <MobielViewCard
//                             key={eventIdx}
//                             event={event}
//                             allowDownload={
//                               accessToken !== null && accessToken !== ""
//                             }
//                           />
//                         );
//                       })}
//                     </div> */}
//                     <div className="block">
//                     {data?.user?.payments ? (<Datatable
//     tableData={data?.user?.payments}
//     tableColumns={columns}
//   />):(
//   <span>No Transactions Yet</span>
// )}
                      
//                     </div>
                    
//                   </>
//                 {/* )} */}
//             </>
//           )}
//         </div>
//       </div>
//     </>
            
//         </DashboardTemplate>
//     )
// }




// export default withPrivateRoute(Passbook);

import Link from "next/link";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import withPrivateRoute from "../utils/withPrivateRoute";
import maintaince from  "@assets/main2.jpg"
import Image from "next/image";

function SellACar() {
    return (
      <DashboardTemplate heading="">
        <div className="min-h-screen flex   justify-center bg-gray-100">
          <div className="max-w-4xl w-full mt-20 text-center p-6 h-min bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sell A Car Page Coming Soon</h2>
            <p className="text-base text-gray-600 mb-6">
              This page is currently under maintenance. We're working on something
              great, and it will be ready soon. Stay tuned for updates.
            </p>
            <Image
              src={maintaince}
              alt="Under maintenance"
              className="mx-auto mb-4 w-64"
            />
            <p className="text-gray-500 text-sm mb-6">Thank you for your patience!</p>
            <Link
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              href='/dashboard'
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  export default withPrivateRoute(SellACar);

