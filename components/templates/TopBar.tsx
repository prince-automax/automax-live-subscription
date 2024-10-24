import React from "react";
import { GetUserQuery, useGetUserQuery } from "@utils/graphql";

import { useEffect, useState } from "react";
import graphQLClient from "@utils/useGQLQuery";
import withPrivateRoute from "../../utils/withPrivateRoute";
import Welcome from "@components/common/Welcome";
import {useBidCreationSubscription} from "@utils/apollo"

function TopBar() {
  const id = localStorage.getItem("id");
  const [accessToken, setAccessToken] = useState("");
  const [username, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setAccessToken(token);
    }
  }, []);

  // console.log("id from local storeage",id);
  // console.log("access token  from local storeage",accessToken);
  const result = useBidCreationSubscription()


  const { data,refetch } = useGetUserQuery<GetUserQuery>(
    graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    { where: { id } },
    {
      enabled: accessToken !== "",
    }
  );

  // console.log('data',data);
  

useEffect(()=>{
refetch()
},[result?.data])  


  useEffect(() => {
    const username = localStorage.getItem("username");
    setUserName(username);
  }, [data]);

  // console.log("#999",username);
  

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
              <span className="font-normal max-sm:text-sm"> Username:</span> {username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withPrivateRoute(TopBar);
