import React from "react";
import { GetUserQuery, useGetUserQuery } from "@utils/graphql";

import { useEffect, useState } from "react";
import graphQLClient from "@utils/useGQLQuery";
import withPrivateRoute from "../../utils/withPrivateRoute";
import Welcome from "@components/common/Welcome";
import { useBidCreationSubscription } from "@utils/apollo";

const TopBar = React.memo(() => {
  const id = localStorage.getItem("id");
  const [accessToken, setAccessToken] = useState("");
  const [username, setUserName] = useState("");
  const [isReady, setIsReady] = useState(false); // New flag to enable query

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("name");
      setUserName(username);
      setAccessToken(token);
      setIsReady(true);
    }
  }, []);

  const client = React.useMemo(
    () => graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    [accessToken]
  );

  const result = useBidCreationSubscription();

  // console.log("BID SUBSCRIPTION ", result);

  const { data, refetch } = useGetUserQuery<GetUserQuery>(
    client,
    { where: { id } },
    {
      enabled: isReady, // Enable query only when `isReady` is true
      refetchOnWindowFocus: false,
      refetchInterval: false, // Do not refetch on window focus
      // refetchOnMount: false,            // Prevent refetch on component mount
      // staleTime: 1000 * 60 * 5,         // Cache the result for 5 minutes
    }
  );

  useEffect(() => {
    // Code in this section runs on mount
    console.log("Component mountedm in topbar");

    // Return a function to run when the component unmounts
    return () => {
      console.log("Component unmounted in topbar");
    };
  }, []); // Empty dependency array means this runs only once on mount and unmount

  
  useEffect(() => {
    if (result?.data) {
      refetch();
    }
  }, [result?.data]);


  return (
    <div className="bg-primary text-white font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 rounded flex items-center justify-between">
        <Welcome />

        <div className="flex flex-col justify-end ">
          <div className="text-right text-sm">
            <span className="font-normal "> Vehicle Buying Limit : </span>
            {data?.user?.vehicleBuyingLimit ?? "Nil"}
          </div>
          <div className="text-right text-sm ">
            <span className=" text-sm sm:text-base">
              <span className="font-normal max-sm:text-sm"> Username:</span>{" "}
              {username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

TopBar.displayName = "TopBar";
export default withPrivateRoute(TopBar);
