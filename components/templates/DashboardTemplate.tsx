import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import {
  ArrowCircleLeftIcon,
  BookmarkIcon,
  CalendarIcon,
  CashIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  ScaleIcon,
  UserCircleIcon,
  ReceiptTaxIcon,
  ChevronDownIcon,
  EyeIcon,
  DesktopComputerIcon,
} from "@heroicons/react/outline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCashRegister,
  faCog,
  faImages,
  faHammer,
} from "@fortawesome/free-solid-svg-icons";
import graphQLClient from "@utils/useGQLQuery";

import Link from "next/link";
import { useRouter } from "next/router";
import Welcome from "../common/Welcome";
import { useEventsCountQuery,EventsCountQueryVariables} from "@utils/graphql";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardTemplate({ children, heading, subHeading }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showEvents, setShowEvents] = useState(false);
  const [showBids, setShowBids] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [liveOpen, setLiveOpen] = useState(0);
  const [liveOnline, setLiveOnline] = useState(0);
  const [Upcoming, setUpcoming] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setAccessToken(token);
    }
  }, []);

  // const { data, isLoading, refetch } = useEventsCountQuery(
  //   graphQLClient({ Authorization: `Bearer ${accessToken}` }),
  //   {

  //     enabled: accessToken !== ""
  //   }l
  // );
  const queryOptions = accessToken ? { enabled: true } : { enabled: false };

  const { data, isLoading, refetch } = useEventsCountQuery(
    graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    undefined, // No variables for this query
    queryOptions
  );
  
  
  

  console.log('Events count ', data?.events?.liveEventCount);
    
  // const {data:upcoming}=useUpcomingEventsCountsQuery(
  //   graphQLClient({ Authorization: `Bearer ${accessToken}` }),
  // )

  useEffect(()=>{
    if(data?.events?.liveEventCount){
      const liveOnline=data?.events?.liveEventCount
      const upcomingEventsCount=data?.events?.upcomingEventCount

      setLiveOnline(liveOnline)
      setUpcoming(upcomingEventsCount)
    }
    
  },[data])

  // Inside DashboardTemplate

  const setNavigationLink = (href) => {
    router.push(href);
    // Optionally, you can also set the active link state here if needed.
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const eventsNavigations = [
    {
      name: `Online Events (${liveOnline})`,
      href: "/dashboard",
      icon: ClockIcon,
      current:
        router.pathname == "/dashboard" || router.pathname == "/events/[id]"
          ? true
          : false,
    },
    {
      name: `Upcoming Events (${Upcoming})`,
      href: "/upcoming-events",
      icon: CalendarIcon,
      current: router.pathname == "/upcoming-events" ? true : false,
    },
    // {
    //   name: `Open Auctions  (${liveOpen})`,
    //   href: "/open-auctions",
    //   icon: ClockIcon,
    //   current: router.pathname == "/open-auctions" ? true : false,
    // },
  ];

  // Inside DashboardTemplate
  // Inside DashboardTemplate
  // Inside DashboardTemplate
  useEffect(() => {
    const activeLink = document.querySelector(".active-link");
    if (activeLink) {
      activeLink.scrollIntoView({
        behavior: "auto", // Change 'instant' to 'auto'
        block: "center", // Scroll to the center vertically
        inline: "center", // Scroll to the center horizontally
      });
    }
  }, [router.pathname]);

  const activityNavigations = [
    {
      name: "Work Book",
      href: "/showworkbook",
      icon: BookmarkIcon,
      current: router.pathname == "/showworkbook" ? true : false,
    },
    {
      name: "My Watchlist",
      href: "/watch-list",
      icon: EyeIcon,
      current: router.pathname == "/watch-list" ? true : false,
    },
    // { name: 'My Wins', href: '/my-wins', icon: CheckCircleIcon, current: router.pathname == "/my-wins" ? true : false },
    {
      name: "My Quotes",
      href: "/my-quotes",
      icon: CreditCardIcon,
      current: router.pathname == "/my-quotes" ? true : false,
    },
    {
      name: "Open Leads",
      href: "/openleads",
      current: router.pathname == "/openleads" ? true : false,

      icon: DesktopComputerIcon,
    },
    {
      name: "Buying Limit",
      href: "/buying-limit",
      icon: ScaleIcon,
      current: router.pathname == "/buying-limit" ? true : false,
    },
    {
      name: "Deposits",
      href: "/deposits",
      icon: CurrencyRupeeIcon,
      current: router.pathname == "/deposits" ? true : false,
    },
  ];

  const accountNavigations = [
    {
      name: "Profile",
      href: "/profile",
      icon: UserCircleIcon,
      current: router.pathname == "/profile" ? true : false,
    },
    {
      name: "Payments",
      href: "/payments",
      icon: CashIcon,
      current: router.pathname == "/payments" ? true : false,
    },
    {
      name: "Passbook",
      href: "/passbook",
      icon: DocumentTextIcon,
      current: router.pathname == "/passbook" ? true : false,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: CogIcon,
      current: router.pathname == "/settings" ? true : false,
    },
    {
      name: "Report",
      href: "/report",
      icon: ReceiptTaxIcon,
      current: router.pathname == "/report" ? true : false,
    },
  ];

  const mobileNavigation=[...eventsNavigations,...activityNavigations,...accountNavigations]

  return (
    <>
      <TopBar />
      <main className="max-w-7xl mx-auto pb-10 py-1   ">
        <div className="lg:flex max-md:w-full ">
          {showSidebar && (
            <aside className=" max-md:w-full relative py-6 sm:py-0 px-2 sm:px-6  flex-none lg:border-r border-gray-200">
              {/* <button className="absolute 0 right-0 top-0 -mr-3 mt-4 sm:max-lg:mt-0 h-6 w-6 rounded-full flex items-center justify-center ring-2 ring-gray-300 hover:ring-gray-400">
                <ChevronLeftIcon
                  className=" h-4 w-4 top-text-gray-400 animate-pulse  animation-duration-500"
                  onClick={toggleSidebar}
                />
              </button> */}
              {/* <Welcome /> */}
              <nav className="mt-1 sm:max-lg:mt-8 space-y-4 max-md:w-full  ">
                <div className=" text-black bg-white lg:hidden flex w-full space-x-4  overflow-x-scroll scrollbar-hide ">
                  {mobileNavigation.map((item, index) => (
  <ul key={index} className="space-x-4">
    <li className="space-x-4 ">
      <Link key={item.name} href={item.href}>
        <a
          className={classNames(
            router.pathname === item.href
              ? "text-white bg-orange-500 active-link transition ease-in-out transform translate-x-1"
              : "text-gray-900 hover:text-gray-900 hover:bg-gray-100",
            "group rounded-md px-3 py-2 flex items-center text-sm font-medium border shadow-inner shadow-slate-200"
          )}
          onClick={(e) => {
            e.preventDefault();
            setNavigationLink(item.href);
          }}
        >
          <span className="truncate">{item.name}</span>
        </a>
      </Link>
    </li>
  </ul>
))}
                </div>

                <div className="hidden lg:block">
                  <div>
                    <h3
                      className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider lg:mt-10"
                      id="mobile-teams-headline"
                    >
                      Events
                    </h3>
                    {eventsNavigations.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-orange-600 hover:bg-gray-100"
                              : "text-gray-900 hover:text-gray-900 hover:bg-gray-100",
                            "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-orange-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>

                  <div>
                    <h3
                      className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      id="mobile-teams-headline"
                    >
                      My Bids
                    </h3>
                    {activityNavigations.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-orange-600 hover:bg-gray-100"
                              : "text-gray-900 hover:text-gray-900 hover:bg-gray-100",
                            "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-orange-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>

                  <div>
                    <h3
                      className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      id="mobile-teams-headline"
                    >
                      My Account
                    </h3>
                    {accountNavigations.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-orange-600 hover:bg-gray-100"
                              : "text-gray-900 hover:text-gray-900 hover:bg-gray-100",
                            "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-orange-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </aside>
          )}

          <div className="px-4 sm:px-6 flex-1">
            {!showSidebar && (
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 mb-2"
              >
                Open sidebar
                <ChevronRightIcon
                  className="ml-1 h-3 w-3 top-text-gray-400"
                  onClick={toggleSidebar}
                />
              </button>
            )}

            <div className="space-y-6 sm:flex sm:items-center sm:max-lg:mt-2 lg:mt-6">
              <div className="sm:flex-auto">
                {heading && (
                  <h1 className="text-xl font-semibold text-gray-900">
                    {heading}
                  </h1>
                )}

                {subHeading && (
                  <p className="mt-2 text-sm text-gray-700">{subHeading}</p>
                )}
              </div>
              {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                >
                                    Action
                                </button>
                            </div> */}
            </div>
            <section>{children}</section>
          </div>
        </div>
      </main>
    </>
  );
}

DashboardTemplate.defaultProps = {
  heading: "",
  subHeading: "",
};
