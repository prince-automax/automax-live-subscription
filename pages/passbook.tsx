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

function PassBook() {
    return (
      <DashboardTemplate heading="">
        <div className="min-h-screen flex   justify-center bg-gray-100">
          <div className="max-w-4xl w-full mt-20 text-center p-6 h-min bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Passbook Page Coming Soon</h2>
            <p className="text-base text-gray-600 mb-6">
              This page is currently under construction. We're working on something
              great, and it will be ready soon. Stay tuned for updates.
            </p>
            <Image
              src={maintaince}
              alt="Under Construction"
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

  export default withPrivateRoute(PassBook);
