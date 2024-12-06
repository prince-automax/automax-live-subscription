import DashboardTemplate from "../components/templates/DashboardTemplate"
import CompletedEventsTable from "../components/tables/CompletedEventsTable"
import withPrivateRoute from "../utils/withPrivateRoute";

function EventsCalendar() {

    return (
        <DashboardTemplate heading="Completed Events" subHeading="List of all completed events">
             <div className="mt-2">
            <CompletedEventsTable showHeadings={false} allowDownload={true} />
            </div>
        </DashboardTemplate>
    )
}


export default withPrivateRoute(EventsCalendar);


