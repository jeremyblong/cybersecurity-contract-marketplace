import GeneralSettingsPage from "../pages/dashboard/profile/hacker/settings/general/generalSettings.js";
import MessagingMainPage from "../pages/dashboard/messaging/main/messagingMain.js";
import PricingSelectMembershipPage from "../pages/dashboard/subscriptions/selectMembership/membership.js";
import MainMapViewEmployerJobsPage from "../pages/dashboard/map/hackers/main/mainMap.js";

export const routes = [
        { path:`${process.env.PUBLIC_URL}/profile/settings/edit`, Component: GeneralSettingsPage },
        { path:`${process.env.PUBLIC_URL}/messaging/main`, Component: MessagingMainPage },
        { path: `${process.env.PUBLIC_URL}/memberships/selection`, Component: PricingSelectMembershipPage },
        { path:`${process.env.PUBLIC_URL}/map/employers/available/jobs`, Component: MainMapViewEmployerJobsPage }
]