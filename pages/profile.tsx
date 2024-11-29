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
      "ID Proof Number": "-",
      "Pan Number": "-",
      // City: "-",
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
          "ID Proof Number":
            (user.idProofNo && user.idProofNo) != "" ? user.idProofNo : "-",
          "Pan Number":
            (user.pancardNo && user.pancardNo) != "" ? user.pancardNo : "-",
          // City: (user.city && user.city) != "" ? user.city : "-",
          State: (user.state && user.state) != "" ? user.state?.replace(/_/g, " ") : "-",
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
              Profile 
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
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md  text-white bg-blue-600 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            >
              <PencilAltIcon
                className="-ml-1 mr-2 h-5 w-5 text-white"
                aria-hidden="true"
              />
              Update Profile
            </a>
          </Link>
        </div>
      </div>

   
      <div className="mt-10 max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Profile Header */}
      {/* <div className="px-8 py-6  ">
        <h3 className="text-2xl font-bold">Basic Details</h3>
        <p className="mt-1 text-lg">My profile details</p>
      </div> */}

      {/* Profile Details */}
      <div className="px-8 py-6 bg-gray-50">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
          {Object.keys(profile.fields).map((field) => (
            <div key={field} className="flex flex-col border-b py-4">
              <dt className="text-sm font-semibold text-gray-700">{field}</dt>
              <dd className="mt-1 text-lg text-gray-900 font-medium">{profile.fields[field]}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Documents Section */}
      <div className="mt-6 border-t">
        <div className="px-8 py-4 border-b bg-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800">Documents</h3>
        </div>
        <div className="px-8 py-4 bg-white">
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Document Items */}
            {[
              { label: 'Pan Card', image: profile.pancard_image },
              { label: 'Aadhar Front', image: profile.aadharcard_front_image },
              { label: 'Aadhar Back', image: profile.aadharcard_back_image },
              { label: 'Driving License Front', image: profile.driving_license_front_image },
              { label: 'Driving License Back', image: profile.driving_license_back_image },
            ].map(({ label, image }) => (
              <div key={label} className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
                <dt className="text-lg font-semibold text-gray-700">{label}</dt>
                <dd className="mt-2">
                  {image ? (
                    <Image
                      src={image}
                      alt={label}
                      width={200}
                      height={150}
                      className="rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">Not Available</span>
                  )}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </DashboardTemplate>
  );
}

export default withPrivateRoute(ProfilePage);
