import React, { useState, useMemo, useEffect, useCallback } from "react";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import withPrivateRoute from "../utils/withPrivateRoute";
import Datatable from "../components/ui/Datatable";
import Loader from "../components/ui/Loader";
import { useUserPaymentsQuery, UserPaymentsQuery } from "../utils/graphql";
import graphQLClient from "@utils/useGQLQuery";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import fallback from "../public/noImage.jpeg";
import { OrderDirection } from "@utils/apollo";
const AllUserPayments = () => {
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      setUserId(userId);
      setAccessToken(token);
      setIsReady(true);
    }
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const client = React.useMemo(
    () => graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    [accessToken]
  );

  const variable = {
    search: debouncedSearch,
    orderBy: [
      {
        createdAt: OrderDirection.Desc,
      },
    ],
  };

  const { data, isLoading, refetch } = useUserPaymentsQuery<UserPaymentsQuery>(
    client,
    variable,
    {
      enabled: isReady, // Enable query only when `isReady` is true
      refetchOnWindowFocus: false,
      refetchInterval: false, // Do not refetch on window focus
      refetchOnMount: false, // Prevent refetch on component mount
      // staleTime: 1000 * 60 * 5,         // Cache the result for 5 minutes
    }
  );

  console.log("data", data);

  const columns = [
    {
      Header: "Payment For",
      accessor: "paymentFor",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Payment Date",
      accessor: "createdAt",
      Cell: ({ cell: { value } }) => CreatedAt(value),
    },
    { Header: "Status", accessor: "status" },

    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Image",
      accessor: "image", // Field from tableData
      Cell: ({ value }) => ImageComponent(value),
    },
  ];

  console.log("data", data);

  return (
    <DashboardTemplate heading="All Payments">
      <div>
        <div className="flex justify-between mt-9">
          <div className="relative rounded-md shadow-sm max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              placeholder="Search Payments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-600 rounded-md"
            />
          </div>
          <div className="mt- flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <Link href="/createPayment">
              <a
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md  text-white bg-blue-600 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                Make Payment
              </a>
            </Link>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.payments && data?.payments?.length > 0 ? (
              <Datatable
                tableData={data?.payments}
                tableColumns={columns}
                hideSearch
              />
            ) : (
              <div className=" ">No Data found</div>
            )}
          </>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default withPrivateRoute(AllUserPayments);

function CreatedAt(value) {
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

// function ImageComponent( value) {
//   console.log('value',value);

//   return (
//     <div className="relative w-full h-full">
//       <Image
//         src={value}
//         alt={ "Image"}
//         width={ 900} // Default width is 300px
//         height={ 900} // Default height is 200px
//         className=""
//         layout="responsive" // Makes the image responsive
//       />
//     </div>
//   );
// }

function ImageComponent(src) {
  console.log("src", src);

  const [isZoomed, setIsZoomed] = useState(false);

  // Toggle zoom state
  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <>
      {/* Normal Image */}
      <div
        className="relative w-full h-full cursor-pointer mx-auto"
        onClick={toggleZoom}
      >
        {src ? (
          // <Image
          //   src={src}
          //   alt="Image"
          //   width={500}
          //   height={500}
          //   className="rounded-lg border border-gray-300"
          //   layout="responsive"
          // />
          <button className=" bg-primary-hover uppercase font-semibold border text-white py-1 w-full  px-2 rounded-md whitespace-nowrap">View Receipt</button>
        ) : (
          // <p>Not Available</p>
          <Image
            src={fallback}
            alt="Fallback Image"
            width={80}
            height={50}
            priority={true}
            className="rounded-lg border border-gray-300"
            layout="responsive"
          />
        )}
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 overflow-hidden"
          onClick={toggleZoom}
        >
          {/* Close Button */}

          <div className="relative max-w-3xl w-full h-[600px] bg-white p-6 rounded-lg overflow-hidden">
            <button
              className="absolute top-1 right-5 text-red text-3xl font-bold hover:text-red-500"
              onClick={toggleZoom}
            >
              ×
            </button>
            <div className="flex justify-center">
              {src ? (
                <Image
                  src="https://autobseimagesandexcel-dev.S3.ap-south-1.amazonaws.com/06d213ad-1b31-4131-ba56-50ab5b0b72b4"
                  alt="Zoomed Image"
                  width={600}
                  height={550}
                  priority={true} // Preload this critical image
                  className="rounded-lg object-contain max-w-full max-h-full"
                />
              ) : (
                <Image
                  src={fallback}
                  alt="Fallback Image"
                  width={600}
                  height={500}
                  className="rounded-lg object-contain max-w-full max-h-full"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
