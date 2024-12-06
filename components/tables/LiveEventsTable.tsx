import React, { useEffect, useState, useMemo, useCallback } from "react";
import Datatable from "../ui/Datatable";
import Loader from "../ui/Loader";
import moment from "moment";
import {
  CalendarIcon,
  DocumentDownloadIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import AlertModal from "../ui/AlertModal";
import {
  useLiveEventsQuery,
  LiveEventsQuery,
  useGetUserQuery,
  GetUserQuery,
} from "@utils/graphql";
import { useEventsSubscriptionSubscription } from "@utils/apollo";
import graphQLClient from "@utils/useGQLQuery";
import Router from "next/router";
import Link from "next/link";
import DataTableUILoggedIn from "../ui/DataTableUILoggedIn";
import toast from "react-hot-toast";
import { OrderDirection } from "@utils/apollo";
import useFilterConfig from "@utils/filterComponent";
import FilterComponent from "@utils/filterValues";
const EventsTable = ({
  showHeadings,
  hideSearch,
  allowDownload,
  eventCategory = "online",
}) => {
  const [accessToken, setAccessToken] = useState("");
  const [id, setUserId] = useState("");
  const [registered, setRegistered] = useState(false);
  const [registeredStatus, setRegisteredStatus] = useState("");
  const [messageShown, setMessageShown] = useState({});
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterValues, setFilterValues] = useState({
    startDate: undefined,
    endDate: undefined,
    locationId: undefined,
    eventCategory: undefined,
    sellerId: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      setAccessToken(token);
      setUserId(id);
    }
  }, []);

  const client = React.useMemo(
    () => graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    [accessToken]
  );

  const handleFiltersChange = useCallback((name, value) => {
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    const newFilterValues = { ...filterValues };
    Object.keys(newFilterValues).forEach((key) => {
      newFilterValues[key] = undefined;
    });
    setFilterValues(newFilterValues);
  }, [filterValues]);
  const LiveEventSubscription = useEventsSubscriptionSubscription();

  const hasFilterValues = Object.values(filterValues).some(
    (value) => value !== undefined
  );

  const variables = useMemo(
    () => ({
      skip: 0,
      where: hasFilterValues ? filterValues : undefined, // Include filters only if they exist

      search: debouncedSearch,
      take: 10,
      orderBy: [
        {
          endDate: OrderDirection.Asc,
        },
      ],
    }),
    [debouncedSearch, hasFilterValues, filterValues]
  );

  const { data, isLoading, refetch, isFetching } =
    useLiveEventsQuery<LiveEventsQuery>(client, variables, {
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  useEffect(() => {
    if (LiveEventSubscription?.data) {
      refetch();
    }
  }, [LiveEventSubscription?.data, refetch]);

  const { data: userData, isLoading: loading } = useGetUserQuery<GetUserQuery>(
    client,
    { where: { id } },
    {
      enabled: !!accessToken && !!id,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const payment = userData ? userData["user"]?.payments : "";


  const handleBidNowClick = (eventId) => {
    if (!messageShown[eventId]) {
      // Show the message
      toast(
        "Your Access to this service has been disabled. Please contact Autobse for assistance",
        {
          duration: 5000,
          position: "top-right",
          style: {
            bottom: "80px",
            background: "rgb(95, 99, 93)",
            color: "white",
            border: "rounded",
            fontSize: "bold",
          },
          className: " bg-primary text-white ",

          // Custom Icon
          icon: " 🚫 ",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#0000",
            secondary: "#fff",
          },

          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        }
      );

      // Update the state to mark this event's message as shown
      setMessageShown((prevState) => ({
        ...prevState,
        [eventId]: true, // Mark this event's message as shown
      }));
    }
  };


  const PaymentStatus = () => {
    toast(
      "Your Access to this service has been disabled. Please contact Autobse for assistance",
      {
        duration: 5000,
        position: "top-right",
        style: {
          bottom: "80px",
          background: "rgb(95, 99, 93)",
          color: "white",
          border: "rounded",
          fontSize: "bold",
        },
        className: " bg-primary text-white ",

        // Custom Icon
        icon: " 🚫 ",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#0000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      }
    );
  };


  useEffect(() => {
    if (payment) {
      payment?.map((item) => {
        if (item.paymentFor === "registrations") {
          if (item.status === "approved") {
            setRegistered(true);
          } else {
            setRegisteredStatus(item.status);
          }
        } else {
        }
      });
    }
  }, [payment]);

  const columns = [
    {
      Header: " No",
      accessor: "eventNo",
    },
    {
      Header: "Event Date",
      accessor: "startDate",
      Cell: ({ cell: { value } }) => StartDate(value),
    },
    {
      Header: "Seller",
      accessor: "seller.name",
    },
    { Header: "Type", accessor: "eventCategory" },

    {
      Header: "Vehicle",
      accessor: "vehiclesCount",
      Cell: ({ cell: { value } }) => (value ? value : ""),
    },
    {
      Header: "Location",
      accessor: "location.name",
    },
    {
      Header: "Category",
      accessor: "vehicleCategory",
      Cell: ({ cell: { value } }) => RenderEventTypes(value),
    },
    {
      Header: "Closing Date",
      accessor: "firstVehicleEndDate",
      Cell: ({ cell: { value } }) => EndDate(value),
    },
    {
      Header: "Details",
      accessor: "id",
      Cell: ({ cell: { value } }) =>
        registered ? (
          View(value, eventCategory)
        ) : (
          <button
            className=" bg-primary-hover font-semibold border text-white py-1 w-full  px-2 rounded-md whitespace-nowrap"
            onClick={() => handleBidNowClick(value)}
          >
            BID NOW
          </button>
        ),

      // registeredStatus ? (
      //   `Registration Staus: ${registeredStatus}`
      // ) : (
      //   <span className="text-bold text-red-500 text-xs">
      //     Selected Auction has not been assigned to you. Please contact{" "}
      //     <span className="p-3">9962334455 </span> for more details
      //   </span>
      // ),
    },
    {
      Header: "Download",
      accessor: "downloadableFile_filename",
      Cell: ({ cell: { value } }) =>
        registered ? (
          <DownloadButton file={value} allowDownload={allowDownload} />
        ) : (
          value && (
            <DocumentDownloadIcon
              className="h-8 w-8 text-gray-600 hover:text-green-600"
              onClick={PaymentStatus}
            />
          )
        ),
    },
  ];

  return (
    <>
      <div className="relative bg-white   ">
        <FilterComponent
          setDebouncedSearch={setDebouncedSearch}
          handleResetFilters={handleResetFilters}
          filterValues={filterValues}
          handleFiltersChange={handleFiltersChange}
          placeholder="Search live events..."
        />

        <div className="mx-auto max-w-md text-center  sm:max-w-3xl lg:max-w-5xl mt-10">
          {showHeadings && (
            <div className="pt-8 pb-8">
              {data?.liveEvents?.length == 0 ? (
                <p className="mt-px text-3xl font-extrabold text-gray-900 tracking-tight sm:text-3xl animate-pulse">
                  No Live Events ...
                </p>
              ) : (
                <h2 className="mt-px text-3xl font-extrabold text-gray-900 tracking-tight sm:text-3xl ">
                  Live Events
                </h2>
              )}
            </div>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <>
                <div className="sm:hidden">
                  {/* {data?.liveEvents?.map((event, eventIdx) => {
                    return (
                      <MobielViewCard
                        key={eventIdx}
                        index1={eventIdx}
                        event={event}
                        allowDownload={allowDownload}
                        registered={registered}
                        registeredStatus={registeredStatus}
                        PaymentStatus={PaymentStatus}
                      />
                    );
                  })} */}

                  {data?.liveEvents === null ? (
                    <div className="sm:hidden w-full h-52 flex items-center justify-center">
                      <p className="text-center text-gray-500 font-medium text-xl mt-4">
                        We couldn't find any results for your search
                      </p>
                    </div>
                  ) : data?.liveEvents.length > 0 ? (
                    <div className="sm:hidden">
                      {data?.liveEvents?.map((event, eventIdx) => (
                        <MobielViewCard
                          key={eventIdx}
                          index1={eventIdx}
                          event={event}
                          allowDownload={allowDownload}
                          registered={registered}
                          registeredStatus={registeredStatus}
                          PaymentStatus={PaymentStatus}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="sm:hidden w-full h-52 flex items-center justify-center">
                      <p className="font-roboto font-semibold text-black animate-pulse sm:text-xl">
                        No completed events at this moment
                      </p>
                    </div>
                  )}
                </div>

                <div className="hidden sm:block">
                  {data?.liveEvents === null ? (
                    <div className="w-full h-52 flex items-center justify-center ">
                      <p className="text-center text-gray-500 font-medium text-xl mt-4">
                        We couldn't find any results for your search
                      </p>
                    </div>
                  ) : data?.liveEvents.length > 0 ? (
                    <Datatable
                      hideSearch={hideSearch}
                      tableData={data?.liveEvents}
                      tableColumns={columns}
                    />
                  ) : (
                    <div className="w-full h-52 flex items-center justify-center ">
                      <p className="font-roboto font-semibold text-black animate-pulse sm:text-xl">
                        No Live events at this moment
                      </p>
                    </div>
                  )}
                </div>
              </>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsTable;

EventsTable.defaultProps = {
  hideSearch: false,
  allowDownload: false,
};

function View(value, eventCategory) {
  return (
    <div>
      <Link
        href={`/${
          eventCategory === "open" ? "open-auctions" : "events"
        }/${value}?type=l`}
      >
        <a target="_blank">
          <div>
            <span className=" bg-primary-hover font-semibold border text-white py-1 w-full  px-2 rounded-md whitespace-nowrap">
              BID NOW{" "}
            </span>
          </div>
        </a>
      </Link>
    </div>
  );
}

function RenderEventTypes(eventTypes) {
  // console.log('eventTypes',eventTypes);

  // if (eventTypes && eventTypes.length > 0) {
  //   return (
  //     <div>
  //       {eventTypes.map((type, index) => {
  //         return (
  //           <div key={`d${index}`}>
  //             <span>{type.name}</span>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // } else {
  //   return <div />;
  // }
  if (eventTypes) {
    return <div>{eventTypes?.name}</div>;
  } else {
    return <div />;
  }
}

function StartDate(value) {
  return (
    <div>
      <div className="flex space-x-2">
        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
        <div className="space-y-1 font-medium">
          <div className="text-sm text-gray-900 whitespace-nowrap">
            <span>{moment(value).format("MMMM Do, YYYY")}</span>
          </div>
          <div className="text-xs text-gray-500 bg-gray-200 rounded">
            <span className="text-left">
              {moment(value).format("ddd h:mm a")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EndDate(value) {
  return (
    <div>
      <div className="flex space-x-2">
        <div className="space-y-1 font-medium">
          <div className="text-sm text-gray-900 whitespace-nowrap">
            <span>{moment(value).format("MMMM Do, YYYY")}</span>
          </div>
          <div className="text-xs text-gray-500 bg-gray-200 rounded">
            <span className="text-left">
              {moment(value).format("ddd h:mm a")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadButton({ file, allowDownload }) {
  // console.log("file", file);

  const [showAlert, setShowAlert] = useState(false);

  const showAlertModal = () => {
    setShowAlert(true);
  };

  const redirectToLoginPage = () => {
    setShowAlert(false);
    Router.push("/login");
  };

  return (
    <>
      {allowDownload ? (
        <>
          {file && (
            <a href={`${file}`} rel="noopener noreferrer" target="_blank">
              <DocumentDownloadIcon className="h-8 w-8 text-gray-600 hover:text-green-600" />
            </a>
          )}
        </>
      ) : (
        <>
          <button onClick={() => showAlertModal()}>
            <DocumentDownloadIcon className="h-8 w-8 text-gray-600 hover:text-green-600" />
          </button>
        </>
      )}

      {showAlert && (
        <AlertModal
          title="Authentication Required!"
          description="Please login or register to download the file."
          handleClick={redirectToLoginPage}
          open={showAlert}
          close={() => setShowAlert(false)}
          buttonLabel="Login"
        />
      )}
    </>
  );
}

EventsTable.defaultProps = {
  showHeadings: true,
};

function MobielViewCard({
  index1,
  event,
  allowDownload,
  registered,
  registeredStatus,
  PaymentStatus,
}) {
  const [showAlert, setShowAlert] = useState(false);

  const showAlertModal = () => {
    setShowAlert(true);
  };

  const redirectToLoginPage = () => {
    setShowAlert(false);
    Router.push("/login");
  };

  return (
    <>
      <div className="w-full">
        <DataTableUILoggedIn
          index1={index1}
          event={event}
          allowDownload={allowDownload}
          registered={registered}
          registeredStatus={registeredStatus}
          PaymentStatus={PaymentStatus}
        />
      </div>

      {showAlert && (
        <AlertModal
          title="Authentication Required!"
          description="Please login or register to download the file."
          handleClick={redirectToLoginPage}
          open={showAlert}
          close={() => setShowAlert(false)}
          buttonLabel="Login"
        />
      )}
    </>
  );
}
