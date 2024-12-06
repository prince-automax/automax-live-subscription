// import {
//   useGetLocationsQuery,
//   GetLocationsQueryVariables,
//   useGetSellersQuery,
//   GetSellersQueryVariables,
// } from "@utils/graphql";
// import React, { useEffect, useState, useMemo, useRef } from "react";
// import graphQLClient from "@utils/useGQLQuery";
// interface Location {
//   name: string;
//   id: string;
// }

// interface LocationData {
//   locations: Location[];
// }

// interface Seller{
//   name:string;
//   id:string;

// }
// interface SellerData{
//   Sellers:Seller
// }

// export const useFetchLocations = () => {
//   const [accessToken, setAccessToken] = useState("");
//   const [id, setUserId] = useState("");
//   const client = React.useMemo(
//     () => graphQLClient({ Authorization: `Bearer ${accessToken}` }),
//     [accessToken]
//   );

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       const id = localStorage.getItem("id");
//       setAccessToken(token);
//       setUserId(id);
//     }
//   }, []);

//   const { data, isLoading, isFetching, refetch } = useGetLocationsQuery(
//     client,
//     {},
//     { enabled: !!accessToken,
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//      }
//   );

//   console.log("data on locations", data);
//   const locations: Location[] = data?.locations || [];

//   return { data: locations, isLoading, isFetching, refetch };
// };

// export const useFetchSellers = () => {
//   const [accessToken, setAccessToken] = useState("");

//   // Memoize the GraphQL client with the access token
//   const client = useMemo(
//     () => graphQLClient({ Authorization: `Bearer ${accessToken}` }),
//     [accessToken]
//   );

//   // Fetch the token from localStorage on mount
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       if (token) setAccessToken(token);
//     }
//   }, []);

//   // Use the query hook to fetch locations
//   const { data, isLoading, isFetching, refetch } =
//     useGetSellersQuery<GetSellersQueryVariables>(
//       client,
//       {},
//       {
//         enabled: !!accessToken,
//         refetchOnWindowFocus: false,
//       refetchOnMount: false, // Only fetch if accessToken is available
//       }
//     );

//     const Sellers:Seller[]=data?.sellers || []


//   return { data :Sellers, isLoading, isFetching, refetch };
// };


import React from 'react'
import Search from "@utils/searchComponent";
import useFilterConfig from "@utils/filterComponent";
import CustomFilter from "@utils/filter";
import SearchComponent from '@utils/searchComponent';


const FilterComponent = ({setDebouncedSearch,handleResetFilters,filterValues,handleFiltersChange}) => {
  const configuration = useFilterConfig();

  console.log("789", configuration);
  return (
   <div className=''>
   <SearchComponent setDebouncedSearch={setDebouncedSearch}  handleResetFilters={handleResetFilters}/>
      

        <div className="grid grid-cols-3 gap-4   mt-8">
          {configuration.map((filter) => (
            <div key={filter.name} className="w-full">
              <CustomFilter
                filters={[filter]}
                values={filterValues}
                onChange={handleFiltersChange}
              />
            </div>
          ))}
        </div>
   </div>
  )
}

export default FilterComponent