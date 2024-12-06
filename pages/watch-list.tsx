import Loader from "@components/ui/Loader";
import {
  useAddToWatchlistMutation,
  AddToWatchlistMutationVariables,
  useRemoveFromWatchlistMutation,
  RemoveFromWatchlistMutationVariables,
  useUserWatchlistQuery,
  UserWatchlistQuery,
  UserWatchlistQueryVariables,
  useGetEventsQuery,
  GetEventsQuery,
  useCreateBidMutation,
  CreateBidMutationVariables,
  useTimeQueryQuery,
  TimeQueryQueryVariables,
  OrderDirection,
} from "@utils/graphql";

import {
  useVehicleUpdateSubscription,
  VehicleUpdateSubscriptionVariables,
  useBidCreationSubscription,
  useUserUpdateSubscriptionSubscription,
} from "@utils/apollo";
import graphQLClient from "@utils/useGQLQuery";
import moment from "moment";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import React, { useEffect, useState } from "react";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import withPrivateRoute from "../utils/withPrivateRoute";
import Image from "next/image";
import Link from "next/link";
import ImageCarouselModal from "@components/modals/ImageCarouselModal";
import {
  ClipboardListIcon,
  DocumentReportIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/outline";
import { useQueryClient } from "react-query";
import { SecondsToDhms } from "@utils/common";
import Swal from "sweetalert2";
import {
  faCircleInfo,
  faAngleRight,
  faUserSlash,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function WatchList() {
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const queryClient = useQueryClient();
  const [tick, setTick] = useState(0);
  const [serverTime, setserverTime] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [images, setImages] = useState([]);
  const [showImageCarouselModal, setShowImageCarouselModal] = useState(false);
  const [showChild, setShowChild] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the vertical scroll position
      const scrollPosition = window.scrollY;

      // console.log("window", scrollPosition);

      // Determine the point where you want to show the child div
      const showThreshold = 200; // Adjust this value as needed

      // Toggle the visibility of the child div based on the scroll position
      setShowChild(scrollPosition >= showThreshold);
    };

    // Add event listener for scroll when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      setAccessToken(token);
      setUserId(id);
      setIsReady(true);
    }
  }, []);

  const client = React.useMemo(
    () => graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    [accessToken]
  );

  const options = {
    rewind: true,
    gap: 1, // Adjust gap as needed
    autoplay: true,
    interval: 2000, // Set autoplay interval in milliseconds
    pauseOnHover: false,
    resetProgress: false,
    pagination: false,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((tic) => tic + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { data: timeData } = useTimeQueryQuery<TimeQueryQueryVariables>(
    client,
    {},
    {
      enabled: isReady, // Enable query only when `isReady` is true
      refetchOnWindowFocus: true,
      refetchInterval: false, // Do not refetch on window focus
      refetchOnMount: false, // Prevent refetch on component mount
      // staleTime: 1000 * 60 * 5,         // Cache the result for 5 minutes
    }
  );

  useEffect(() => {
    if (timeData && timeData.time) {
      setTick(0);
      setserverTime(timeData.time);
    }
  }, [timeData]);

  const vehicleUpdate = useVehicleUpdateSubscription();
  const BidUpdate = useBidCreationSubscription();
  const UserUpdate = useUserUpdateSubscriptionSubscription();

  // useEffect(() => {
  //   const subscription = vehicleUpdate.subscribe();
  //   return () => subscription.unsubscribe();
  // }, [vehicleUpdate]);

  useEffect(() => {
    // Code in this section runs on mount
    console.log("Component mounted in watchlist");

    // Return a function to run when the component unmounts
    return () => {
      console.log("Component unmounted in watchlist");
    };
  }, []); // Empty dependency array means this runs only once on mount and unmount
  const { data, isLoading, refetch } =
    useUserWatchlistQuery<UserWatchlistQuery>(
      client,
      {
        where: {
          id: userId,
        },
      },
      {
        enabled: isReady, // Enable query only when `isReady` is true
        refetchOnWindowFocus: false,
        // refetchInterval:false  ,  // Do not refetch on window focus
        refetchOnMount: false, // Prevent refetch on component mount
        // staleTime: 1000 * 60 * 5,         // Cache the result for 5 minutes
      }
    );

  useEffect(() => {
    if (vehicleUpdate.data || BidUpdate.data || UserUpdate?.data) {
      if (isReady) {
        refetch();
      }
    }
  }, [vehicleUpdate.data, BidUpdate.data, UserUpdate?.data, refetch,isReady]);

  console.log("data", data);

  const RemoveFromWatchlist = useRemoveFromWatchlistMutation(client);

  const RemoveWathclist = async (id: string) => {
    try {
      const result = await RemoveFromWatchlist.mutateAsync({
        data: {
          watchList: {
            disconnect: [
              {
                id: id,
              },
            ],
          },
        },
        where: {
          id: userId,
        },
      });

      // console.log("result remove watchlist", result);
    } catch (error) {
      // console.log("remove watchlsit error", error);
    }
  };

  function SecondsLeft(item) {
    try {
      if (item) {
        const expiryTime = moment(item.bidTimeExpire);
        const currentTime = moment(serverTime).add(tick, "seconds");
        const diff = expiryTime.diff(currentTime, "seconds");
        if (diff > 0) {
          return (
            <div className="w-full max-sm:flex items-center justify-between">
              <div className="text-sm text-[#646464] font-roboto">End's In</div>
              <div className="text-base text-red-500">
                {SecondsToDhms(diff)}
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full">
              <div className="text-base text-red-500">Completed</div>
            </div>
          );
        }
      }
    } catch {}
    return (
      <div className="w-full">
        <div className="text-xs">End's in</div>
        <div className="text-base text-red-500">NA</div>
      </div>
    );
  }

  const callCreateBid =
    useCreateBidMutation<CreateBidMutationVariables>(client);

  async function CallBid(amount, vehicleId) {
    const confirmed = await Swal.fire({
      text: `Are you sure to bid for Rs. ${amount}?`,
      title: "BID CONFIRMATION",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, bid for it!",
      customClass: {
        popup: "animated bounceInDown",
      },
      didOpen: () => {
        const swalContainer = Swal.getContainer();

        // Styling the container to cover the full screen with a blurred overlay
        swalContainer.style.position = "fixed";
        swalContainer.style.top = "0";
        swalContainer.style.left = "0";
        swalContainer.style.width = "100vw";
        swalContainer.style.height = "100vh";
        swalContainer.style.background = "rgba(0, 0, 0, 0.5)"; // Dark semi-transparent background
        swalContainer.style.backdropFilter = "blur(0.5px)"; // Apply a blur effect
        swalContainer.style.zIndex = "1050";
      },
    });
    if (confirmed.isConfirmed) {
      try {
        const result = await callCreateBid.mutateAsync({
          bidVehicleId: vehicleId,
          createBidInput: {
            amount: Number(amount),
          },
        });
        // console.log("result ", result);

        Swal.fire("Success!", "Your bid has been submitted.", "success");
      } catch (e) {
        let errorMessage = "An error occurred. Please try again.";

        if (e.response) {
          const errorMessages = e.response.errors || [];
          if (errorMessages.length > 0) {
            errorMessage = errorMessages.map((err) => err.message).join(", ");
          }
        } else if (e.message) {
          errorMessage = e.message;
        }

        Swal.fire(errorMessage);
      }
    }
  }
  return (
    <DashboardTemplate heading={`My Watch List`}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-6 mt-8">
          {!data?.user?.watchList?.length && <div>No Vehicles Found</div>}
          {data?.user?.watchList?.map((item, index) => {
            // filter((item) => item.vehicleEventStatus == "live")

            // console.log("item in front image", item);

            return (
              <>
                {/*  MOBILE VIEW STARTS HERE */}
                <div
                  key={`d${item?.id}`}
                  className={`sm:hidden sm:max-md:flex-col font-sans border-2  rounded border-[#A7C2FF80] bg-[#EEF1FB]   ${
                    moment(item?.bidTimeExpire).diff(moment(), "s") <= 120 &&
                    moment(item?.bidTimeExpire).diff(moment(), "s") > 0
                      ? "blink"
                      : ""
                  }`}
                  id={`parentcontainer-${index}`}
                >
                  {/* WORKBOOK MATCH, TITLE, IMAGE FOR MOBILE VIEW STARTS HERE  */}
                  <div className="flex-auto p-3 lg:space-y-4 sm:p-6 ">
                    {/* workbook match and watchlist remove button starts here */}
                    <div className="mb-3 flex justify-between border ">
                      <button
                        type="button"
                        className="
                         sm:hidden inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded text-blue-700 "
                        onClick={() => RemoveWathclist(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    {/* workbook match and watchlist remove button  ends here */}

                    {/* title starts here */}
                    <div className="sm:flex flex-wrap">
                      <div className="flex-auto">
                        <h1 className="   text-base sm:text-lg   font-bold sm:font-semibold text-blue-800 uppercase">
                          {/* {item?.yo} */}
                          {item?.model}
                          {/* {item?.model} -{" "} */}
                          {item.registrationNumber}
                        </h1>
                        <div className="text-sm font-medium text-slate-700">
                          {item?.event?.seller?.name}
                        </div>
                      </div>
                    </div>
                    {/* title ends here */}

                    {/* mobile veiw for image starts here */}
                    {item?.image && (
                      <div
                        className="block sm:hidden flex-none w-70 h-56  sm:max-md:h-56 sm:max-md:w-full md:h-auto sm:w-60 relative p-6 m-3 hover:cursor-pointer"
                        onClick={() => {
                          // BindVehicleImage(item);
                          setImages((item?.image).split(","));
                          setShowImageCarouselModal(true);
                        }}
                      >
                        <Image
                          alt=""
                          src={item?.image}
                          layout="fill"
                          className="absolute inset-0 w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                    {/* <div 
      className=" h-full  w-full relative p-6 m-3 hover:cursor-pointer">

  <Splide options={options} aria-label="React Splide Example">
  {item.image?.split(',').map((imageUrl, index) => (
    <SplideSlide key={index}>
      <Image  
        alt={`image${index}`}
        src={imageUrl.trim()}
        className="w-full h-full object-center object-cover rounded-lg"
        width={500}
        height={300}
      />
    </SplideSlide>
  ))}
</Splide>
  </div> */}

                    {/* mobile view for image ends here */}
                  </div>

                  {/* WORKBOOK MATCH, TITLE, IMAGE FOR MOBILE VIEW ENDS HERE  */}

                  {/* VEHICLE INFORMATION, INOECTION REPORT,BID TIMING  FOR MOBILE, BID BOX   STARTS HERE */}
                  <div className="flex-auto   ">
                    {/* vehicle information starts here */}
                    <div className=" mt-4 pb-3 border-b-2 border-zinc-200">
                      <dl className="grid grid-cols-3 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-3  ">
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Odometer
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.kmReading ?? "N/A"} km
                          </dd>
                        </div>
                        <div className="max-sm:hidden sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Ownership
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.ownership}
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            RC Book
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.rcStatus}
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Repo date
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {" "}
                            -
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Total Bids
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.userVehicleBidsCount}
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Bids Remaining
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.event?.noOfBids - item?.userVehicleBidsCount}
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block ">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Rank
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.myBidRank ? item.myBidRank : "N/A"}
                          </dd>
                        </div>
                        <div className=" col-span-3 sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block  ">
                          {item?.event?.bidLock === "locked" ? (
                            <>
                              <dt className="text-sm font-bold sm:font-medium text-gray-500">
                                Current Quote
                              </dt>
                              <dd className="text-sm font-medium sm:font-normal text-gray-900">
                                {item?.currentBidAmount ?? "N/A"}
                              </dd>
                            </>
                          ) : (
                            <>
                              <dt className="text-sm font-bold sm:font-medium text-gray-500">
                                Your Latest Quote
                              </dt>
                              <dd className="text-sm font-medium sm:font-normal text-gray-900">
                                {item?.userVehicleBids?.length
                                  ? item?.userVehicleBids[0]?.amount
                                  : "N/A"}
                              </dd>
                            </>
                          )}
                        </div>
                      </dl>
                    </div>
                    {/* vehicle information ends here */}

                    {/* MOBILE VIEW FOR INSPECT AND MORE DETAIL STARTS HERE) */}
                    <div className="flex sm:hidden space-x-4 mt-6 pt-4 pr-1 text-sm font-medium border-t border-slate-200">
                      <div className="flex-auto flex space-x-4">
                        <div className="mt-1 flex flex-row sm:flex-wrap sm:mt-0 space-x-2 sm:space-x-6 justify-around w-full  sm:max-md:justify-around sm:max-md:w-full ">
                          <div className="flex flex-col space-y-2 w-64">
                            <div className=" flex items-center justify-between text-sm text-blue-800 ">
                               {item?.inspectionLink &&
                                /^(https?:\/\/)/.test(item.inspectionLink) && (
                                  <Link href={item.inspectionLink}>
                                    <a
                                      target="_blank"
                                      className="flex items-center text-xs sm:text-sm text-blue-800"
                                    >
                                      <DocumentReportIcon
                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-700"
                                        aria-hidden="true"
                                      />
                                      Inspection Report
                                    </a>
                                  </Link>
                                )}

                              <FontAwesomeIcon icon={faCircleInfo} />
                            </div>
                            <div className=" flex items-center justify-between text-sm text-blue-800 ">
                              <Link href={`/vehicle/${item.id}`}>
                                <a
                                  target="_blank"
                                  className="flex items-center text-sm font-roboto font-medium text-[#2563EB]"
                                >
                                  More Details
                                </a>
                              </Link>

                              <FontAwesomeIcon icon={faAngleRight} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* MOBILE VIEW FOR INSPECT AND MORE DETAIL ENDS HERE) */}

                    {/* BID TIMING SHOW STARTS HERE */}
                    <div className="flex sm:max-md:flex-row flex-col items-center  justify-center  p-4 space-y-2">
                      <div className="w-full max-sm:flex flex-col sm:max-md:w-1/2 sm:max-md:self-start    sm:max-md:text-left space-y-2 mt-1 sm:mt-2 ">
                        <p className="sm:max-md:text-base md:text-left">
                          {" "}
                          {SecondsLeft(item)}
                        </p>

                        {/* <div className="w-full space-y-2 mt-4"> */}
                        <div className="flex justify-between sm:flex-col md:items-start sm:justify-left text-sm  text-gray-700 ">
                          <p className="text-[#646464] text-sm font-roboto">
                            Start Date
                          </p>
                          <p className="font-semibold font-roboto ">
                            {item?.event?.startDate
                              ? moment(item?.event?.startDate).format(
                                  "MMMM Do, YYYY ddd h:mm a"
                                )
                              : "NA"}
                          </p>
                        </div>
                        <div className="flex justify-between sm:flex-col md:items-start text-sm  text-gray-700">
                          <p className="text-[#646464] text-sm font-roboto">
                            End Date
                          </p>
                          <p className="items-start font-semibold font-roboto">
                            {item?.bidTimeExpire
                              ? moment(item?.bidTimeExpire).format(
                                  "MMMM Do, YYYY ddd h:mm a"
                                )
                              : "NA"}
                          </p>
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    {/* BID TIMING SHOW ENDS HERE */}

                    {/* BID BOX FOR MOBILE VIEW STARTS HERE */}

                    <div className=" w-full mt-4  bg-[#E5E9F9] rounded-lg">
                      <div className="px-4 py-2">
                        <h2 className="text-base  text-gray-900  text-center font-roboto font-bold">
                          Bid Details
                        </h2>

                        <div className="space-y-2 mt-2 text-sm">
                          <div className="flex items-center justify-between  text-gray-700">
                            <span className="font-roboto font-medium text-sm text-[#646464]">
                              Start Price
                            </span>
                            <span className="font-bold text-base">
                              ₹ {item?.startPrice ? item?.startPrice : "0"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between  text-gray-700">
                            <span className="font-roboto font-medium text-sm text-[#646464]">
                              Reserve Price
                            </span>
                            <span className="font-bold text-base">
                              ₹ {item?.reservePrice}
                            </span>
                          </div>
                          <div className="flex items-center justify-between  text-gray-700">
                            <span className="font-roboto font-medium text-sm text-[#646464]">
                              Quote Increment
                            </span>
                            <span className="font-bold text-base">
                              ₹ {item?.quoteIncreament}
                            </span>
                          </div>
                          <div className="flex items-center justify-between  text-gray-700">
                            <span className="font-bold">Current Status</span>
                            {item?.userVehicleBidsCount && item?.myBidRank ? (
                              item?.myBidRank == 1 ? (
                                <p className="space-x-2">
                                  <FontAwesomeIcon icon={faThumbsUp} />
                                  <span
                                    style={{ color: "#00CC00" }}
                                    className="font-bold text-base"
                                  >
                                    Winning
                                  </span>
                                </p>
                              ) : (
                                <p className="space-x-2">
                                  <FontAwesomeIcon icon={faThumbsDown} />{" "}
                                  <span
                                    style={{ color: "#FF3333" }}
                                    className="font-bold text-base"
                                  >
                                    Losing
                                  </span>
                                </p>
                              )
                            ) : (
                              <p className="space-x-2">
                                <FontAwesomeIcon icon={faUserSlash} />{" "}
                                <span
                                  style={{ color: "#CCCC00" }}
                                  className="font-bold text-base"
                                >
                                  Not Enrolled
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <EnterBid
                          row={item}
                          call={CallBid}
                          event={data["event"]}
                        />
                      </div>
                    </div>
                    {/* BID BOX FOR MOBILE VIEW ENDS HERE */}
                  </div>
                  {/* VEHICLE INFORMATION, INSPECTION REPORT,BID TIMING  FOR MOBILE  ENDS HERE  */}
                </div>
                {/*  MOBILE VIEW ENDS HERE */}

                {/* DESKTOP VIEW STARTS HERE */}
                <div
                  key={`d${index}`}
                  className={`hidden  sm:flex sm:max-md:flex-col font-sans border-2  rounded relative   ${
                    moment(item?.bidTimeExpire).diff(moment(), "s") <= 120 &&
                    moment(item?.bidTimeExpire).diff(moment(), "s") > 0
                      ? "blink"
                      : ""
                  }${
                    index % 2 == 0
                      ? "border-yellow-100 bg-gray-100 "
                      : "border-gray-100 bg-slate-50"
                  } `}
                  id={`parentcontainer-${index}`}
                >
                  {/* image only for desktop view starts here */}
                  {item?.image && (
                    <div
                    className="flex-none w-60 h-56  sm:max-md:h-56 sm:max-md:w-full md:h-auto sm:w-52 relative p-6 hover:cursor-pointer"
                    onClick={() => {
                        // BindVehicleImage(item);
                        setImages((item?.image).split(","));
                        setShowImageCarouselModal(true);
                      }}
                    >
                      <Image
                        alt=""
                        src={item?.image}
                        layout="fill"
                        className="absolute inset-0 w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  {/* image only for desktop view ends here */}

                  {/* WORKBOOK MATCH, TITLE, IMAGE FOR MOBILE VIEW,VEHICLE INFORMATION, INOECTION REPORT FOR MOBILE AND DESKTOP STARTS HERE  */}
                  <div className="flex-auto p-3 lg:space-y-4 sm:p-6">
                    {/* workbook match and watchlist remove button starts here */}
                    <div className="mb-3 flex justify-between">
                      <button
                        type="button"
                        className="
                         sm:hidden inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded text-red-700 "
                        // onClick={() => removeFromWatchList(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    {/* workbook match and watchlist remove button  ends here */}

                    {/* title starts here */}
                    <div className="sm:flex flex-wrap">
                      <div className="flex-auto">
                        <h1 className="   text-base sm:text-lg   font-bold sm:font-semibold text-blue-800 uppercase">
                          {item?.YOM}
                          {item?.model}
                          {/* {item?.model} -{" "} */}
                          {item.registrationNumber}
                        </h1>
                        <div className="text-sm font-medium text-slate-700">
                          {item?.event?.seller?.name}
                        </div>
                      </div>
                    </div>
                    {/* title ends here */}

                    {/* vehicle information starts here */}
                    <div className="">
                      <dl className="grid grid-cols-3 gap-x-1 gap-y-2 sm:gap-x-4 sm:gap-y-3  ">
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Odometer
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.kmReading ?? "N/A"} km
                          </dd>
                        </div>
                        <div className="max-sm:hidden sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Ownership
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.ownership}
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            RC Book
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.rcStatus}
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Repo date
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {" "}
                            -
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Total Bids
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.userVehicleBidsCount}
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Bids Remaining
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.event?.noOfBids - item?.userVehicleBidsCount}
                          </dd>
                        </div>
                        <div className="sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block ">
                          <dt className="text-sm font-bold sm:font-medium text-gray-500">
                            Rank
                          </dt>
                          <dd className="text-sm font-medium sm:font-normal text-gray-900">
                            {item?.myBidRank ? item.myBidRank : "N/A"}
                          </dd>
                        </div>
                        <div className=" col-span-3 sm:col-span-1 flex max-sm:flex-col items-center justify-between sm:block  ">
                          {item?.event?.bidLock === "locked" ? (
                            <>
                              <dt className="text-sm font-bold sm:font-medium text-gray-500">
                                Current Quote
                              </dt>
                              <dd className="text-sm font-medium sm:font-normal text-gray-900">
                                {item?.currentBidAmount ?? "N/A"}
                              </dd>
                            </>
                          ) : (
                            <>
                              <dt className="text-sm font-bold sm:font-medium text-gray-500">
                                Your Latest Quote
                              </dt>
                              <dd className="text-sm font-medium sm:font-normal text-gray-900">
                                {item?.userVehicleBids?.length
                                  ? item?.userVehicleBids[0]?.amount
                                  : "N/A"}
                              </dd>
                            </>
                          )}
                        </div>
                      </dl>
                    </div>
                    {/* vehicle information ends here */}

                    {/* </div> */}
                    {/* DESKTOP  VIEW FOR INSPECT AND MORE DETAIL STARTS HERE) */}
                    <div className="hidden sm:flex space-x-4 mt-6 pt-4 pr-1 text-sm font-medium border-t border-slate-200">
                      <div className="flex-auto flex space-x-4">
                        <div className="mt-1 flex flex-row sm:flex-wrap sm:mt-0 space-x-2 sm:space-x-6 justify-around w-full  sm:max-md:justify-around sm:max-md:w-full ">
                          <div className="hidden sm:flex mt-2  items-center text-sm text-gray-500">
                            {!item.watchedByCount ? (
                              <button
                                type="button"
                                className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                // onClick={() => addToWatchList(item.id)}
                              >
                                <PlusIcon
                                  className="-ml-0.5 mr-2 h-4 w-4"
                                  aria-hidden="true"
                                />
                                Add to watchlist
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs sm:text-sm  leading-4 font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => RemoveWathclist(item.id)}
                              >
                                {/* <MinusIcon
                                  className="-ml-0.5 mr-2 h-4 w-4"
                                  aria-hidden="true"
                                /> */}
                                Remove from watchlist
                              </button>
                            )}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-blue-800">
                          {item?.inspectionLink &&
                                /^(https?:\/\/)/.test(item.inspectionLink) && (
                                  <Link href={item.inspectionLink}>
                                    <a
                                      target="_blank"
                                      className="flex items-center text-xs sm:text-sm text-blue-800"
                                    >
                                      <DocumentReportIcon
                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-700"
                                        aria-hidden="true"
                                      />
                                      Inspection Report
                                    </a>
                                  </Link>
                                )}
                          </div>
                          <div className="mt-2">
                            <Link href={`/vehicle/${item.id}`}>
                              <a
                                target="_blank"
                                className="flex items-center text-sm text-blue-800"
                              >
                                <ClipboardListIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-700"
                                  aria-hidden="true"
                                />
                                More Details
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* DESKTOP  VIEW FOR INSPECT AND MORE DETAIL ENDS HERE) */}
                  </div>
                  {/* WORKBOOK MATCH, TITLE, IMAGE FOR MOBILE VIEW,VEHICLE INFORMATION, INOECTION REPORT FOR MOBILE AND DESKTOP ENDS HERE  */}

                  {/* PARENT DIV THAT INCLUDE BID TIMING AND BID BOX FOR DESKTOP STARTS HERE */}
                  <div className="flex-none w-50   sm:max-md:w-full text-center mx-auto sm:w-60  ">
                    {/* BID TIMING SHOW STARTS HERE */}
                    <div className="flex sm:max-md:flex-row flex-col items-center  justify-center  p-1 space-y-2">
                      <div className="w-full  sm:max-md:w-1/2 sm:max-md:self-start    sm:max-md:text-left space-y-2 mt-1 sm:mt-2 ">
                        <span className="sm:max-md:text-base md:text-left">
                          {" "}
                          {SecondsLeft(item)}
                        </span>
                        <div className="hidden sm:block">
                          <div className=" flex flex-col md:items-start justify-left text-xs sm:max-md:text-sm text-gray-700">
                            <span className="font-semibold">Start Date</span>
                            <span>
                              {item.event.startDate
                                ? moment(item.event.startDate).format(
                                    "MMMM Do, YYYY ddd h:mm a"
                                  )
                                : "NA"}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-start text-xs sm:max-md:text-sm text-gray-700">
                          <span className="font-semibold">End Date</span>
                          <span>
                            {item?.bidTimeExpire
                              ? moment(item?.bidTimeExpire).format(
                                  "MMMM Do, YYYY ddd h:mm a"
                                )
                              : "NA"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BID TIMING SHOW ENDS HERE */}

                    {/* bid box  for desktop  starts here */}
                    <div className="max-sm:hidden  w-full sm:max-md:w-1/2 md:w-full bg-gray-200 rounded-lg  p-0">
                      <div className="px-4 py-2">
                        <h2 className="text-sm font-semibold text-gray-900">
                          Bid Details
                        </h2>

                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-700">
                            <span>Start Price</span>₹{" "}
                            {item?.startPrice ? item?.startPrice : "0"}
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-700">
                            <span>Reserve Price</span>
                            <span>{item?.reservePrice}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-700">
                            <span>Quote Increment</span>
                            <span>{item?.quoteIncreament}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-700">
                            <span>Current Status</span>
                            {item?.userVehicleBidsCount && item?.myBidRank ? (
                              item?.myBidRank == 1 ? (
                                <span style={{ color: "#00CC00" }}>
                                  Winning
                                </span>
                              ) : (
                                <span style={{ color: "#FF3333" }}>Losing</span>
                              )
                            ) : (
                              <span style={{ color: "#CCCC00" }}>
                                Not Enrolled
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <EnterBid
                          row={item}
                          call={CallBid}
                          event={item["event"]}
                        />
                      </div>
                    </div>

                    {/* bid box  for desktop ends here */}
                  </div>
                  {/* PARENT DIV THAT INCLUDE BID TIMING AND BID BOX FOR DESKTOP  ENDS HERE  */}
                </div>
                {/* DESKTOP VIEW ENDS HERE */}
              </>
            );
          })}
        </div>
      )}
      <ImageCarouselModal
        color="blue"
        open={showImageCarouselModal}
        close={() => setShowImageCarouselModal(false)}
        images={images}
      />
    </DashboardTemplate>
  );
}

