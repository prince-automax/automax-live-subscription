import DashboardTemplate from "../components/templates/DashboardTemplate";
import withPrivateRoute from "../utils/withPrivateRoute";

import { PaperClipIcon, PencilAltIcon } from "@heroicons/react/outline";
import { GetUserQueryVariables, useGetUserQuery } from "@utils/graphql";
import { useEffect, useState } from "react";
import graphQLClient from "@utils/useGQLQuery";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

function ProfilePage() {
  const id = localStorage.getItem("id");

  const [accessToken, setAccessToken] = useState("");

  const [profile, setProfile] = useState({
    name: "-",
    memberSince: "-",
    fields: {
      "First Name": "-",
      "Last Name": "-",
      Mobile: "-",
      Email: "-",
      "Id Proof Number": "-",
      "Pan Number": "-",
      City: "-",
      State: "-",
      Country: "-",
    },
    pancard_image: null,
    aadharcard_front_image: null,
    aadharcard_back_image: null,
    driving_license_back_image: null,
    driving_license_front_image: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setAccessToken(token);
    }
  }, []);
  const { data, isLoading } = useGetUserQuery<GetUserQueryVariables>(
    graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    { where: { id } },
    {
      enabled: accessToken !== "",
    }
  );

  console.log("data of user007", data);

  useEffect(() => {
    if (!isLoading && data && data["user"]) {
      const user = data["user"];
      setProfile({
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
        memberSince: user.createdAt
          ? moment(user.createdAt).format("MMMM Do, YYYY")
          : "-",
        fields: {
          "First Name":
            user.firstName && user.firstName != "" ? user.firstName : "-",
          "Last Name":
            (user.lastName && user.lastName) != "" ? user.lastName : "-",
          Mobile: (user.mobile && user.mobile) != "" ? user.mobile : "-",
          Email: (user.email && user.email) != "" ? user.email : "-",
          "Id Proof Number":
            (user.idProofNo && user.idProofNo) != "" ? user.idProofNo : "-",
          "Pan Number":
            (user.pancardNo && user.pancardNo) != "" ? user.pancardNo : "-",
          City: (user.city && user.city) != "" ? user.city : "-",
          State: (user.state && user.state) != "" ? user.state : "-",
          Country: (user.country && user.country) != "" ? user.country : "-",
        },
        pancard_image: user.pancard_image ?? null,
        aadharcard_front_image: user.aadharcard_front_image ?? null,
        aadharcard_back_image: user.aadharcard_back_image ?? null,
        driving_license_front_image: user.driving_license_front_image ?? null,
        driving_license_back_image: user.driving_license_back_image ?? null,
      });
    }
  }, [data, isLoading]);

  return (
    <DashboardTemplate>
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between md:space-x-5">
        <div className="flex items-start space-x-5">
          <div className="pt-1.5 px-2">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Profile Page
            </span>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              {profile.name}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Member since{" "}
              <time dateTime="2020-08-25">
                {data && data["user"] && data["user"].createdAt
                  ? moment(data["user"].createdAt).format("MMMM Do, YYYY")
                  : "-"}
              </time>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <Link href="/edit-user-profiles">
            <a
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            >
              <PencilAltIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Update Profile
            </a>
          </Link>
        </div>
      </div>

      {/* profile */}
      <div className="mt-8 bg-gray-100 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            My profile details
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {Object.keys(profile.fields).map((field) => (
                <div key={field} className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{field}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {profile.fields[field]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* <div className="mt-8">
            <dt className="text-sm font-medium text-gray-500">Documents</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <ul
                role="list"
                className="border bg-white border-gray-200 rounded-md divide-y divide-gray-200"
              >
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 flex-1 w-0 truncate">Pan Card</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {profile && profile.pan ? (
                      <a
                        href={`${process.env.BASE_URL}${profile.pan}`}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    ) : (
                      <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        NA
                      </a>
                    )}
                  </div>
                </li>
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 flex-1 w-0 truncate">Id Proof</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {profile && profile.idProof ? (
                      <a
                        href={`${process.env.BASE_URL}${profile.idProof}`}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    ) : (
                      <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        NA
                      </a>
                    )}
                  </div>
                </li>
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 flex-1 w-0 truncate">
                      Id Proof (Backside)
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {profile && profile.idProofBack ? (
                      <a
                        href={`${process.env.BASE_URL}${profile.idProofBack}`}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    ) : (
                      <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        NA
                      </a>
                    )}
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
          {/* Profile images */}
          <div className="mt-8 bg-gray-100 shadow overflow-hidden sm:rounded-lg   ">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Documents
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 border   place-items-center">
                {/* Pan Card */}
                {profile.pancard_image && (
                  <div className="">
                  <dt className="text-sm font-medium text-gray-500">
                    Pan Card
                  </dt>
                  <dd className="mt-1">
                    {profile.pancard_image ? (
                      <Image
                        src={profile.pancard_image}
                        alt="Pan Card"
                        width={200}
                        height={150}
                      />
                    ) : (
                      <span>Not Available</span>
                    )}
                  </dd>
                </div>
                )}
                

                {/* Aadhar Front */}
                {profile.aadharcard_front_image && (
                  <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Aadhar Front
                  </dt>
                  <dd className="mt-1">
                    {profile.aadharcard_front_image ? (
                      <Image
                        src={profile.aadharcard_front_image}
                        alt="Aadhar Front"
                        width={200}
                        height={150}
                      />
                    ) : (
                      <span>Not Available</span>
                    )}
                  </dd>
                </div>
                )}
                
  {profile.aadharcard_back_image && (
     <div>
     <dt className="text-sm font-medium text-gray-500">
       Aadhar Back
     </dt>
     <dd className="mt-1">
       {profile.aadharcard_back_image ? (
         <Image
           src={profile.aadharcard_back_image}
           alt="Aadhar Back"
           width={200}
           height={150}
         />
       ) : (
         <span>Not Available</span>
       )}
     </dd>
   </div>
  )}
               {profile.driving_license_front_image && (
                <div>
                <dt className="text-sm font-medium text-gray-500">
                  Driving License Front
                </dt>
                <dd className="mt-1">
                  {profile.driving_license_front_image ? (
                    <Image
                      src={profile.driving_license_front_image}
                      alt="Driving License Front"
                      width={200}
                      height={150}
                    />
                  ) : (
                    <span>Not Available</span>
                  )}
                </dd>
              </div>
               )}

                {/* Driving License Front */}
                

                {/* Driving License Back */}
                {profile.driving_license_back_image && (
                  <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Driving License Back
                  </dt>
                  <dd className="mt-1">
                    {profile.driving_license_back_image ? (
                      <Image
                        src={profile.driving_license_back_image}
                        alt="Driving License Back"
                        width={200}
                        height={150}
                      />
                    ) : (
                      <span>Not Available</span>
                    )}
                  </dd>
                </div>
                ) }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default withPrivateRoute(ProfilePage);
