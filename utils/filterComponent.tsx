import {
  useGetLocationsQuery,
  GetLocationsQueryVariables,
  useGetSellersQuery,
  GetSellersQueryVariables,
} from "@utils/graphql";
import React, { useEffect, useState, useMemo, useRef } from "react";
import graphQLClient from "@utils/useGQLQuery";
interface Location {
  name: string;
  id: string;
}

interface LocationData {
  locations: Location[];
}

interface Seller {
  name: string;
  id: string;
}
interface SellerData {
  Sellers: Seller;
}

const useFilterConfig = () => {
  const [accessToken, setAccessToken] = useState("");
  const [id, setUserId] = useState("");
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

  const {
    data: locationData,
    isLoading: locationLoading,
    isFetching: isLocationFetching,
    refetch: locationFetch,
  } = useGetLocationsQuery(
    client,
    {},
    {
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const { data, isLoading, isFetching, refetch } =
    useGetSellersQuery<GetSellersQueryVariables>(
      client,
      {},
      {
        enabled: !!accessToken,
        refetchOnWindowFocus: false,
        refetchOnMount: false, // Only fetch if accessToken is available
      }
    );

  const Sellers: Seller[] = data?.sellers || [];

  console.log("data on locations", data);
  const locations: Location[] = locationData?.locations || [];

  
  const filterConfig = useMemo(
    () => [
      { type: "date", label: "Start Date", name: "startDate" },
      { type: "date", label: "End Date", name: "endDate" },
      {
        type: "select",
        label: "Event Category",
        name: "eventCategory",
        options: [
          { value: "open", label: "Open" },
          { value: "online", label: "Online" },
        ],
      },
      {
        type: "select",
        label: "Locations",
        name: "locationId",
        options:
          locations?.map((loc) => ({ value: loc.id, label: loc.name })) ||
          [],
      },
      {
        type: "select",
        label: "Sellers",
        name: "sellerId",
        options:
        Sellers?.map((seller) => ({
            value: seller.id,
            label: seller.name,
          })) || [],
      },
    ],
    [locations, Sellers]
  );
  return filterConfig;

};

export default useFilterConfig;
