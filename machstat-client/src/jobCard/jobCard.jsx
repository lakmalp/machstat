import AuthenticatedLayout from "../_containers/authenticated-layout";
import { JobCardServiceProvider } from "./util/jobCard-service";
import JobCardDialog from "./layouts/jobCard-dialog";
import JobCardOverview from "./layouts/jobCard-overview";

export default function JobCard(props) {
    return (
        <AuthenticatedLayout>
            <JobCardServiceProvider>
                <JobCardDialog />
                <JobCardOverview />
            </JobCardServiceProvider>
        </AuthenticatedLayout>
    )
}