const EnterBid = ({ row, call, event }) => {
  console.log("event", row);

  const [bidAmount, setBidAmount] = useState("");
  // console.log('row',row?.currentBidAmount+ +row?.quoteIncreament,bidAmount);

  useEffect(() => {
    if (row?.event?.bidLock === "locked") {
      console.log("event is locked");

      if (row?.currentBidAmount) {
        console.log("row?.currentBidAmount");

        setBidAmount(row.currentBidAmount + +row?.quoteIncreament);
      } else if (row.startPrice) {
        console.log("row?.startPrice");

        setBidAmount(row.startPrice);
      } else if (!row?.startPrice) {
        console.log("!row?.startPrice");

        setBidAmount(row?.quoteIncreament);
      }
    } else {
      if (row.currentBidAmount) {
        let amt = row?.userVehicleBids?.length
          ? row?.userVehicleBids[0]?.amount + +row?.quoteIncreament
          : row.startPrice;
        setBidAmount(amt?.toString());
      } else if (row.startPrice) {
        setBidAmount(row.startPrice);
      } else if (!row?.startPrice) {
        setBidAmount(row?.quoteIncreament);
      }
    }
  }, [row?.event?.bidLock, row]);

  const enrolled = row.userVehicleBidsCount > 0;

  // console.log('bidAmount',bidAmount);

  return (
    <div>
      {event?.bidLock === "locked" ? (
        <input
          id="input"
          className="w-full border border-gray-500 px-5 py-2 placeholder-gray-500 focus:outline-none rounded-md"
          placeholder="Enter amount"
          // defaultValue={row.currentBidAmount !==0 ? row.currentBidAmount  :row.startPrice }
          value={bidAmount !== "0" ? bidAmount : row.startPrice}
          onChange={(e) => {
            setBidAmount(e.target.value.replace(/\D/g, ""));
          }}
        />
      ) : (
        <input
          id="input"
          className="w-full border border-gray-400 px-5 py-2 placeholder-gray-500 focus:outline-none rounded-md"
          placeholder="Enter amount"
          // defaultValue={row.currentBidAmount !==0 ? row.currentBidAmount  :row.startPrice }
          value={bidAmount !== "0" ? bidAmount : row.startPrice}
          onChange={(e) => {
            setBidAmount(e.target.value.replace(/\D/g, ""));
          }}
        />
      )}

      <button
        type="submit"
        className="mt-2 w-full flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        onClick={() => {
          if (parseInt(bidAmount) === 0) {
            call(row.startPrice, row.id);
            setTimeout(() => {
              ("");
              // setBidAmount("");
            }, 1000);
          } else if (
            row?.event?.bidLock === "locked" &&
            row.currentBidAmount >= parseInt(bidAmount)
          ) {
            Swal.fire({
              title: "Bid amount should be greater than last bid",
              confirmButtonText: "OK",
              position: "top",
            });
          } else if (parseInt(bidAmount) % row.quoteIncreament !== 0) {
            Swal.fire({
              title: `Bid amount must be multiple of ${row.quoteIncreament}`,
              confirmButtonText: "OK",
              position: "top",
            });
          } else if (row.startPrice > parseInt(bidAmount)) {
            Swal.fire({
              title: "Bid amount should be greater than start price.",
              confirmButtonText: "OK",
              position: "top",
            });
          } else if (parseInt(bidAmount) > 2147483647) {
            Swal.fire({
              title: "Bid amount exceeded the limit.",
              confirmButtonText: "OK",
              position: "top",
            });
          } else {
            call(bidAmount, row.id);
            setTimeout(() => {
              // setBidAmount("");
            }, 1000);
          }
        }}
      >
        Bid Now
      </button>
    </div>
  );
};

export default withPrivateRoute(WatchList);
