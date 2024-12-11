import React, { useState, useMemo, useEffect, useCallback } from "react";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import withPrivateRoute from "../utils/withPrivateRoute";
import Datatable from "../components/ui/Datatable";
import Loader from "../components/ui/Loader";
import {
  useUpdateUserMutation,
  UpdateUserMutationVariables,
  useTimeQueryQuery,
  TimeQueryQueryVariables,
  OrderDirection,
  useMyQuotesQuery,
  MyQuotesQuery,
  useUpdateBidMutation,
  UpdateBidMutationVariables,
} from "@utils/graphql";
import graphQLClient from "@utils/useGQLQuery";
import moment from "moment";
import {
  useVehicleUpdateSubscription,
  VehicleUpdateSubscriptionVariables,
  useBidCreationSubscription,
  useUserUpdateSubscriptionSubscription,
} from "@utils/apollo";
import Swal from "sweetalert2";

const MyQuotes = () => {
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [apiInterval, setAPIInterval] = useState(60000);
  const [tick, setTick] = useState(0);
  const [serverTime, setserverTime] = useState();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timerR = setInterval(() => {
      setTick((tic) => tic + 1);
    }, 1000);
    return () => clearInterval(timerR);
  }, []);
  const client = React.useMemo(
    () => graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    [accessToken]
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      setAccessToken(token);
      setUserId(id);
    }
  }, []);

  const { data: timeData } = useTimeQueryQuery<TimeQueryQueryVariables>(
    client,
    {},
    {
      enabled: !!accessToken, // Enable query only when `isReady` is true
      refetchOnWindowFocus: false,
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

  const { data, isLoading, refetch } = useMyQuotesQuery<MyQuotesQuery>(
    client,
    {
      where: {
        userVehicleBids: {
          userId: userId,
        },
        bidTimeExpire: {
          lt: serverTime,
        },
      },
      orderBy: [
        {
          createdAt: OrderDirection.Desc,
        },
      ],
      vehiclesOrderBy: [
        {
          updatedAt: OrderDirection.Desc,
        },
      ],
    },
    {
      enabled: !!accessToken && !!userId && !!serverTime, // Enable query only when `isReady` is true
      refetchOnWindowFocus: false,
      refetchInterval: false, // Do not refetch on window focus
      refetchOnMount: false, // Prevent refetch on component mount
      // staleTime: 1000 * 60 * 5,         // Cache the result for 5 minutes
    }
  );

  useEffect(() => {
    if (enabled) {
      console.log("REFETCH CALLED");

      refetch();
      setEnabled(false)
    }
  }, [enabled, refetch]);

  console.log('enabled', enabled);
  

  // console.log("data on my quotes", data);

  const callUpdateBidPrice =
    useUpdateBidMutation<UpdateBidMutationVariables>(client);

  useEffect(() => {
    if (data?.vehicles) {
      // setAPIInterval(0);
      // setEnabled(false);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: "Auction Id",
        Cell: ({ row }) => (
          <div>
            <span>{row?.original?.event?.eventNo}</span>
          </div>
        ),
      },
      {
        Header: "Auction Details",
        accessor: "auctionDetails",
        Cell: ({ row }) => <AuctionDetails row={row?.original?.event} />,
      },
      {
        Header: "Vehicle Details",
        accessor: "vehicleDetails",
        Cell: ({ row }) => <VehicleDetails row={row?.original} />,
      },
      {
        Header: "Win Details",
        Cell: ({ row }) => <WinDetails row={row?.original} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <DashboardTemplate heading="My Quotes">
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.vehicles?.vehicles &&
            data?.vehicles?.vehicles?.length > 0 ? (
              <Datatable
                tableData={data?.vehicles?.vehicles}
                tableColumns={columns}
                hideSearch
              />
            ) : (
              <div>No Quotes found</div>
            )}
          </>
        )}
      </div>
    </DashboardTemplate>
  );

  function AuctionDetails({ row }) {
    return (
      <div className="whitespace-nowrap sm:divide-y sm:divide-gray-200">
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Auction Type
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            <span style={{ color: "green", fontSize: 14 }}>
              {row?.eventCategory}
            </span>
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Seller Name
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.seller?.name}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Event ID
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.eventNo}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Category
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.vehicleCategory?.name}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Location
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.location?.state?.name}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Start Date
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.startDate
              ? moment(row?.startDate).format("MMMM Do, YYYY ddd h:mm a")
              : ""}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            End Date
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.startDate
              ? moment(row?.endDate).format("MMMM Do, YYYY ddd h:mm a")
              : ""}
          </dd>
        </div>
      </div>
    );
  }

  function VehicleDetails({ row }) {
    return (
      <div className="whitespace-nowrap  sm:divide-y sm:divide-gray-200">
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Make
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.make ?? "-"}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Model
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.model ?? "-"}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Variant
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.varient ?? "-"}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Kms Run
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.kmReading ?? "-"}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Reg No
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.registrationNumber ?? "-"}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Engine No
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.engineNo ?? "-"}
          </dd>
        </div>
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Chassis No
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-2">
            {row?.chassisNo ?? "-"}
          </dd>
        </div>
      </div>
    );
  }

  async function CallUpdatePrice(vehicleId, amount, setUpdatePrice,setAmount) {
    // console.log("888",vehicleId, amount, setUpdatePrice);

    const confirmed = await Swal.fire({
      text: `Are you sure to bid for Rs. ${amount}?`,
      title: "BID CONFIRMATION",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, bid for it!",
      customClass: { popup: "animated bounceInDown" },
      didOpen: () => {
        const swalContainer = Swal.getContainer();
        swalContainer.style.position = "fixed";
        swalContainer.style.top = "0";
        swalContainer.style.left = "0";
        swalContainer.style.width = "100vw";
        swalContainer.style.height = "100vh";
        swalContainer.style.background = "rgba(0, 0, 0, 0.5)";
        swalContainer.style.backdropFilter = "blur(0.5px)";
        swalContainer.style.zIndex = "1050";
      },
    });

    if (confirmed.isConfirmed) {
      try {
        const result = await callUpdateBidPrice.mutateAsync({
          updateBidInput: {
            amount: parseInt(amount), // Matches the schema and type
          },
          where: {
            id: vehicleId,
          },
        });
        if (result?.updateBid?.id) {
          setAmount("")
          setEnabled(true);
        }
        console.log("bid result", result);
        // refetch()
        Swal.fire("Success!", "Your bid has been submitted.", "success");
      } catch (error) {
        console.log("error", error);

        Swal.fire(error);
      }
    }

    setUpdatePrice(false);
  }

  function WinDetails({ row }) {
    // console.log("row", row);

    const [amount, setAmount] = useState("");
    const [updatePrice, setUpdatePrice] = useState(false);
    return (
      <div className="whitespace-nowrap space-y-4 flex flex-col items-start">
        <div>
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            {row &&
            row?.userVehicleBids[0] &&
            row?.userVehicleBids[0]?.bidVehicle?.currentBidUser ? (
              <span style={{ color: "green" }}>Won</span>
            ) : (
              <span style={{ color: "red" }}>Lost</span>
            )}
          </dt>
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            <span>Amount</span>
          </dt>
          <dd className="whitespace-nowrap mt-1 text-lg font-semibold text-gray-900">
            Rs. {row?.userVehicleBids[0]?.amount?.toLocaleString("en-IN")}
          </dd>
        </div>
        <div>
          {!updatePrice ? (
            row?.bidStatus == "pending" &&
            row?.userVehicleBids[0]?.bidVehicle?.currentBidUser && (
              <button
                type="button"
                onClick={() => setUpdatePrice(true)}
                className="text-xs text-indigo-700 underline"
              >
                {row?.bidAmountUpdate > 0
                  ? `Update price( Current Amount:
                ${row?.bidAmountUpdate})`
                  : `Update price`}
              </button>
            )
          ) : (
            <>
              <div className="w-40 border border-blue-700 rounded p-4">
                <label
                  htmlFor="text"
                  className="block text-xs font-medium text-gray-700"
                >
                  New amount
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="text"
                    id="text"
                    onChange={(e) => {
                      setAmount(e.target.value.replace(/\D/g, ""));
                    }}
                    value={amount}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    CallUpdatePrice(
                      row?.userVehicleBids[0]?.id,
                      amount,
                      setUpdatePrice,
                      setAmount
                    );
                  }}
                  className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setUpdatePrice(false)}
                  className="px-2 text-xs text-indigo-700 underline"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
        <div>
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            {row && row?.currentBidUser && row?.currentBidUser.id
              ? "Winning Date"
              : "Bidding Date"}
          </dt>
          <dd className="whitespace-nowrap mt-1 text-xs text-gray-900">
            {row?.bidTimeExpire
              ? moment(row?.bidTimeExpire).format("MMMM Do, YYYY ddd h:mm a")
              : ""}
          </dd>
        </div>
        <div>
          <dt className="whitespace-nowrap text-xs font-medium text-gray-500">
            Status
          </dt>
          <dd
            className={
              row?.bidStatus == "pending"
                ? "whitespace-nowrap mt-1 text-xs text-yellow-500"
                : row?.bidStatus == "approved"
                ? "whitespace-nowrap mt-1 text-xs text-blue-500"
                : row?.bidStatus == "fulfilled"
                ? "whitespace-nowrap mt-1 text-xs text-green-500"
                : row?.bidStatus == "declined"
                ? "whitespace-nowrap mt-1 text-xs text-red-500"
                : "whitespace-nowrap mt-1 text-xs text-gray-500"
            }
          >
            {row?.bidStatus?.toUpperCase()}
          </dd>
        </div>
        {row?.bidStatus == "fulfilled" && (
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
          >
            Print Documents
          </button>
        )}
      </div>
    );
  }
};

export default withPrivateRoute(MyQuotes);
