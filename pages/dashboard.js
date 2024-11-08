import DashboardTemplate from "../components/templates/DashboardTemplate"
import LiveEventsTable from "../components/tables/LiveEventsTable"
import CompletedEventsTable from "../components/tables/CompletedEventsTable";
import withPrivateRoute from "../utils/withPrivateRoute";
import { useState,useEffect } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Dashboard() {
  let [tabs] = useState({ Live: [], });

  useEffect(() => {
    // Code in this section runs on mount
    console.log("Component mounted in dashboard in ");

    // Return a function to run when the component unmounts
    return () => {
      console.log("Component unmounted in dashboard");
    };
  }, []); // Empty dependency array means this runs only once on mount and unmount

  return (
    <DashboardTemplate
      heading="Live Events"
      subHeading="List of all live events"
    >
      <div className="w-full mt-4 ">
        <Tab.Group>
          <Tab.List className="flex justify-start space-x-2 rounded-xl ">
            {Object.keys(tabs).map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "w-24 rounded-lg py-2.5 text-sm font-medium leading-5 bg-gray-200",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ",
                    selected
                      ? "bg-green-400 text-black underline "
                      : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4 ">
            <Tab.Panel className={"rounded-xl bg-white focus:outline-none"}>
              <LiveEventsTable showHeadings={false} allowDownload={true} />
            </Tab.Panel>
            {/* <Tab.Panel className={"rounded-xl bg-white  focus:outline-none"}>
              <CompletedEventsTable showHeadings={false} allowDownload={true} />
            </Tab.Panel> */}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DashboardTemplate>
  );
}


export default withPrivateRoute(Dashboard);
