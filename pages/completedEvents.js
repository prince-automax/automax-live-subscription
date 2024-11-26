import DashboardTemplate from "../components/templates/DashboardTemplate"
import CompletedEventsTable from "../components/tables/CompletedEventsTable"
import withPrivateRoute from "../utils/withPrivateRoute";

function EventsCalendar() {

    return (
        <DashboardTemplate heading="Completed Events">
            <CompletedEventsTable showHeadings={false} allowDownload={true} />
        </DashboardTemplate>
    )
}


export default withPrivateRoute(EventsCalendar);


