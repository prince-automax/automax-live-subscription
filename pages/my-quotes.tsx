// import { useState, useMemo, useEffect } from "react";
// import DashboardTemplate from "../components/templates/DashboardTemplate";
// import withPrivateRoute from "../utils/withPrivateRoute";
// import Datatable from "../components/ui/Datatable";
// import Loader from "../components/ui/Loader";

// // import {
// //   useActiveBidsQuery,
// //   ActiveBidsQueryVariables,
// //   OrderDirection,
// //   ActiveBidsQuery,
// //   UpdateVehicleMutationVariables,
// //   useUpdateVehicleMutation,
// //   useMyQuotesQuery,      
// //   MyQuotesQuery,
// //   useQueryQuery,
// //   QueryQueryVariables,
// // } from "@utils/graphql";
// import graphQLClient from "@utils/useGQLQuery";
// import moment from "moment";

// function MyQuotes() {
//   const [accessToken, setAccessToken] = useState("");
//   const [userId, setUserId] = useState("");
//   const [apiInterval, setAPIInterval] = useState(60000);
//   const [tick, setTick] = useState(0);
//   const [serverTime, setserverTime] = useState();
//   // const [enabled, setEnabled] = useState(true);

//   useEffect(() => {
//     const timerR = setInterval(() => {
//       setTick((tic) => tic + 1);
//     }, 1000);
//     return () => clearInterval(timerR);
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       const id = localStorage.getItem("id");
//       setAccessToken(token);
//       setUserId(id);
//     }
//   }, []);

// //   const { data: timeData } = useQueryQuery<QueryQueryVariables>(
// //     graphQLClient(),
// //     {},
// //     { refetchInterval: 60000 }
// //   );

// //   useEffect(() => {
// //     if (timeData && timeData.time) {
// //       setTick(0);
// //       setserverTime(timeData.time);
// //     }
// //   }, [timeData]);

// //   const { data, isLoading } = useMyQuotesQuery<MyQuotesQuery>(
// //     graphQLClient({ Authorization: `Bearer ${accessToken}` }),
// //     {
// //       where: {
// //         userVehicleBids: {
// //           some: {
// //             user: {
// //               id: {
// //                 equals: userId,
// //               },
// //             },
// //           },
// //         },
// //         bidTimeExpire: {
// //           lt: serverTime,
// //         },
// //       },
// //       take: 1,
// //       orderBy: [
// //         {
// //           createdAt: OrderDirection.Desc,
// //         },
// //       ],
// //       vehiclesOrderBy2: [
// //         {
// //           updatedAt: OrderDirection.Desc,
// //         },
// //       ],
// //     },
// //     {
// //       cacheTime: 0,
// //       refetchInterval: apiInterval,
// //       enabled: accessToken != "" && userId != "",
// //     }
// //   );

// //   const callUpdateVehicle =
// //     useUpdateVehicleMutation<UpdateVehicleMutationVariables>(
// //       graphQLClient({ Authorization: `Bearer ${accessToken}` })
// //     );

