// import {
//     ClipboardListIcon,
//     DocumentReportIcon,
//     PlusIcon,
//     MinusIcon,
//   } from "@heroicons/react/outline";
  
//   import {
//     useAddToWatchlistMutation,
//     AddToWatchlistMutationVariables,
//     useRemoveFromWatchlistMutation,
//     RemoveFromWatchlistMutationVariables,
//     useUserWatchlistQuery,
//     useGetEventsQuery,
//     GetEventsQuery,
//     useCreateBidMutation,
//     CreateBidMutationVariables,
//     useTimeQueryQuery,
//     TimeQueryQueryVariables,
//     OrderDirection,
//   } from "@utils/graphql";
//   import useStore from "../../utils/store";
  
//   import {
//     useVehicleUpdateSubscription,
//     VehicleUpdateSubscriptionVariables,
//     useBidCreationSubscription,
//     useUpdateUserMutation,
//     UpdateUserMutationVariables,
//   } from "@utils/apollo";
//   import graphQLClient from "@utils/useGQLQuery";
//   import moment from "moment";
//   import Image from "next/image";
//   import Link from "next/link";
//   import { useRouter } from "next/router";
//   import { useEffect, useState } from "react";
//   import DashboardTemplate from "../../components/templates/DashboardTemplate";
//   import Loader from "../../components/ui/Loader";
//   import withPrivateRoute from "../../utils/withPrivateRoute";
//   import { useQueryClient } from "react-query";
//   import { SecondsToDhms } from "@utils/common";
//   import TermsConditions from "@components/templates/TermsConditions";
//   import InspectionReportModal from "@components/modals/InspectionReportModal";
//   import ImageCarouselModal from "@components/modals/ImageCarouselModal";
//   import Swal from "sweetalert2";
  
//   import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//   // import TermsAndCondtionsModal from  "@components/modals/TermsAndConditionModal"
//   import {
//     faThumbsUp,
//     faThumbsDown,
//     faUserSlash,
//     faCircleInfo,
//     faAngleRight,
//     faSquarePlus,
//     faSquareMinus,
//   } from "@fortawesome/free-solid-svg-icons";
  
//   function Events() {
//     const router = useRouter();
//     const { id, type } = router.query;
//     const [accessToken, setAccessToken] = useState("");
//     const [userId, setUserId] = useState("");
//     // const [usrid, setUsrid] = useState("");
//     const [interval, setAPIInterval] = useState(2000);
//     const queryClient = useQueryClient();
//     const [tick, setTick] = useState(0);
//     const [serverTime, setserverTime] = useState(null);
//     const [showInspectionReportModal, setShowInspectionReportModal] =
//       useState(false);
//     const [showImageCarouselModal, setShowImageCarouselModal] = useState(false);
//     const [images, setImages] = useState([]);
//     const [showCode, setShowCode] = useState(false);
//     const [isNotInWatchlist, setIsNotInWatchlist] = useState(true);
//     const [wathclistVehicls, setWatchlistvehicls] = useState([]);
//     const [demo, setDemo] = useState([]);
  
//     // useEffect(()=>{
//     //   TermsAndCondtionsModal()
//     // },[])
//     const token = useStore((state) => state.token); // Access the token from the store
  
//     // console.log('token from store',token);
  
//     const handleClick = () => {
//       setShowCode(!showCode);
//     };
//     useEffect(() => {
//       const timer = setInterval(() => {
//         setTick((tic) => tic + 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }, []);
  
//     const { data: timeData } = useTimeQueryQuery<TimeQueryQueryVariables>(
//       graphQLClient(),
//       {}
//       // { refetchInterval: 60000 }
//     );
  
//     useEffect(() => {
//       if (timeData && timeData.time) {
//         setTick(0);
//         setserverTime(timeData.time);
//       }
//     }, [timeData]);
  
//     // console.log('timedata',timeData);
  
//     const vehicleUpdate = useVehicleUpdateSubscription();
//     const BidUpdate = useBidCreationSubscription();
//     const UserUpdate = useUpdateUserMutation();
  
//     // console.log("bid", BidUpdate?.data);
//     // console.log("vehicle", vehicleUpdate);
  
//     // const { data:result, loading } = useVehicleUpdateSubscription();
  
//     // console.log('sub',result?.data);
  
//     useEffect(() => {
//       if (timeData && timeData.time) {
//         setTick(0);
//         setserverTime(timeData.time);
//       }
//     }, [timeData]);
  
//     useEffect(() => {
//       if (typeof window !== "undefined") {
//         const token = localStorage.getItem("token");
//         const id = localStorage.getItem("id");
//         setAccessToken(token);
//         setUserId(id);
//         // setUsrid(id);
//       }
//     }, []);
  
//     // useGetEventsQuery,
//     // GetEventsQuery
  
//     const { data, isLoading, refetch } = useGetEventsQuery<GetEventsQuery>(
//       graphQLClient({ Authorization: `Bearer ${accessToken}` }),
//       {
//         where: { id: id as string },
//         orderBy: [
//           {
//             bidTimeExpire: OrderDirection.Asc,
//           },
//         ],
//         take: 1000,
//         skip: 0,
//         // userVehicleBidsOrderBy2: [{ amount: OrderDirection.Desc }],
//       },
//       {
//         enabled: accessToken !== "" && accessToken !== undefined,
//       }
//     );
  
//     // console.log("data", data);
  
//     useEffect(() => {
//       refetch();
//     }, [vehicleUpdate, BidUpdate]);
  
//     const callCreateBid = useCreateBidMutation<CreateBidMutationVariables>(
//       graphQLClient({ Authorization: `Bearer ${accessToken}` })
//     );
  
