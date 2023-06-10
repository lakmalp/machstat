import AuthenticatedLayout from "../_containers/authenticated-layout";
import { CompanyServiceProvider } from "./util/company-service";
import CompanyDialog from "./layouts/company-dialog";
import CompanyOverview from "./layouts/company-overview";

export default function Company(props) {
    return (
        <AuthenticatedLayout>
            <CompanyServiceProvider>
                <CompanyDialog />
                <CompanyOverview />
            </CompanyServiceProvider>
        </AuthenticatedLayout>
    )
}