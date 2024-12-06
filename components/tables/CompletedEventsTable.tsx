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
  useCompletedEventsQuery,
  CompletedEventsQuery,
  useGetUserQuery,
  GetUserQueryVariables,
} from "@utils/graphql";
import graphQLClient from "@utils/useGQLQuery";
import Router from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
import FilterComponent from "@utils/filterValues";

export default function EventsTable({
  showHeadings,
  hideSearch,
  allowDownload,
  eventCategory = "compeleted",
}) {
  const [accessToken, setAccessToken] = useState("");
  const [registered, setRegistered] = useState(false);
  const [registeredStatus, setRegisteredStatus] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterValues, setFilterValues] = useState({
    startDate: undefined,
    endDate: undefined,
    locationId: undefined,
    eventCategory: undefined,
    sellerId: undefined,
  });
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setAccessToken(token);
    }
  }, []);

  const hasFilterValues = Object.values(filterValues).some(
    (value) => value !== undefined
  );

  const variables = {
    where: hasFilterValues ? filterValues : undefined, // Include filters only if they exist
    skip: 0,
    take: 10,
    search: debouncedSearch,
    
  };

  const { data, isLoading } = useCompletedEventsQuery<CompletedEventsQuery>(
    graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    variables
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
  }, [filterValues]); // Add `filterValues` as a dependency because the function depends on it.


  console.log("daata", data);

  const { data: userData, isLoading: loading } =
    useGetUserQuery<GetUserQueryVariables>(
      graphQLClient({ Authorization: `Bearer ${accessToken}` }),
      { where: { id } },
      {
        enabled: accessToken !== "",
      }
    );

  const payment = userData ? userData["user"]?.payments : "";

  console.log("payments of user", payment);

  useEffect(() => {
    if (payment) {
      payment?.map((item) => {
        if (item.paymentFor === "registrations") {
          if (item.status === "approved") {
            setRegistered(true);
          } else {
            item.status;
          }
        } else {
        }
      });
    }
  }, [payment]);

  console.log("regs", registered);

  // console.log("registered", registered);
  // console.log("setRegisteredStatus", registeredStatus);

  const PaymentStatus = () => {
    toast(
      "Your Access to this service has been disabled. Please contact Autobse for assistance",
      {
        duration: 5000,
        position: "top-right",

        // Styling
        // Styling
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

  const columns = [
    {
      Header: " No",
      accessor: "eventNo",
      // Cell: ({ cell: { value } }) => StartDate(value),
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
    // {
    //   Header: "Details",
    //   accessor: "id",
    //   Cell: ({ cell: { value } }) =>
    //     registered ? (
    //       View(value, eventCategory)
    //     ) : (
    //       <button
    //         className=" bg-primary-hover font-semibold border text-white py-1 w-full  px-2 rounded-md whitespace-nowrap"
    //         onClick={() => handleBidNowClick(value)}
    //       >
    //         BID NOW
    //       </button>
    //     ),

    //   // registeredStatus ? (
    //   //   `Registration Staus: ${registeredStatus}`
    //   // ) : (
    //   //   <span className="text-bold text-red-500 text-xs">
    //   //     Selected Auction has not been assigned to you. Please contact{" "}
    //   //     <span className="p-3">9962334455 </span> for more details
    //   //   </span>
    //   // ),
    // },
    {
      Header: "Download",
      accessor: "downloadableFile_filename",
      Cell: ({ cell: { value } }) =>
        registered ? (
          <DownloadButton file={value} allowDownload={true} />
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
      <div className="relative bg-white space-y-10">
      <FilterComponent
          setDebouncedSearch={setDebouncedSearch}
          handleResetFilters={handleResetFilters}
          filterValues={filterValues}
          handleFiltersChange={handleFiltersChange}
        /> 
        <div className="mx-auto max-w-md text-center  sm:max-w-3xl lg:max-w-7xl ">
          {showHeadings && (
            <div className="pt-16 pb-8">
              <h2 className="text-base font-semibold tracking-wider text-primary uppercase">
                Events
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Most recent events
              </p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                Open auction or closed auction!! Know your deal better with list
                of locations, type of auction, date and many more features, An
                updates on our most recent events.
              </p>
            </div>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* {data?.completedEvents && data?.completedEvents?.length > 0 && ( */}
              <>
                {data?.completedEvents === null ? (
                  <div className="sm:hidden w-full h-72 flex items-center justify-center">
                    <p className="text-center text-gray-500 font-medium text-xl mt-4">
                      We couldn't find any results for your search
                    </p>
                  </div>
                ) : data?.completedEvents.length > 0 ? (
                  <div className="sm:hidden">
                    {data?.completedEvents?.map((event, eventIdx) => (
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
                  <div className="sm:hidden w-full h-72 flex items-center justify-center">
                    <p className="font-roboto font-semibold text-black animate-pulse sm:text-xl">
                      No completed events at this moment
                    </p>
                  </div>
                )}

                <div className="hidden sm:block">
                  {data?.completedEvents === null ? (
                    <div className="w-full h-72 flex items-center justify-center ">
                      <p className="text-center text-gray-500 font-medium text-xl mt-4">
                        We couldn't find any results for your search
                      </p>
                    </div>
                  ) : data?.completedEvents.length > 0 ? (
                    <Datatable
                      hideSearch={hideSearch}
                      tableData={data?.completedEvents}
                      tableColumns={columns}
                    />
                  ) : (
                    <div className="w-full h-72 flex items-center justify-center ">
                      <p className="font-roboto font-semibold text-black animate-pulse sm:text-xl">
                        No completed events at this moment
                      </p>
                    </div>
                  )}
                </div>
              </>
              {/* // )} */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

EventsTable.defaultProps = {
  hideSearch: false,
  allowDownload: false,
};

function View(value) {
  return (
    <div>
      <Link href={`/events/${value}?type=c`}>
        <a target="_blank">
          <span className="border px-4 rounded-md bg-red-600 font-poppins text-white py-1">
            View
          </span>
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
      <div className="">
        <div className=" w-full  flex justify-center items-center mt-4 ">
          <div className="grid grid-cols-1 gap-1 w-96 border-2 border-[#536DD9] p-4 rounded-lg  space-y-1  ">
            {/*  */}
            <div className="grid grid-cols-3 gap-1 space-x-2">
              <p className="flex justify-between text-sm ">
                Event <span>:</span>
              </p>

              <p className="col-span-2 text-sm flex">{event?.seller?.name}</p>
            </div>
            <div className="grid grid-cols-3 gap-1 space-x-2 ">
              <p className="flex justify-between text-sm  ">
                Location <span>:</span>
              </p>

              <p className="col-span-2 text-sm  flex">
                {" "}
                {event?.location?.name}, {event?.location?.state?.name}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-1 space-x-2 ">
              <p className="flex justify-between text-sm">
                Start Time <span>:</span>
              </p>

              <p className="col-span-2 text-sm flex   justify-start ">
                {" "}
                {moment(event.startDate).format(" Do-MMMM-YYYY")}{" "}
                {moment(event.startDate).format(" ")}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-1 space-x-2">
              <p className="flex justify-between text-sm">
                Close Time <span>:</span>
              </p>

              <p className="col-span-2  text-sm flex">
                {" "}
                {moment(event.endDate).format(" Do-MMMM-YYYY")}{" "}
                {moment(event.endDate).format(" ")}
              </p>
            </div>
            <hr className="to-black shadow-2xl" />
            <div className="mt-3">
              {registered ? (
                <div>
                  <a
                    href={`/events/${event.id}?type=c`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="border px-4 rounded-md bg-red-600 font-poppins text-white py-1">
                      View
                    </span>
                  </a>
                </div>
              ) : (
                <button
                  className=" bg-primary-hover font-semibold border text-white py-1  px-6 rounded-lg"
                  onClick={PaymentStatus}
                >
                  View
                </button>
              )}
            </div>
          </div>
        </div>
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