//     function SecondsLeft(item) {
//       try {
//         if (item) {
//           const expiryTime = moment(item.bidTimeExpire);
//           const currentTime = moment(serverTime).add(tick, "seconds");
//           const diff = expiryTime.diff(currentTime, "seconds");
//           if (diff > 0) {
//             return (
//               <div className="w-full max-sm:flex items-center justify-between">
//                 <div className="text-sm text-[#646464] font-roboto">End's In</div>
//                 <div className="text-base text-red-500 font-medium font-roboto">
//                   {SecondsToDhms(diff)}
//                 </div>
//               </div>
//             );
//           } else {
//             return (
//               <div className="w-full">
//                 <div className="text-base text-red-500">Completed</div>
//               </div>
//             );
//           }
//         }
//       } catch {}
//       return (
//         <div className="w-full">
//           <div className="text-xs">End's in</div>
//           <div className="text-base text-red-500">NA</div>
//         </div>
//       );
//     }
  
//     function IsCompleted(item) {
//       try {
//         if (item) {
//           const expiryTime = moment(item.bidTimeExpire);
//           const currentTime = moment(serverTime).add(tick, "seconds");
//           const diff = expiryTime.diff(currentTime, "seconds");
  
//           if (diff > 0) {
//             return true;
//           } else {
//             return false;
//           }
//         }
//       } catch {}
//       return true;
//     }
  
//     async function CallBid(amount, vehicleId) {
//       const confirmed = await Swal.fire({
//         text: `Are you sure to bid for Rs. ${amount}?`,
//         title: "BID CONFIRMATION",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, bid for it!",
//         customClass: {
//           popup: "animated bounceInDown",
//         },
//         didOpen: () => {
//           const swalContainer = Swal.getContainer();
  
//           // Styling the container to cover the full screen with a blurred overlay
//           swalContainer.style.position = "fixed";
//           swalContainer.style.top = "0";
//           swalContainer.style.left = "0";
//           swalContainer.style.width = "100vw";
//           swalContainer.style.height = "100vh";
//           swalContainer.style.background = "rgba(0, 0, 0, 0.5)"; // Dark semi-transparent background
//           swalContainer.style.backdropFilter = "blur(0.5px)"; // Apply a blur effect
//           swalContainer.style.zIndex = "1050";
//         },
//       });
  
//       if (confirmed.isConfirmed) {
//         try {
//           const result = await callCreateBid.mutateAsync({
//             bidVehicleId: vehicleId,
//             createBidInput: {
//               amount: Number(amount),
//             },
//           });
//           Swal.fire("Success!", "Your bid has been submitted.", "success");
//         } catch (e) {
//           let errorMessage = "An error occurred. Please try again.";
  
//           if (e.response) {
//             const errorMessages = e.response.errors || [];
//             if (errorMessages.length > 0) {
//               errorMessage = errorMessages.map((err) => err.message).join(", ");
//             }
//           } else if (e.message) {
//             errorMessage = e.message;
//           }
  
//           Swal.fire(errorMessage);
//         }
//       }
//     }
  
//     const AddToWatchlist = useAddToWatchlistMutation(
//       graphQLClient({ Authorization: `Bearer ${accessToken}` })
//     );
//     const RemoveFromWatchlist = useRemoveFromWatchlistMutation(
//       graphQLClient({ Authorization: `Bearer ${accessToken}` })
//     );
  
//     const AddWatchlist = async (id: string) => {
//       try {
//         const result = await AddToWatchlist.mutateAsync({
//           data: {
//             watchList: {
//               connect: [
//                 {
//                   id: id,
//                 },
//               ],
//             },
//           },
//           where: {
//             id: userId,
//           },
//         });
  
//         console.log("add watchlist result", result);
//       } catch (error) {
//         console.log(" Add watchlist error", error);
//       }
//     };
  
//     const RemoveWatchlist = async (id: string) => {
//       try {
//         const result = await RemoveFromWatchlist.mutateAsync({
//           data: {
//             watchList: {
//               disconnect: [
//                 {
//                   id: id,
//                 },
//               ],
//             },
//           },
//           where: {
//             id: userId,
//           },
//         });
  
//         console.log("result remove watchlist", result);
//       } catch (error) {
//         console.log("remove watchlsit error", error);
//       }
//     };
  
//     return (
//       // <>
//       // </>
//       <DashboardTemplate
//         heading={
//           "Event ID#" +
//           data?.event?.eventNo +
//           " " +
//           data?.event?.seller?.name +
//           ",  " +
//           data?.event?.location?.name
//         }
//         subHeading={"List of all vehicles in this event"}
//       >
//         {data && data.event && data.event.termsAndConditions ? (
//           <TermsConditions data={data.event.termsAndConditions} />
//         ) : null}
//         {isLoading ? (
//           <Loader />
//         ) : (
//           <div className="space-y-6 mt-8 ">
//             {!data?.event?.vehiclesTemp?.length && <div>No Vehicles Found</div>}
//             {data?.event?.vehiclesTemp?.map((item, index) => {
//               const expiryTime = moment(item.bidTimeExpire);
//               const currentTime = moment(serverTime).add(tick, "seconds");
//               const diff = expiryTime.diff(currentTime, "seconds");
            
  
//               return (
//                 <>
                
  
                 
//                 </>
//               );
             
//             })}
//           </div>
//         )}
//         <InspectionReportModal
//           color="blue"
//           open={showInspectionReportModal}
//           close={() => setShowInspectionReportModal(false)}
//         />
//         <ImageCarouselModal
//           color="blue"
//           open={showImageCarouselModal}
//           close={() => setShowImageCarouselModal(false)}
//           images={images}
//         />
//       </DashboardTemplate>
//     );
//   }
  
//   export default withPrivateRoute(Events);
  

import React from 'react'

const sample = () => {
  return (
    <div>sample</div>
  )
}

export default sample