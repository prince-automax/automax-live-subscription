

function Events() {
  const router = useRouter();
  const { id, type } = router.query;
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  //  const [id,setEventId]=useS
  const queryClient = useQueryClient();
  const [tick, setTick] = useState(0);
  const [serverTime, setserverTime] = useState(null);
  const [showInspectionReportModal, setShowInspectionReportModal] =
    useState(false);
  const [showImageCarouselModal, setShowImageCarouselModal] = useState(false);
  const [images, setImages] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { eventid, type } = router.query;
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      setAccessToken(token);
      setUserId(id);
      setIsReady(true);
    }
  }, []);

  const client = React.useMemo(
    () => graphQLClient({ Authorization: `Bearer ${accessToken}` }),
    [accessToken]
  );



  const { data: timeData, refetch: timeRefetch } =
    useTimeQueryQuery<TimeQueryQueryVariables>(
      client,
      {},
      {
        enabled: !!accessToken && !!id, // Enable query only when `isReady` is true
        refetchOnWindowFocus: true,
        refetchInterval: false, // Do not refetch on window focus
        refetchOnMount: false, // Prevent refetch on component mount
        // staleTime: 1000 * 60 * 5,         // Cache the result for 5 minutes
      }
    );

  const { data, isLoading, isError, error, refetch } =
    useGetEventsQuery<GetEventsQuery>(
      client,
      {
        where: { id: id },
        orderBy: { bidTimeExpire: OrderDirection.Asc },
        take: 1000,
        skip: 0,
      },
      {
        enabled: !!accessToken && !!id,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        // staleTime: 1000 * 60 * 5,         // Cache the result for 5 minutes
      }
    );
 



 
 

  return (
    // <>
    // </>
    <DashboardTemplate
      heading={
        "Event ID#" +
        data?.event?.eventNo +
        " " +
        data?.event?.seller?.name +
        ",  " +
        data?.event?.location?.name
      }
      subHeading={"List of all vehicles in this event"}
    >
      {data && data.event && data.event.termsAndConditions ? (
        <TermsConditions data={data.event.termsAndConditions} />
      ) : null}
      {isLoading ? (
        <Loader />
      ) : (
        
        <div className="space-y-6 mt-8 ">
          {!data?.event?.vehiclesTemp?.length && <div>No Vehicles Found</div>}
          {data?.event?.vehiclesTemp?.map((item, index) => {
            const expiryTime = moment(item.bidTimeExpire);
            const currentTime = moment(serverTime).add(tick, "seconds");
            const diff = expiryTime.diff(currentTime, "seconds");

            if ((diff > 0 && type == "l") || type == "c") {
              return (
                <>
                 

                  {/* dESKTOP DESIGN */}
                  <div
                    key={`d${index}`}
                    className={`hidden sm:flex sm:max-md:flex-col font-sans border   rounded  ${
                      moment(item?.bidTimeExpire).diff(moment(), "s") <= 120 &&
                      moment(item?.bidTimeExpire).diff(moment(), "s") > 0
                        ? "blink"
                        : ""
                    } ${
                      index % 2 == 0
                        ? "border-yellow-300 bg-gray-100 "
                        : "border-gray-300 bg-slate-50"
                    }  `}
                  >
                    {item?.image && (
                      <div
                        className="flex-none w-60 h-56  sm:max-md:h-56 sm:max-md:w-full md:h-auto sm:w-52 relative p-6 hover:cursor-pointer"
                        onClick={() => {
                          // BindVehicleImage(item);
                          setImages((item?.image).split(","));

                          setShowImageCarouselModal(true);
                        }}
                      >
                        <Image
                          alt="img"
                          src={item?.image.split(",")[0]}
                          layout="fill"
                          className="absolute inset-0 w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                 
                    {/* starts at herer */}
                    <div className="flex-none w-50   sm:max-md:w-full text-center mx-auto sm:w-64 ">
                      <div className="flex sm:max-md:flex-row flex-col items-center  justify-center  relative p-4 space-y-2">
                        <div className="w-full  sm:max-md:w-1/2 sm:max-md:self-start    sm:max-md:text-left space-y-2 mt-1 sm:mt-2 ">
                          <span className="sm:max-md:text-base md:text-left">
                            {" "}
                            {SecondsLeft(item)}
                          </span>
                          <div className="hidden sm:block">
                            <div className=" flex flex-col md:items-start justify-left text-xs sm:max-md:text-sm text-gray-700">
                              <span className="font-semibold">Start Date</span>
                              <span>
                                {data.event.startDate
                                  ? moment(data.event.startDate).format(
                                      "MMMM Do, YYYY ddd h:mm a"
                                    )
                                  : "NA"}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-start text-xs sm:max-md:text-sm text-gray-700">
                            <span className="font-semibold">End Date</span>
                            <span>
                              {item?.bidTimeExpire
                                ? moment(item?.bidTimeExpire).format(
                                    "MMMM Do, YYYY ddd h:mm a"
                                  )
                                : "NA"}
                            </span>
                          </div>
                        </div>

                     
                      </div>
                    </div>
                    {/* end here */}
                  </div>
                </>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}
      
      <ImageCarouselModal
        color="blue"
        open={showImageCarouselModal}
        close={() => setShowImageCarouselModal(false)}
        images={images}
      />
    </DashboardTemplate>
  );
}

export default withPrivateRoute(Events);


