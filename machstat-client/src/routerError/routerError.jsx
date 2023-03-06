import React from "react";
import GuestLayout from "../_containers/guest-layout";
import RouterErrorPage from "./layouts/routerError-page";

export default function RouterError() {
    return (
        <GuestLayout>
            <RouterErrorPage />
        </GuestLayout>
    )
}