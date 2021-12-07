import GeneralSettingsPage from "../pages/dashboard/profile/hacker/settings/general/generalSettings.js";
import MessagingMainPage from "../pages/dashboard/messaging/main/messagingMain.js";
import PricingSelectMembershipPage from "../pages/dashboard/subscriptions/selectMembership/membership.js";
import MainMapViewEmployerJobsPage from "../pages/dashboard/map/hackers/main/mainMap.js";
import GeneralSettingsEmployerPage from "../pages/dashboard/profile/employer/settings/general/generalSettings.js";
import LiveEmployerListingsPage from "../pages/dashboard/opportunities/employers/liveListings/main/liveListingsMain.js";
import ViewIndividualJobListingPage from "../pages/dashboard/opportunities/employers/liveListings/individual/viewListing/viewIndividualListing.js";
import CreateJobListingMainPage from "../pages/dashboard/opportunities/employers/createListing/create/createEmployerListing.js";
import ReviewListingInformationAndPayPage from "../pages/dashboard/opportunities/employers/createListing/review/reviewInformationAndPay.js";
import CourseListPage from "../pages/dashboard/learning/list/courseList.js";
import UsersCardsListPage from "../pages/dashboard/people/hackers/peopleList/list.js";
import UsersCardsEmployersAccountsPage from "../pages/dashboard/people/employers/peopleList/list.js";

export const routes = [
        { path:`${process.env.PUBLIC_URL}/profile/settings/edit`, Component: GeneralSettingsPage },
        { path:`${process.env.PUBLIC_URL}/messaging/main`, Component: MessagingMainPage },
        { path: `${process.env.PUBLIC_URL}/memberships/selection`, Component: PricingSelectMembershipPage },
        { path:`${process.env.PUBLIC_URL}/map/employers/available/jobs`, Component: MainMapViewEmployerJobsPage },
        { path: `${process.env.PUBLIC_URL}/profile/settings/edit/employer`, Component: GeneralSettingsEmployerPage },
        { path: `${process.env.PUBLIC_URL}/employer/listings/available`, Component: LiveEmployerListingsPage },
        { path: `${process.env.PUBLIC_URL}/view/individual/employer/listing/public/:id`, Component: ViewIndividualJobListingPage },
        { path: `${process.env.PUBLIC_URL}/create/employer/listing/general`, Component: CreateJobListingMainPage },
        { path: `${process.env.PUBLIC_URL}/review/employer/listing/data/payment`, Component: ReviewListingInformationAndPayPage },
        { path: `${process.env.PUBLIC_URL}/course/learning/list/main`, Component: CourseListPage },
        { path: `${process.env.PUBLIC_URL}/people/list/hackers/general`, Component: UsersCardsListPage },
        { path: `${process.env.PUBLIC_URL}/people/list/employers/general`, Component: UsersCardsEmployersAccountsPage }
]