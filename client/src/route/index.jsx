// dashbaord
import Default from '../components/dashboard/default';
import Ecommerce from '../components/dashboard/ecommerce';
import Starterkits from '../components/starter-kits';
import GeneralSettingsPage from "../pages/dashboard/profile/hacker/settings/general/generalSettings.js";
import MessagingMainPage from "../pages/dashboard/messaging/main/messagingMain.js";
import PricingSelectMembershipPage from "../pages/dashboard/subscriptions/selectMembership/membership.js";

export const routes = [
        { path:`${process.env.PUBLIC_URL}/dashboard/default/:layout`, Component:Default},
        { path:`${process.env.PUBLIC_URL}/dashboard/ecommerce/:layout`, Component:Ecommerce},
        { path:`${process.env.PUBLIC_URL}/starter-kits/sample-page/:layout`, Component:Starterkits},
        { path:`${process.env.PUBLIC_URL}/profile/settings/edit`, Component: GeneralSettingsPage },
        { path:`${process.env.PUBLIC_URL}/messaging/main`, Component: MessagingMainPage },
        { path: `${process.env.PUBLIC_URL}/memberships/selection`, Component: PricingSelectMembershipPage }
]