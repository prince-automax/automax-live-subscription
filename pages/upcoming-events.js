import DashboardTemplate from "../components/templates/DashboardTemplate"
import UpcomingEventsTable from "../components/tables/UpcomingEventsTable"
import withPrivateRoute from "../utils/withPrivateRoute";

function EventsCalendar() {

    return (
        <DashboardTemplate heading="Upcoming Events" subHeading="List of all upcoming events">
            <UpcomingEventsTable showHeadings={false} allowDownload={true} />
        </DashboardTemplate>
    )
}


export default withPrivateRoute(EventsCalendar);