// //   useEffect(() => {
// //     if (data?.vehicles) {
// //       // setAPIInterval(0);
// //       // setEnabled(false);
// //     }
// //   }, [data]);

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Auction Id",
//         Cell: ({ row }) => (
//           <div>
//             <span>{row?.original?.event?.eventNo}</span>
//           </div>
//         ),
//       },
//       {
//         Header: "Auction Details",
//         accessor: "auctionDetails",
//         Cell: ({ row }) => <AuctionDetails row={row?.original?.event} />,
//       },
//       {
//         Header: "Vehicle Details",
//         accessor: "vehicleDetails",
//         Cell: ({ row }) => <VehicleDetails row={row?.original} />,
//       },
//       {
//         Header: "Win Details",
//         Cell: ({ row }) => <WinDetails row={row?.original} />,
//       },
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   return (
//     <>
//     </>
//     // <DashboardTemplate heading="My Quotes">
//     //   <div>
//     //     {isLoading ? (
//     //       <Loader />
//     //     ) : (
//     //       <>
//     //         {data?.vehicles.length > 0 ? (
//     //           <Datatable
//     //             tableData={data?.vehicles}
//     //             tableColumns={columns}
//     //             hideSearch
//     //           />
//     //         ) : (
//     //           <div>No Quotes found</div>
//     //         )}
//     //       </>
//     //     )}
//     //   </div>
//     // </DashboardTemplate>
//   );
//   // function AuctionId(){
//   //     return (
//   //         <div></div>
//   //     )
//   // }

//   function AuctionDetails({ row }) {
//     return (
//       <div className="whitespace-nowrap sm:divide-y sm:divide-gray-200">
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Auction Type
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             <span style={{ color: "green", fontSize: 14 }}>
//               {row?.eventCategory}
//             </span>
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Seller Name
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.seller?.name}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Event ID
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.eventNo}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Category
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.eventType[0]?.name}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Location
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.location?.state?.name}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Start Date
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.startDate
//               ? moment(row?.startDate).format("MMMM Do, YYYY ddd h:mm a")
//               : ""}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             End Date
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.startDate
//               ? moment(row?.endDate).format("MMMM Do, YYYY ddd h:mm a")
//               : ""}
//           </dd>
//         </div>
//       </div>
//     );
//   }

//   function VehicleDetails({ row }) {
//     return (
//       <div className="whitespace-nowrap  sm:divide-y sm:divide-gray-200">
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Make
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.make ?? "-"}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Model
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.model ?? "-"}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Variant
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.varient ?? "-"}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Kms Run
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.kmReading ?? "-"}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Reg No
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.registrationNumber ?? "-"}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Engine No
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.engineNo ?? "-"}
//           </dd>
//         </div>
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Chassis No
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
//             {row?.chassisNo ?? "-"}
//           </dd>
//         </div>
//       </div>
//     );
//   }

// //   function CallUpdatePrice(vehicleId, amount, setUpdatePrice) {
// //     //
// //     const confirmed = confirm(
// //       `Are you sure to update the bid to\nRs. ${amount}`
// //     );
// //     if (confirmed) {
// //       callUpdateVehicle
// //         .mutateAsync({
// //           data: {
// //             bidAmountUpdate: parseInt(amount),
// //           },
// //           where: {
// //             id: vehicleId,
// //           },
// //         })
// //         .then(() => {
// //           alert("Your bid has been updated");
// //         })
// //         .catch((error) => {
// //           // alert(error.message);
// //         });
// //     }
// //     setUpdatePrice(false);
// //   }

