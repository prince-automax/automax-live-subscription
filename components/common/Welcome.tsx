import React, { useState, useEffect, useMemo } from "react";
import { useTimeQueryQuery, TimeQueryQueryVariables } from "@utils/graphql";
import graphQLClient from "@utils/useGQLQuery";
import moment from "moment";

const Welcome = React.memo(() => {
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);
  const [serverTime, setServerTime] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(localStorage.getItem("name") || "");
      setAccessToken(localStorage.getItem("token") || "");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTick((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCurrentTime(moment());
  }, [tick]);

  const client = useMemo(() => graphQLClient({ Authorization: `Bearer ${accessToken}` }), [accessToken]);

  // const { data } = useTimeQueryQuery<TimeQueryQueryVariables>(
  //   client,
  //   {},
  //   {
  //     enabled: isReady,
  //     refetchOnWindowFocus: false,
  //     refetchInterval: false,
  //     refetchOnMount: false,
  //   }
  // );

  // useEffect(() => {
  //   if (data?.time) {
  //     setTick(0);
  //     setServerTime(data.time);
  //   }
  // }, [data]);

  return (
    <div className="flex flex-col space-y-1 sm:space-y-0">
      <p className="text-sm sm:text-base">
        <span className="font-normal">Welcome</span> {name}!
      </p>
      <div className="text-xs">
        <p className="text-sm sm:text-base">
          {currentTime.format("MMMM Do, YYYY, h:mm:ss a")}
        </p>
        {/* <p>
          {serverTime
            ? moment(serverTime).add(tick, "seconds").format("MMMM Do, YYYY")
            : "-"}
        </p>
        <p className="hidden md:block">
          {serverTime
            ? moment(serverTime).add(tick, "seconds").format("h:mm:ss a")
            : "-"}
        </p> */}
      </div>
    </div>
  );
});

Welcome.displayName = "Welcome";

export default Welcome;
