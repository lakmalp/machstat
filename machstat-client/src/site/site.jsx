import AuthenticatedLayout from "../_containers/authenticated-layout";
import { SiteServiceProvider } from "./util/site-service";
import SiteDialog from "./layouts/site-dialog";
import SiteOverview from "./layouts/site-overview";

export default function Site(props) {
    return (
        <AuthenticatedLayout>
            <SiteServiceProvider>
                <SiteDialog />
                <SiteOverview />
            </SiteServiceProvider>
        </AuthenticatedLayout>
    )
}