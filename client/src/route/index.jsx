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
import MainHackerDirectoryDisplayPage from "../pages/dashboard/directory/hackers/main/mainHackerDirectory.js";
import PersonalProfileDetailsMainPage from "../pages/dashboard/profile/hacker/view/generalDetails/personalProfileDetails.js";
import InitializeVerificationFlowPage from "../pages/dashboard/verification/initialize/hacker/startVerification.js";
import ProfileHackerIndividualPage from "../pages/dashboard/people/hackers/individualProfile/index.js";
import PersonalProfileEmployerDetailsMainPage from "../pages/dashboard/profile/employer/view/generalDetails/personalProfileDetails.js";
import InitializeVerificationProcessEmployerPage from "../pages/dashboard/verification/initialize/employer/startVerification.js";
import MainLandingPageEmployerPage from "../pages/dashboard/homepage/employers/main/mainLandingPage.js";
import MainLandingPageHackerPage from "../pages/dashboard/homepage/hackers/main/mainLandingPage.js";
import HardwareLandingMainHelper from "../pages/dashboard/softwareHardwareExchanges/hardware/landing/hardwareLandingMainPage.js";
import SoftwareLandingMainHelper from "../pages/dashboard/softwareHardwareExchanges/software/landing/softwareLandingMainPage.js";
import DisplayIndividualListingSoftwarePage from "../pages/dashboard/softwareHardwareExchanges/software/individual/displayIndividualListing.js";
import CreateNewSoftwareListingPage from "../pages/dashboard/softwareHardwareExchanges/software/createListing/createNewListing.js";
import UnauthorizedAccessPage from "../pages/dashboard/unauthorized/unauthorizedAccess.js";
import ViewIndividualListingSoftwarePagePage from "../pages/dashboard/softwareHardwareExchanges/software/individual/liveIndividualListing/viewLiveIndividualListingData.js";
import MainBiddingBettingPageLandingPage from "../pages/dashboard/opportunities/employers/liveListings/biddingBetting/biddingPageMain/mainBiddingPage.js";
import ApplyAsHackerEmployerListingPage from "../pages/dashboard/opportunities/employers/applyToListingHacker/applyAsHacker.js";
import ManageApplicantsMainPage from "../pages/dashboard/jobManagement/employers/mainManageApplicants/manageApplicantsMain.js";
import ManageApplicationIndividualPage from "../pages/dashboard/jobManagement/employers/mainManageApplicants/individual/viewIndividualApplicant/viewIndividualInfo.js";

export const routes = [
        { path:"/profile/settings/edit", Component: GeneralSettingsPage },
        { path:"/messaging/main", Component: MessagingMainPage },
        { path: "/memberships/selection", Component: PricingSelectMembershipPage },
        { path:"/map/employers/available/jobs", Component: MainMapViewEmployerJobsPage },
        { path: "/profile/settings/edit/employer", Component: GeneralSettingsEmployerPage },
        { path: "/employer/listings/available", Component: LiveEmployerListingsPage },
        { path: "/view/individual/employer/listing/public/:id", Component: ViewIndividualJobListingPage },
        { path: "/create/employer/listing/general", Component: CreateJobListingMainPage },
        { path: "/review/employer/listing/data/payment", Component: ReviewListingInformationAndPayPage },
        { path: "/course/learning/list/main", Component: CourseListPage },
        { path: "/people/list/hackers/general", Component: UsersCardsListPage },
        { path: "/people/list/employers/general", Component: UsersCardsEmployersAccountsPage },
        { path: "/hacker/directory/main/profiles", Component: MainHackerDirectoryDisplayPage },
        { path: "/hacker/profile/main/display/personal", Component: PersonalProfileDetailsMainPage },
        { path: "/start/verification/flow", Component: InitializeVerificationFlowPage },
        { path: "/hacker/profile/individual/view/:id", Component: ProfileHackerIndividualPage },
        { path: "/employer/profile/main/display/personal", Component: PersonalProfileEmployerDetailsMainPage },
        { path: "/start/verification/flow/employer", Component: InitializeVerificationProcessEmployerPage },
        { path: "/dashboard/employer", Component: MainLandingPageEmployerPage },
        { path: "/dashboard/hacker", Component: MainLandingPageHackerPage },
        { path: "/software/exchange/landing", Component: SoftwareLandingMainHelper },
        { path: "/hardware/exchange/landing", Component: HardwareLandingMainHelper },
        { path: "/software/exchange/individual/listing/view/:id", Component: DisplayIndividualListingSoftwarePage },
        { path: "/create/listing/software/exchange/hacker/account", Component: CreateNewSoftwareListingPage },
        { path: "/unauthorized/access/restricted", Component: UnauthorizedAccessPage },
        { path: "/software/listing/individual/page/:id", Component: ViewIndividualListingSoftwarePagePage },
        { path: "/employer/listing/betting/bidding/main/page", Component: MainBiddingBettingPageLandingPage },
        { path: "/hacker/apply/employer/listing/:id", Component: ApplyAsHackerEmployerListingPage },
        { path: "/view/all/general/applications/employer/recruit", Component: ManageApplicantsMainPage },
        { path: "/view/individual/application/employer/:id", Component: ManageApplicationIndividualPage }
];