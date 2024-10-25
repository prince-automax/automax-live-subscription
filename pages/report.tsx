// import React from 'react'
// import DashboardTemplate from "../components/templates/DashboardTemplate";
// import withPrivateRoute from "../utils/withPrivateRoute";
// import Logo from "../components/ui/Logo";
// import { PaperClipIcon, PencilAltIcon } from "@heroicons/react/outline";
// import { useReportQuery, useGetUserQuery, ReportQueryVariables, VehicleBidStatusType } from "@utils/graphql";
// import { useEffect, useState,  } from "react";
// import graphQLClient from "@utils/useGQLQuery";
// import moment from "moment";
// import Datatable from "../components/ui/Datatable"
// import Loader from "../components/ui/Loader";
// import Link from "next/link";
// import { useRouter } from 'next/router';

// const Report = ({  hideSearch}) => {
//   const [accessToken, setAccessToken] = useState("");
//   const router = useRouter();

// let id

// if(typeof window !== 'undefined'){ 
//     id=localStorage.getItem("id");
//   }



  
  

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       setAccessToken(token);
//     }
//   }, []);

  
//   const variables = {
    
//       where: {
//         bidStatus: {
//           equals:VehicleBidStatusType.Fulfilled
//           }
//           ,AND:[{
//           currentBidUser:{
//             id: {
//               "equals": id
//         }
//         } }]
//   }
    
//   };

//   const { data:vehicles, isLoading } = useReportQuery<ReportQueryVariables>(
//     graphQLClient({ Authorization: `Bearer ${accessToken}` }),
// variables ,   {
//       enabled: accessToken !== "",
//     }
//   );
  
 
//   const vehicle=vehicles?vehicles['vehicles'] : ''

  
  

  


//   const columns = [
//     {
//       Header: "registrationNumber",
//       accessor: "registrationNumber",
     
//     },
//     {
//       Header: "wining amount",
//       accessor: "currentBidAmount",
//     },
//     {  Header: "Event ",
//       accessor: "event.eventNo",
//     },
//     {
//       Header: "make",
//       accessor: "make",
//     },
//     {
//       Header: "bidstatus",
//       accessor: "bidStatus",
//     },
//     {
//       Header: "vehicleEventStatus",
//       accessor: "vehicleEventStatus",
//     },
//     // {
//     //   Header: "View Report",
//     //   accessor: "id",
//     //   Cell: ({ cell: { value } }) => View(value),
//     // },
    
    
//   ];

//   function View(value) {
//     // router.push('/reportForm');
//     return (
//       <div>
//         {/* <Link
//           href={`/$/${value}?type=l`}
//         >
//           <a target="_blank"><div>
//           <span className="text-black font-sm">view</span></div></a>
//         </Link> */}
//         <Link href={`/report/${value}`}>
//   <a>view</a>
// </Link>
     
//       </div>
//     );                                        
//   }

    
//   return (
//     <DashboardTemplate>
//    <>
//       <div className="relative bg-white">
//         <div className="mx-auto max-w-md text-center  sm:max-w-3xl lg:max-w-7xl">
//           {
//             <div className="pt-8 pb-8">
//               <h2 className="text-base font-extrabold tracking-wider text-black uppercase">
                
//                 Report
//               </h2>
//               {/* <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
//                 Most recent events
//               </p>
//               <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
//                 Open auction or closed auction!! Know your deal better with list
//                 of locations, type of auction, date and many more features, An
//                 updates on our most recent events.
//               </p> */}
//             </div>
//           }

//           {isLoading ? (
//             <Loader />
//           ) : (
//             <>
//              {/* {data && data.vehicles && data.vehicles.length = 0 <div>No wining vehicles Found</div>} */}
// {/* {data && data.vehicles && data.vehicles.length > 0 && ( */}
//                 <>
//                   {/* <div className="sm:hidden">
//                   {events.map((event, eventIdx) => {
//                       return (
//                         <MobielViewCard
//                           key={eventIdx}
//                           event={event}
//                           allowDownload={allowDownload}
//                         />
//                       );
//                     })}
//                   </div> */}
//                   <div className="hidden sm:block">
//                   {vehicle  && vehicle.length > 0 && (
//   <Datatable
//     hideSearch={hideSearch}
//     tableData={vehicle}
//     tableColumns={columns}
//   />
// )}

//                   </div>
//                 </>
//               {/* )} */}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//     </DashboardTemplate>
//   )
// }

// export default Report

import Link from "next/link";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import withPrivateRoute from "../utils/withPrivateRoute";
import maintaince from  "@assets/main2.jpg"
import Image from "next/image";

function Settings() {
  return (
    <DashboardTemplate heading="">
      <div className="min-h-screen flex   justify-center bg-gray-100">
        <div className="max-w-4xl w-full mt-20 text-center p-6 h-min bg-white shadow-lg rounded-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Report Coming Soon</h2>
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

export default withPrivateRoute(Settings);