//   function WinDetails({ row }) {
//     const [amount, setAmount] = useState("");
//     const [updatePrice, setUpdatePrice] = useState(false);
//     return (
//       <div className="whitespace-nowrap space-y-4 flex flex-col items-start">
//         <div>
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             {row &&
//             row?.userVehicleBids[0] &&
//             row?.userVehicleBids[0]?.bidVehicle?.currentBidUser ? (
//               <span style={{ color: "green" }}>Won</span>
//             ) : (
//               <span style={{ color: "red" }}>Lost</span>
//             )}
//           </dt>
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             <span>Amount</span>
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-lg font-semibold text-gray-900">
//             Rs. {row?.userVehicleBids[0]?.amount?.toLocaleString("en-IN")}
//           </dd>
//         </div>
//         <div>
//           {!updatePrice ? (
//             row?.bidStatus == "pending" &&
//             row?.userVehicleBids[0]?.bidVehicle?.currentBidUser && (
//               <button
//                 type="button"
//                 onClick={() => setUpdatePrice(true)}
//                 className="text-xs text-indigo-700 underline"
//               >
//                 {row?.bidAmountUpdate > 0
//                   ? `Update price( Current Amount:
//                 ${row?.bidAmountUpdate})`
//                   : `Update price`}
//               </button>
//             )
//           ) : (
//             <>
//               <div className="w-40 border border-blue-700 rounded p-4">
//                 <label
//                   htmlFor="text"
//                   className="block text-xs font-medium text-gray-700"
//                 >
//                   New amount
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="text"
//                     name="text"
//                     id="text"
//                     onChange={(e) => {
//                       setAmount(e.target.value.replace(/\D/g, ""));
//                     }}
//                     value={amount}
//                     className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 {/* <button
//                   type="button"
//                   onClick={() => {
//                     CallUpdatePrice(row?.id, amount, setUpdatePrice);
//                   }}
//                   className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
//                 >
//                   Update
//                 </button> */}
//                 <button
//                   type="button"
//                   onClick={() => setUpdatePrice(false)}
//                   className="px-2 text-xs text-indigo-700 underline"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//         <div>
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             {row && row?.currentBidUser && row?.currentBidUser.id
//               ? "Winning Date"
//               : "Bidding Date"}
//           </dt>
//           <dd className="whitespace-nowrap mt-1 text-xs text-gray-900">
//             {row?.bidTimeExpire
//               ? moment(row?.bidTimeExpire).format("MMMM Do, YYYY ddd h:mm a")
//               : ""}
//           </dd>
//         </div>
//         <div>
//           <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
//             Status
//           </dt>
//           <dd
//             className={
//               row?.bidStatus == "pending"
//                 ? "whitespace-nowrap mt-1 text-xs text-yellow-500"
//                 : row?.bidStatus == "approved"
//                 ? "whitespace-nowrap mt-1 text-xs text-blue-500"
//                 : row?.bidStatus == "fulfilled"
//                 ? "whitespace-nowrap mt-1 text-xs text-green-500"
//                 : row?.bidStatus == "declined"
//                 ? "whitespace-nowrap mt-1 text-xs text-red-500"
//                 : "whitespace-nowrap mt-1 text-xs text-gray-500"
//             }
//           >
//             {row?.bidStatus?.toUpperCase()}
//           </dd>
//         </div>
//         {row?.bidStatus == "fulfilled" && (
//           <button
//             type="button"
//             className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
//           >
//             Print Documents
//           </button>
//         )}
//       </div>
//     );
//   }
// }

// export default withPrivateRoute(MyQuotes);

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import Datatable from "../components/ui/findAuctionTable";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState, useRef } from "react";
// import moment from "moment";
// import { CalendarIcon, ArrowRightIcon } from "@heroicons/react/outline";

// import {
//   CreateBidMutationVariables,
//   useInstitutionsQuery,
//   InstitutionsQueryVariables,
//   useFindAuctionsQuery,
//   FindAuctionsQueryVariables,
//   useFindAuctionStateQuery,
//   FindAuctionStateQueryVariables,
//   OrderDirection,
//   GetUserQueryVariables,
//   useGetUserQuery,
// } from "@utils/graphql";
// import graphQLClient from "@utils/useGQLQuery";
// import toast from "react-hot-toast";


// const Findauction = () => {
//   const [queryResult, setQueryResult] = useState(null);
//   const formikRef = useRef(null);
//   const [accessToken, setAccessToken] = useState("");
//   const [registered, setRegistered] = useState(false);
//   const [id, setId] = useState("");
//   const [registeredStatus, setRegisteredStatus] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       const id = localStorage.getItem("id");

//       setAccessToken(token);
//       setId(id);
//     }
//   }, []);
  

//   // console.log("id from find auc",id);
  

//   const Category = [
//     { value: "vehicle", label: "Vehicle" },
//     { value: "flat", label: "Flat" },
//     { value: "mechinery", label: "Mechinery" },
//     { value: "gold", label: "Gold" },
//     { value: "other", label: "Other" },
//   ];




//   const { data: userData, isLoading: loading } =
//   useGetUserQuery<GetUserQueryVariables>(
//     graphQLClient({ Authorization: `Bearer ${accessToken}` }),
//     { where: { id } },
//     {
//       enabled: accessToken !== "",
//     }
//   );

//   const payment = userData ? userData["user"]?.payments : "";

//   console.log("registerd",registered)
  


//   const PaymentStatus=()=>{
//     toast("Your Access to this service has been disabled. Please contact Autobse for assistance", {
//       duration: 5000,
//       position: "top-right",

//       // Styling
//       // Styling
//       style: {
//         bottom: "80px",
//         background: "rgb(95, 99, 93)",
//         color: "white",
//         border: "rounded",
//         fontSize:"bold"
//       },
//       className: " bg-primary text-white ",

//       // Custom Icon
//       icon: " 🚫 ",

//       // Change colors of success/error/loading icon
//       iconTheme: {
//         primary: "#0000",
//         secondary: "#fff",
//       },

//       // Aria
//       ariaProps: {
//         role: "status",
//         "aria-live": "polite",
//       },
//     });

//   }
  


//   useEffect(() => {
//     if (payment) {
//       payment?.map((item) => {
//         if (item.paymentFor === "registrations") {
//           // console.log('toiso',new Date(item?.RegistrationExpire)?.toISOString(), "dsfsdafasdfasdf",new Date().toISOString());
          
//           if (item.status === "success" && new Date(item?.RegistrationExpire)?.toISOString()  > new Date().toISOString()  ) {
//             setRegistered(true);
//           } else {
//             setRegisteredStatus(item.status);
//           }

//           // console.log("trueeeee");
//         } else {
//           // console.log("falseeeeeeeeeee");
//         }
//       });
//     }
//   }, [payment]);



//   const { data, isLoading: loadingbank } =
//     useInstitutionsQuery<InstitutionsQueryVariables>(graphQLClient());

//   const { data: findAuctionState, isLoading: loadingstate } =
//     useFindAuctionStateQuery<FindAuctionStateQueryVariables>(graphQLClient());

//   const variables = {
//     skip: 0,
//     take: 10,
//   };

//   let currentDateWithoutMinutesSeconds = new Date();
//   currentDateWithoutMinutesSeconds.setMinutes(0, 0, 0);

//   const { data: findAuction } = useFindAuctionsQuery(graphQLClient(), {
//     skip: 0,
//     take: 100,
//     orderBy: [
//       {
//         listingId: OrderDirection.Desc,
//       },
//     ],

//     where: {
//       auctionEndDate: {
//         gte: currentDateWithoutMinutesSeconds.toISOString(),
//       },

//       ...(queryResult?.category && {
//         propertyType: {
//           equals: queryResult?.category,
//         },
//       }),
//       ...(queryResult?.bank && {
//         institution_details: {
//           name: {
//             equals: queryResult?.bank,
//           },
//         },
//       }),
//       ...(queryResult?.state && {
//         state: {
//           name: {
//             equals: queryResult?.state,
//           },
//         },
//       }),
//       ...(queryResult?.city && {
//         city: {
//           contains: queryResult?.city,
//         },
//       }),

//       ...(queryResult?.fromDate && {
//         auctionStartDate: {
//           gte: new Date(queryResult?.fromDate).toISOString(),
//         },
//       }),
//       ...(queryResult?.toDate && {
//         auctionEndDate: {
//           lte: new Date(queryResult?.toDate).toISOString(),
//         },
//       }),
//       ...(queryResult?.minimum &&
//         queryResult?.maximum && {
//           reservePrice: {
//             gte: queryResult?.minimum.toString(),
//           },
//           AND: [
//             {
//               reservePrice: {
//                 lte: queryResult?.maximum.toString(),
//               },
//             },
//           ],
//         }),

//       ...(queryResult?.minimum &&
//         !queryResult?.maximum && {
//           reservePrice: {
//             gte: queryResult?.minimum.toString(),
//           },
//         }),
//       ...(queryResult?.maximum &&
//         !queryResult?.minimum && {
//           reservePrice: {
//             lte: queryResult?.maximum.toString(),
//           },
//         }),
//     },
//   });

//   console.log("find auction ", findAuction);

//   const columns = [
//     {
//       Header: "Listing Id",
//       accessor: "listingId",
//     },
//     {
//       Header: "State",
//       accessor: "state.name",
//     },
//     {
//       Header: "Institution Name",
//       accessor: "institution_details.name",
//     },
//     {
//       Header: "Property Details",
//       accessor: "propertyType",
//     },
//     {
//       Header: "Auction Start Date",
//       accessor: "auctionStartDate",
//       Cell: ({ cell: { value } }) => Format(value),
//     },
//     {
//       Header: "Auction End Date",
//       accessor: "auctionEndDate",
//       Cell: ({ cell: { value } }) => Format(value),
//     },
//     {
//       Header: "Reserve Price",
//       accessor: "reservePrice",
//     },
//     {
//       Header: "View Details",
//       accessor: "id",
//       Cell: ({ cell: { value } }) =>
//         registered ? (
//           View(value)
//         ) : (
//           <button className=" bg-primary-hover font-semibold border text-white py-1 w-full px-6 rounded-lg" onClick={PaymentStatus}>
//          view
//         </button>
//         )
//     },
//   ];

//   function View(value) {
//     return (
//       <div>
//         <Link href={`/openbiddetails/${value}`}>
//           <a target="_blank">
//             <div>
//               <span className="text-emerald-600 font-extrabold">View</span>
//             </div>
//           </a>
//         </Link>
//       </div>
//     );
//   }
//   function MobileViewId(value) {
//     return (
//       <div>
//         <Link href={`/openbiddetails/${value}`}>
//           <a target="_blank">
//             <div className="flex">
//               <span className="  font-medium px-4 py-1 font-poppins mb-6  text-base border-2 border-[#536DD9] text-[#536DD9] rounded-lg">
//                 {" "}
//                 View
//               </span>{" "}
//               <div>
//                 <ArrowRightIcon />
//               </div>
//             </div>
//           </a>
//         </Link>
//       </div>
//     );
//   }
//   function Format(value) {
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
//                 {/* {moment(value).format("ddd h:mm a")} */}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   function DateFormat(value) {
//     return (
//       <div>
//         <div className="flex space-x-2">
//           {/* <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" /> */}
//           <div className="space-y-1 font-poppins">
//             <div className="text-sm  whitespace-nowrap">
//               <span>{moment(value).format("MMMM Do, YYYY")}</span>
//             </div>
//             <div className="text-xs text-gray-500 bg-gray-200 rounded">
//               {/* <span className="text-left">
//                 {moment(value).format("ddd h:mm a")}
//               </span> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   const onSubmitData = async (values, { resetForm }) => {
//     setQueryResult(values);
//     // resetForm();
//   };

//   return (
//     <div className="mt-5 capitalize">
//       <main className="overflow-hidden max-w-7xl mx-auto">
//         {/* Header */}

//         {/* Contact section */}
//         <section className="relative " aria-labelledby="contact-heading">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
//             <div className="relative bg-white shadow-md ">
//               <div className="grid grid-cols-1 lg:grid-cols-3">
//                 {/* Contact information */}

//                 {/* Contact form */}
//                 <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 ">
//                   <h3 className="text-2xl font-medium text-gray-900 border-b">
//                     Search Auction
//                   </h3>
//                   <Formik
//                     initialValues={{
//                       state: "",
//                       bank: "",
//                       category: "",
//                       city: "",
//                       fromDate: "",
//                       toDate: "",
//                       minimum: "",
//                       maximum: "",
//                     }}
//                     onSubmit={onSubmitData}
//                     innerRef={formikRef}
//                   >
//                     {({ isSubmitting }) => (
//                       <Form className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
//                         <div>
//                           <label
//                             htmlFor="location"
//                             className="block text-sm font-medium text-gray-900"
//                           >
//                             Location
//                           </label>
//                           <div className="mt-1 capitalize">
//                             <Field
//                               as="select"
//                               name="state"
//                               id="state"
//                               autoComplete="family-name"
//                               className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md capitalize"
//                               placeholder="List of Banks"
//                             >
//                               <option>Select</option>
//                               {(
//                                 findAuctionState?.states as any[] | undefined
//                               )?.map((banks, index) => (
//                                 <>
//                                   <option key={index} value={banks.name}>
//                                     {banks.name}
//                                   </option>
//                                 </>
//                               ))}
//                             </Field>
//                           </div>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="bank"
//                             className="block text-sm font-medium text-gray-900"
//                           >
//                             Bank Name
//                           </label>
//                           <div className="mt-1">
//                             <Field
//                               as="select"
//                               name="bank"
//                               id="banks"
//                               autoComplete="family-name"
//                               className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
//                               placeholder="List of Banks"
//                             >
//                               <option>Select</option>
//                               {(data?.institutions as any[] | undefined)?.map(
//                                 (banks, index) => (
//                                   <>
//                                     <option key={index} value={banks.name}>
//                                       {banks.name}
//                                     </option>
//                                   </>
//                                 )
//                               )}
//                             </Field>
//                           </div>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="category"
//                             className="block text-sm font-medium text-gray-900"
//                           >
//                             Category
//                           </label>
//                           <div className="mt-1">
//                             <Field
//                               id="Category"
//                               name="category"
//                               as="select"
//                               autoComplete="email"
//                               className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md capitalize"
//                             >
//                               <option>select</option>
//                               {Category.map((category, index) => (
//                                 // <
//                                 <option key={index} value={category.value}>
//                                   {category.label}
//                                 </option>
//                               ))}
//                             </Field>
//                           </div>
//                         </div>
//                         <div>
//                           <div className="flex justify-between">
//                             <label
//                               htmlFor="borrower"
//                               className="block text-sm font-medium text-gray-900"
//                             >
//                               City
//                             </label>
//                           </div>
//                           <div className="mt-1">
//                             <Field
//                               type="text"
//                               name="city"
//                               id="city"
//                               autoComplete="tel"
//                               className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
//                               aria-describedby="phone-optional"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="fromDate"
//                             className="block text-sm font-medium text-gray-900"
//                           >
//                             From
//                           </label>
//                           <div className="mt-1">
//                             <Field
//                               type="Date"
//                               name="fromDate"
//                               id="subject"
//                               className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="toDate"
//                             className="block text-sm font-medium text-gray-900"
//                           >
//                             To
//                           </label>
//                           <div className="mt-1">
//                             <Field
//                               type="Date"
//                               name="toDate"
//                               id="subject"
//                               className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="minimum"
//                             className="block text-sm font-medium text-gray-900"
//                           >
//                             Minimum price
//                           </label>
//                           <div className="mt-1">
//                             <Field
//                               maxLength={10}
//                               type="number"
//                               name="minimum"
//                               id="Minimum"
//                               autoComplete="given-name"
//                               className="py-3 px-4 block w-full shadow-sm text-gray-900 border focus:ring-indigo-500 focus:border-indigo-500 border-black-300 rounded-md"
//                               placeholder="₹ "
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="firstname"
//                             className="block text-sm font-medium text-gray-900"
//                           >
//                             maximum price
//                           </label>
//                           <div className="mt-1">
//                             <Field
//                               maxLength={10}
//                               type="number"
//                               name="maximum"
//                               id="maximum"
//                               autoComplete="given-name"
//                               className="py-3 px-4 block w-full shadow-sm text-gray-900 border focus:ring-indigo-500 focus:border-indigo-500 border-black-300 rounded-md"
//                               placeholder="₹ "
//                             />
//                           </div>
//                         </div>

//                         <div className="sm:col-span-2 sm:flex sm:justify-start">
//                           <button
//                             type="submit"
//                             className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:w-auto"
//                             disabled={isSubmitting}
//                           >
//                             Search Auction
//                           </button>
//                         </div>
//                       </Form>
//                     )}
//                     {/* </form> */}
//                   </Formik>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section>
//           <div className="hidden md:block">
//             {findAuction?.findAuctions && (
//               <Datatable
//                 hideSearch={false}
//                 tableData={findAuction?.findAuctions}
//                 tableColumns={columns}
//               />
//             )}
//           </div>
//           <div className="md:hidden space-y-4 my-4  flex flex-col justify-center items-center">
//             {findAuction?.findAuctions.map((item, index) => {
//               return (
//                 <div
//                   key={index}
//                   className="grid grid-cols-1 gap-1 border-2  border-[#536DD9] rounded-lg mx-2     px-6 py-2 "
//                 >
//                   <div className="grid grid-cols-3 gap-1 space-x-2   items-center   ">
//                     <p className="flex justify-between text-base  ">
//                       Listing ID <span className="pl-2">:</span>
//                     </p>

//                     <p className="col-span-2 text-base pl-2 ">
//                       {item?.listingId}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-3 gap-1 space-x-2  justify-center items-center   ">
//                     <p className="flex justify-between text-base">
//                       State <span>:</span>
//                     </p>

//                     <p className="col-span-2 text-base tracking-wide pl-2">
//                       {item?.state?.name}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-3 gap-1 space-x-2 justify-center items-center ">
//                     <p className="flex justify-between text-base">
//                       Client <span>:</span>
//                     </p>

//                     <p className="col-span-2 text-base pl-2">
//                       {item?.institution_details?.name}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-3 gap-1 space-x-2 justify-center items-center ">
//                     <p className="flex justify-between text-base">
//                       Details <span>:</span>
//                     </p>

//                     <p className="col-span-2  text-base pl-2 ">
//                       {item?.propertyType}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-3 gap-1 space-x-2 justify-center items-center">
//                     <p className="flex justify-between text-base">
//                       Deadline <span>:</span>
//                     </p>

//                     <p className="col-span-2  text-base items-end pl-2">
//                       {DateFormat(item?.emdSubmissionDate)}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-3 gap-1 space-x-2 justify-center items-center">
//                     <p className="flex justify-between text-base">
//                       Auction Date <span className="pl-1">:</span>
//                     </p>

//                     <p className="col-span-2  text-base pl-2">
//                       {DateFormat(item?.auctionStartDate)}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-3 gap-1 space-x-2 justify-center items-center">
//                     <p className="flex justify-between text-base">
//                       Reserve Price <span className="pl-1">:</span>
//                     </p>

//                     <p className="col-span-2  text-sm pl-2">
//                       ₹{item?.reservePrice}
//                     </p>
//                   </div>
//                   <hr className="to-black" />
//                   <div className="space-x-3 mt-2 flex">
//                     {registered ? ( <button className="">{MobileViewId(item?.id)}</button>):(
//                       <span   onClick={PaymentStatus} className="  font-medium px-4 py-1 font-poppins mb-6  text-base border-2 border-[#536DD9] text-[#536DD9] rounded-lg">
//                       {" "}
//                       View
//                     </span>
//                     ) }
                   
//                     <span className=""></span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//         {/* Contact grid */}
//       </main>
//     </div>
//   );
// };

// export default Findauction;


// import DashboardTemplate from "../components/templates/DashboardTemplate"
// import withPrivateRoute from "../utils/withPrivateRoute";

// function BuyingLimit() {

//     return (
//         <DashboardTemplate heading="My Buying Limit">
//             <div>
//                 This is My Buying Limit Page
//             </div>
//         </DashboardTemplate>
//     )
// }

// export default withPrivateRoute(BuyingLimit);


import Link from "next/link";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import withPrivateRoute from "../utils/withPrivateRoute";
import maintaince from  "@assets/main2.jpg"
import Image from "next/image";

function BuyingLimit() {
    return (
      <DashboardTemplate heading="">
        <div className="min-h-screen flex   justify-center bg-gray-100">
          <div className="max-w-4xl w-full mt-20 text-center p-6 h-min bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Quotes  Coming Soon</h2>
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

  export default withPrivateRoute(BuyingLimit);

