const express = require("express");
const app = express();
const config = require("config");
// init middleware
const bodyParser = require('body-parser');
const cors = require("cors");
const runCronJob = require("./cronjobs/subscriptions/hackerSubscription/subscriptionChecks.js");
const xss = require('xss-clean');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");
const aws = require('aws-sdk');
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { Connection } = require("./mongoUtil.js");
const flash = require('connect-flash');
const session = require('express-session');
// websockets logic initialization
const http = require("http");
const server = http.createServer(app);
const ClamScanConfiguration = require("./config/clamscan.js");
const path = require("path");
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
	}
});
const NodeClam = require('clamscan');

app.use(helmet({ contentSecurityPolicy: false }));

app.use(async (req, _, next) => {
	req.clamscan = await new NodeClam().init({ ...ClamScanConfiguration })
	next()
})

app.use(cookieParser(config.get("COOKIE_SECRET")));

require("./strategies/jwtstrategy.js");
require("./strategies/localstrategy.js");
require("./schemas/authentication/authenticate.js");

// ~ webhook logic STARTS here ~
app.use("/passbase/webhook", require("./webhooks/passbase/webhook.js"));
app.use("/stripe/webhook", bodyParser.raw({type: "*/*"}), require("./webhooks/stripe/webhook.js"));
// ~ webhook logic ENDS here ~

aws.config.update({
    secretAccessKey: config.get("awsSecretKey"),
    accessKeyId: config.get("awsAccessKey"),
    region: config.get("awsRegion")
});

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({
	limit: "500mb"
}));
app.use(bodyParser.urlencoded({
	limit: "500mb",
	extended: false
}));

const whitelist = config.get("WHITELISTED_DOMAINS") ? config.get("WHITELISTED_DOMAINS").split(",") : [];

const corsOptions = {
	origin: (origin, callback) => {
		
		console.log("ORIGIN", origin);

		callback(null, true)
		// if (!origin || whitelist.indexOf(origin) !== -1) {
		// 	callback(null, true)
		// } else {
		// 	callback(new Error("Not allowed by CORS"))
		// }
	},
	credentials: true,
};

app.use((req, res, next) => {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(flash());

app.use(session({ 
	cookie: { 
		maxAge: 60000 
	}, 
	secret: 'woot',
	resave: false, 
	saveUninitialized: false
}));
  
app.use(cors(corsOptions));

app.use(passport.initialize());

const limiter = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000 * 1000, // remove the last 1000 for production
    message: 'Too many requests' // message to send
}); 

app.use(xss());
app.use(mongoSanitize());
app.use(limiter);
// ~ test route STARTS here ~
app.use("/activate/random/test/action", require("./routes/randomTestRoute.js"));
// ~ test route ENDS here ~


// routes go here...
app.use("/twilio/verify/code", require("./routes/authentication/twilio/verify/verifyTwilioCode.js"));
app.use("/twilio/send/code", require("./routes/authentication/twilio/sendCode/send.js"));
app.use("/registration/hacker", require("./routes/authentication/registration/hacker/registerAsHacker.js"));
app.use("/login/hacker", require("./routes/authentication/login/hackerLogin.js"));
app.use("/login/employer", require("./routes/authentication/login/employerLogin.js"));
app.use("/refresh/token/hacker", require("./routes/authentication/refreshToken/hackerRefresh.js"));
app.use("/refresh/token/employer", require("./routes/authentication/refreshToken/employerRefresh.js"));
app.use("/logout", require("./routes/authentication/logout/logout.js"));
app.use("/registration/employer", require("./routes/authentication/registration/employer/registerAsEmployer.js"));
app.use("/upload/profile/picture/video/hacker", require("./routes/hackers/profile/profilePicVideo/uploadData.js"));
app.use("/upload/profile/picture/video/employer", require("./routes/employers/profile/profilePicVideo/uploadData.js"));
app.use("/gather/general/user/data", require("./routes/shared/general/userInfo/gatherGeneralUserInfo.js"));
app.use("/update/hacker/profile/information/basic", require("./routes/hackers/profile/generaInfomation/updateGeneralInfomation.js"));
app.use("/update/employer/profile/information/basic", require("./routes/employers/profile/generalInformation/updateGeneralInformation.js"));
app.use("/upload/file/upon/selection/employer/listing", require("./routes/employers/employerListings/createListing/uploadFile/uploadGeneralFileListing.js"));
app.use("/post/employer/listing/recruit", require("./routes/employers/employerListings/createListing/create/createEmployerListing.js"));
app.use("/gather/employer/listings/general", require("./routes/employers/employerListings/gatherListings/visibility/general/gatherGeneralEmployerListings.js"));
app.use("/gather/hackers/random/general", require("./routes/hackers/directory/gatherHackers/randomizedGeneralHackersGather.js"));
app.use("/save/identity/access/key/verification/flow", require("./routes/verification/accountVerification/completedFlow/completedVerificationFlow.js"));
app.use("/update/user/fully/verified", require("./routes/verification/accountVerification/confirmVerification/updateAccountFullyVerified.js"));
app.use("/gather/hacker/profile/details", require("./routes/hackers/profile/publicProfile/generalDetails/gatherGeneralHackerDetails.js"));
app.use("/save/user/geolocation", require("./routes/locationServices/userLocation/saveHackerEmployerAccountLocation.js"));
app.use("/upload/banner/photo/employer/profile", require("./routes/employers/profile/newBanner/uploadNewBannerImage.js"));
app.use("/retrieve/related/employer/core/information", require("./routes/employers/employerListings/gatherPosterInformation/fetchCoreRelatedInfo/fetchDetails.js"));
app.use("/upload/banner/photo/hacker/profile", require("./routes/hackers/profile/newBanner/uploadNewBannerImage.js"));
app.use("/upload/misc/file/softare/listing/sale", require("./routes/hackers/softwareHardwareMarketplace/software/createListing/uploadFiles/uploadGeneralFilePremature.js"));
app.use("/upload/software/listing/for/sale/data", require("./routes/hackers/softwareHardwareMarketplace/software/createListing/postListing/postFinalListingDataLive.js"));
app.use("/gather/software/listings", require("./routes/hackers/softwareHardwareMarketplace/software/gatherListing/gatherListingsInitial.js"));
app.use("/gather/core/anonymous/user/data", require("./routes/shared/general/userInfo/gatherRestrictedCoreUserInfo.js"));
app.use("/gather/random/employer/accounts", require("./routes/employers/gatherRandomEmployerAccounts/gatherRandomAccounts.js"));
app.use("/gather/random/hackers/accounts", require("./routes/hackers/gatherRandomHackerAccounts/gatherRandomAccounts.js"));
app.use("/gather/listing/all/info", require("./routes/employers/employerListings/gatherListings/visibility/general/gatherIndividualSingularListing.js"));
app.use("/apply/employer/listing/submit/live/data/last", require("./routes/hackers/employerListings/applyToListing/applyToListingFinalStage.js"));
app.use("/hired/applicant/listing/start/process", require("./routes/employers/employerListings/hireApplicant/hireApplicantNow.js"));
app.use("/success/application/save/applicant/info/employerlisting", require("./routes/hackers/employerListings/applyToListing/updatePublicListingData/updateMainPublicDataApplicantInfo.js"));
app.use("/create/live/stream/stream/key", require("./routes/liveStreaming/createNewLiveStream/createNewStream/createStreamKey.js"));
app.use("/check/live/stream/active", require("./routes/liveStreaming/createNewLiveStream/checkActiveAndSave/checkIfStreamActiveAndSave.js"));
app.use("/gather/live/streams/all", require("./routes/liveStreaming/manageLiveStreams/gatherStreams/gatherLiveStreams.js"));
app.use("/upload/misc/file", require("./routes/shared/files/uploadMiscFile.js"));
app.use("/upload/new/course/for/sale/hacker", require("./routes/hackers/learningTeachingCourses/createNewCourse/createAndSubmitCourseReview.js"));
app.use("/gather/courses/all/learning", require("./routes/hackers/learningTeachingCourses/retrieveMultipleCourses/gatherMultipleCoursesNotExist.js"));
app.use("/gather/individual/course/data", require("./routes/hackers/learningTeachingCourses/retrieveLiveCourseData/individualCourse/gatherCourseDataById.js"));
app.use("/post/comment/course/individual/listing", require("./routes/hackers/learningTeachingCourses/retrieveLiveCourseData/comments/postNewComment/postNewCommentCourse.js"));
app.use("/respond/emoji/comment/course/learning", require("./routes/hackers/learningTeachingCourses/retrieveLiveCourseData/comments/reactToComment/reactToMainComment.js"));
app.use("/add/like/course/learning/unique", require("./routes/hackers/learningTeachingCourses/reactToCourse/likes/addLikeIfNonExistent.js"));
app.use("/add/dislike/course/learning/unique", require("./routes/hackers/learningTeachingCourses/reactToCourse/dislikes/addDislikeIfNonExistent.js"));
app.use("/post/comment/employer/live/listing", require("./routes/hackers/employerListings/comments/postNewComment/postComment.js")); 
app.use("/respond/emoji/comment/employer/listing", require("./routes/employers/employerListings/commentsAndMore/reactWithEmoji/reactEmojiEmployerListing.js"));
app.use("/notify/other/users/denial/application/process", require("./routes/employers/notificationRelated/applicants/notifyOfNotBeingPicked.js"));
app.use("/notify/other/user/approval/application/process", require("./routes/employers/notificationRelated/applicants/selected/notifiyOfBeingAcceptedWork.js"));
app.use("/gather/listing/all/info/deduct/one/count", require("./routes/employers/employerListings/modifyListing/fetchListingAndRemoveOneRequiredCount.js"));
app.use("/gather/active/jobs/employer/account", require("./routes/employers/hiredHackers/gatherAllHired/gatherAllHiredHackers.js"));
app.use("/gather/active/applied/jobs/hacker/account", require("./routes/hackers/appliedGigsAsHacker/gatherApplications/gatherPreviousApplications/gatherAllPreviousApplications.js"));
app.use("/react/hacker/profile/file/history", require("./routes/hackers/profile/publicProfile/reactToProfileFile/reactToProfilePicVideoEmoji.js"));
app.use("/update/hacker/view/account/details/new/view", require("./routes/hackers/profile/publicProfile/markProfileView/markProfileAsViewedCurrentUser.js"));
app.use("/bookmark/hacker/profile/either/account/type", require("./routes/hackers/profile/publicProfile/bookmarkProfile/bookmarkHackerProfile.js"));
app.use("/heart/profile/hacker/bookmark", require("./routes/hackers/profile/publicProfile/heartProfileHacker/heartLoveHackerProfile.js"));
app.use("/gather/bookmarked/accounts/both/as/employer", require("./routes/employers/bookmarkedProfiles/gatherBothAccountTypesDynamically.js"));
app.use("/gather/bookmarked/accounts/both/as/hacker", require("./routes/hackers/bookmarkedProfiles/gatherBothAccountTypesDynamic.js"));
app.use("/start/following/hacker/account", require("./routes/hackers/profile/publicProfile/followHackerUser/startFollowingThisHackerUser.js"));
app.use("/upload/new/wall/profile/post/hacker/account", require("./routes/hackers/profile/uploadNewPost/uploadNewMainProfilePost.js"));
app.use("/react/posting/hacker/profile/individual", require("./routes/hackers/profile/publicProfile/postingLogicAndInteractions/reactWithEmojiSpecificPost/reactWithEmojiToPost.js"));
app.use("/post/new/comment/hacker/timeline/profile/individual", require("./routes/hackers/profile/publicProfile/postingLogicAndInteractions/commentLogic/postNewComment/postNewCommentOnPost.js"));
app.use("/react/posting/hacker/profile/individual/specific/post/main/mapped", require("./routes/hackers/profile/publicProfile/postingLogicAndInteractions/reactWithEmojiSpecificPost/mainMappedReact/reactToMainMappedPost.js"));
app.use("/gather/core/user/information/related/hired/hackers", require("./routes/employers/hiredHackers/manageActiveApplicant/gatherRelevantInfo.js"));
app.use("/gather/listings/avaliable/bid/gamble/on", require("./routes/hackers/bettingGamblingRelated/listings/gatherListingsToBidOn.js"));
app.use("/gather/short/list/courses/for/sale", require("./routes/hackers/FAQHackers/fetchRandomCourses/fetchShortListRandomCourses.js"));
app.use("/add/new/payment/method/hacker", require("./routes/hackers/paymentRelated/addNewPaymentMethod/addANewMethod.js"));
app.use("/gather/existing/payment/methods/hacker", require("./routes/hackers/paymentRelated/gatherPreviousPaymentMethods/gatherCardMethods.js"));
app.use("/delete/debit/credit/card/hacker/account", require("./routes/hackers/paymentRelated/deleteSpecificCardDebitCredit/deleteRemoveCard.js"));
app.use("/fetch/matching/users/restricted/data", require("./routes/shared/forumRelated/gatherUsersAddToSubThread/gatherRandomUsersAdd.js"));
app.use("/send/invites/create/group", require("./routes/shared/forumRelated/createCommunityRelated/sendInvitesCreateCommunity.js"));
app.use("/send/invite/join/community/forum", require("./routes/shared/forumRelated/notifyUsers/notifyUserOfCommunityInvite/notifySpecificUser.js"));
app.use("/gather/related/user/groups/communities", require("./routes/shared/forumRelated/communityRelated/gatherAssociatedCommunities/gatherCommunities.js"));
app.use("/post/new/forum/post/to/community", require("./routes/shared/forumRelated/postNewForumPostToCommunity/postNewForumPost.js"));
app.use("/gather/randomized/community/posts", require("./routes/shared/forumRelated/gatherRandomPosts/gatherRandomCommunityPosts.js"));
app.use("/gather/forum/poster/core/info", require("./routes/shared/forumRelated/gatherUserInfo/gatherForumPosterInfoCore/gatherCoreInfo.js"));
app.use("/gather/forum/comments/subthread/individual", require("./routes/shared/forumRelated/commentRelated/retreievePreviousComments/retrieveCommentsUponLoad.js"));
app.use("/post/new/comment/forums/subthread/subcomment", require("./routes/shared/forumRelated/commentRelated/postNewComment/postNewCommentSubthread.js"));
app.use("/post/subcomment/comment/forum/listing", require("./routes/shared/forumRelated/commentRelated/postNewComment/subcomment/postNewComment.js"));
app.use("/react/thread/with/emoji", require("./routes/shared/forumRelated/emojiRelated/reactWithEmojiMainPost.js"));
app.use("/gather/communities/list", require("./routes/shared/forumRelated/communityRelated/gatherRandomCommunities/gatherRandomizedCommunities.js"));
app.use("/like/forum/listing/individual/responder", require("./routes/shared/forumRelated/likesDislikes/likes/likeForumPostAndNotifyOwner.js"));
app.use("/disliked/forum/listing/individual/responder", require("./routes/shared/forumRelated/likesDislikes/dislikes/dislikeForumPostAndNotifyOwner.js"));
app.use("/gather/active/hired/jobs/list/full", require("./routes/hackers/hiredRelatedLogic/fetchAllHiredListings/fetchListings.js"));
app.use("/gather/core/employer/data/related/hacking/gig", require("./routes/hackers/hiredRelatedLogic/fetchAllHiredListings/fetchEmployerRelatedData/fetchEmployerDataRestricted.js"));
app.use("/gather/archived/and/live/employer/listing", require("./routes/employers/employerListings/archived/gatherArchivedListing/gatherListingInfo.js"));
app.use("/notify/user/request/update/hacker", require("./routes/employers/employerListings/requestUpdateHacker/notifiyHackerRequestUpdate/requestUpdateFromHacker.js"));
app.use("/add/new/payment/method/employer", require("./routes/employers/paymentRelated/addNewPaymentMethod/addNewMethod.js"));
app.use("/gather/onboarding/stripe/link/data", require("./routes/hackers/onboardingStripe/initiateOnboarding/initiateFetchLinks.js"));
app.use("/check/account/mark/verified/applicable/hacker", require("./routes/hackers/onboardingStripe/checkMarkCompleteApplicable/checkAndMarkIfSo.js"));
app.use("/list/employer/capabilities/payments", require("./routes/employers/paymentRelated/capabilities/gatherPaymentCapabilities/gatherCapabilities.js"));
app.use("/modify/employer/capabilities/payments", require("./routes/employers/paymentRelated/capabilities/modify/modifyCapabilities.js"));
app.use("/gather/existing/payment/methods/employer/stripe", require("./routes/employers/paymentRelated/gatherPreviousPaymentMethods/gatherPreviousCardMethods/gatherCardMethods.js"));
app.use("/determine/primary/card/on/file", require("./routes/shared/paymentRelated/gatherPrimaryPaymentCard/primaryCardRetrival.js"));
app.use("/deposit/funds/specific/hacker/initialization/process", require("./routes/employers/hiredHackers/depositContractedFunds/depositFunds/depositFundsForHackerContract.js"));
app.use("/gather/employer/payment/methods/cards/only", require("./routes/employers/paymentRelated/gatherPreviousPaymentMethods/stripeCards/gatherStripeCards.js"));
app.use("/deposit/funds/specific/hacker/initialization/process/partial/specific", require("./routes/employers/hiredHackers/depositContractedFunds/partialDeposit/depositPartialFunds.js"));
app.use("/initialize/recurring/payment/contract/start", require("./routes/employers/hiredHackers/depositContractedFunds/recurring/initializeRecurringPayments/initializePayments.js"));
app.use("/fetch/price/by/id/quick", require("./routes/employers/hiredHackers/depositContractedFunds/fetchPriceByID/fetchPriceByID.js"));
app.use("/fetch/related/employer/listings/employer/account", require("./routes/employers/boostData/locateUserEmployerListings/locateListings.js"));
app.use("/boost/employer/listing/period/time", require("./routes/employers/boostData/boostEmployerListing/initializeBoostAndTakePayment.js"));
app.use("/gather/employer/listings/general/promoted/only", require("./routes/employers/employerListings/gatherListings/gatherBoostedListings/gatherBoosted/fetchBoostedListings.js"));
app.use("/boost/employer/profile/period/time", require("./routes/employers/boostData/initializeProfileBoost/initializeBoostAndPay.js"));
app.use("/gather/promoted/employer/accounts/sampled", require("./routes/employers/boostData/gatherBoostedEmployerProfiles/gatherProfilesEmployersPromoted.js"));
app.use("/heart/profile/employer/account", require("./routes/employers/profile/publicProfile/heartProfileEmployer/heartLoveEmployerProfile.js"));
app.use("/mark/profile/view/employer/account", require("./routes/employers/profile/publicProfile/markProfileView/markView.js"));
app.use("/start/following/employer/account", require("./routes/employers/profile/publicProfile/followEmployerUser/startFollowingThisEmployerUser.js"));
app.use("/bookmark/employer/profile/either/account/type", require("./routes/employers/profile/publicProfile/bookmarkProfile/bookmarkEmployerProfile.js"));
app.use("/purchase/account/tokens/either/account", require("./routes/shared/purchaseTokens/purchaseAccountTokensCredits.js"));
app.use("/upload/file/intro/video/employer/save/data", require("./routes/employers/companyIntroductoryVideo/createIntroVideo.js"));
app.use("/gather/cards/payment/methods/both/accounts", require("./routes/shared/paymentRelated/gatherCardsRelated/gatherRelevantCardsPerAccountType.js"));
app.use("/deposit/funds/account/both/account/types", require("./routes/shared/paymentRelated/accountBalance/topoffAccountBalance/topoff.js"));
app.use("/gather/availiable/stripe/bal", require("./routes/shared/paymentRelated/accountBalance/gatherBalance/fetchBal.js"));
app.use("/generate/twilio/access/token", require("./routes/shared/twilio/createToken/createAccessToken.js"));
app.use("/gather/account/notifications", require("./routes/shared/notifications/gatherNotifications.js"));
app.use("/fetch/profile/pic/video/only", require("./routes/shared/general/userInfo/gatherProfilePicVideoOnly/gatherResource.js"));
app.use("/mark/notification/viewed/both/account/types", require("./routes/shared/notifications/markSeen/markNotificationSeen.js"));
app.use("/gather/transactional/history/employer", require("./routes/employers/transactionalHistory/gatherTransactions/fetchTransactions.js"));
app.use("/gather/short/list/jobs", require("./routes/employers/employerListings/gatherListings/shortList/gatherShortList.js"));
app.use("/send/invite/video/chat/notification", require("./routes/employers/employerListings/videoInvite/sendVideoInvite/sendInvite.js"));
app.use("/gather/video/chat/info", require("./routes/shared/twilio/video/gatherVideoCallInfo/gatherInfo.js"));
app.use("/subscribe/membership/both/account/types", require("./routes/shared/subscriptions/subscribeToMembership/subscribe.js"));
app.use("/gather/both/account/payout/methods", require("./routes/shared/paymentRelated/payouts/gatherPayoutMethods/gatherPayoutsLinked.js"));
app.use("/create/payout/and/cashout/both/account/types", require("./routes/shared/paymentRelated/payouts/cashout/cashoutSelectedFundsCard.js"));
app.use("/gather/hired/employer/information/hacker/account", require("./routes/hackers/hiredRelatedLogic/fetchIndividualData/fetchHiredHackerData.js"));
app.use("/submit/data/employed/contract/data/hacker", require("./routes/hackers/hiredRelatedLogic/submitDataUpdates/submitProgressReport.js"));
app.use("/gather/hacker/submitted/information/employer/account", require("./routes/employers/hiredHackers/viewSubmittedData/viewSubmittedHackerDataFindings.js"));
app.use("/mark/complete/request/confirmation/hacker/account", require("./routes/hackers/hiredRelatedLogic/markCompleteRequestReview/markCompleteAndRequestAReview.js"));
app.use("/mark/complete/request/confirmation/employer/account", require("./routes/employers/hiredHackers/markCompleteRequestReview/markCompleteAndRequestAReview.js"));
app.use("/place/bid/software/listing", require("./routes/hackers/softwareHardwareMarketplace/bidOnAuction/placeNewBidAuction/placeANewBid.js"));
app.use("/submit/new/blog/post/admin", require("./routes/adminONLY/newBlogPost/postNewBlogPostUnauth.js"));
app.use("/gather/all/blogs/forward/facing", require("./routes/unauthenticated/blogs/gatherPreviousBlogs/gatherAllBlogs.js"));
app.use("/gather/individual/foward/facing/blog", require("./routes/unauthenticated/blogs/gatherIndividualBlog/gatherIndividualBlog.js"));
app.use("/gather/all/blogs/forward/facing/snippet", require("./routes/unauthenticated/blogs/gatherPreviousBlogs/gatherBreifListBlogs.js"));
app.use("/like/blog/post/authenticated", require("./routes/unauthenticated/blogs/reactToBlog/like/likeSpecificBlogPost.js"));
app.use("/dislike/blog/post/authenticated", require("./routes/unauthenticated/blogs/reactToBlog/dislike/processDislikeBlogPost.js"));
app.use("/post/comment/blog/post/forward/facing/side", require("./routes/unauthenticated/blogs/reactToBlog/commentRelated/postNewComment/postANewCommentBlogPost.js"));
app.use("/submit/access/code/review/check", require("./routes/hackers/hiredRelatedLogic/reviewLogic/enterReviewCodeGainAccess.js"));
app.use("/submit/review/for/employer/contract", require("./routes/hackers/hiredRelatedLogic/reviewLogic/submitReviewForEmployer.js"));
app.use("/submit/access/code/review/check/hacker", require("./routes/employers/hiredHackers/reviewLogic/enterReviewCodeGainAccess.js"));
app.use("/submit/review/for/hacker/contract", require("./routes/employers/hiredHackers/reviewLogic/submitReviewForHacker.js"));
app.use("/update/both/account/type/social/media/links", require("./routes/shared/profileRelated/socialMediaLinks/updateSocialMediaLinks.js"));
app.use("/handle/purchase/course/content/payment", require("./routes/shared/learningCoursesForSale/purchaseCourse/purchaseCourseContent.js"));
app.use("/verify/transfer/initiate", require("./routes/shared/paymentRelated/accountBalance/topoffAccountBalance/verifyTransaction.js"));
app.use("/gather/purchased/course/data/only", require("./routes/shared/learningCoursesForSale/purchasedCourseContent/fetchPreviouslyPurchasedCourses.js"));
app.use("/gather/purchased/course/data/profile", require("./routes/shared/learningCoursesForSale/purchasedCourseContent/fetchPurchasedContentCourse.js"));
app.use("/post/short/tutorial/course/instructional", require("./routes/hackers/tutorialCoursesShort/createNewTutorialCourse/createNewCourse.js"));
app.use("/gather/instructional/tutorial/courses/tutorials", require("./routes/hackers/tutorialCoursesShort/gatherCourses/gatherTutorialCourses.js"));
app.use("/gather/instructional/tutorial/course/singular", require("./routes/hackers/tutorialCoursesShort/gatherCourses/individual/gatherIndividualCourseData.js"));
app.use("/like/response/tutorial/individual/response", require("./routes/shared/learningCoursesForSale/tutorialRelated/respondToTutorial/like/likeRespondTutorialPost.js"));
app.use("/dislike/response/tutorial/individual/response", require("./routes/shared/learningCoursesForSale/tutorialRelated/respondToTutorial/dislike/dislikeRespondTutorialPost.js"));
app.use("/transfer/tip/amount/poster/user", require("./routes/shared/learningCoursesForSale/tutorialRelated/tipPostingUser/tipPosterUserTutorialVideo.js"));
app.use("/gather/reviews/only/both/account/types", require("./routes/shared/reviews/gatherReviews/gatherReviewsEachAccountType.js"));
app.use("/upload/new/blog/post/individual/public", require("./routes/shared/blogging/createNewBlog/createNewRestrictedBlog.js"));
app.use("/gather/blogs/randomized/short/restricted", require("./routes/shared/blogging/gatherBlogs/gatherRandomizedBlogs.js"));
app.use("/gather/blog/individual/randomized/short/restricted", require("./routes/shared/blogging/individual/gatherIndividualBlog.js"));
app.use("/like/blog/post/restricted/response", require("./routes/shared/blogging/individual/like/likeIndividualBlogPost.js"));
app.use("/dislike/blog/post/restricted/response", require("./routes/shared/blogging/individual/dislike/dislikeIndividualBlogPost.js"));
app.use("/mark/view/restricted/blog/individual", require("./routes/shared/blogging/individual/viewed/markBlogRestrictedView.js"));
app.use("/leave/comment/restricted/blog/content", require("./routes/shared/blogging/individual/comments/leaveAComment/leaveNewComment.js"));
app.use("/submit/comment/sub/reply/blog/content/restricted/response", require("./routes/shared/blogging/individual/comments/leaveAComment/leaveSubReplyToOP.js"));
app.use("/update/phone/number/employer", require("./routes/employers/profile/generalInformation/phoneNumber/updatePhoneNumber.js"));
app.use("/leave/comment/tutorial/video/content", require("./routes/hackers/tutorialCoursesShort/commentRelated/leaveInitialMainComment.js"));
app.use("/submit/comment/sub/reply/tutorial/video/content/response", require("./routes/hackers/tutorialCoursesShort/commentRelated/leaveSubReplyCommentToOP.js"));
app.use("/register/user/beta/testing/new", require("./routes/shared/betaTesting/addNewBetaUser/addNewUser.js"));
app.use("/gather/beta/testers/default", require("./routes/shared/betaTesting/gatherTesters/gatherTestersByAccountType.js"));
app.use("/send/invite/beta/user/testing", require("./routes/shared/betaTesting/inviteUser/inviteUserToBeta.js"));
app.use("/mark/view/tutorial/course/unique", require("./routes/shared/learningCoursesForSale/tutorialRelated/markViewUnique/markIndividualView.js"));
app.use("/send/email/password/recovery/attempt", require("./routes/authentication/login/forgotPassword/requestPasswordRequestEmail.js"));
app.use("/check/code/recovery/password/reset", require("./routes/authentication/login/forgotPassword/submitCheckCode/submitCodeAndCheckValid.js"));
app.use("/submit/password/change/relevant/email", require("./routes/authentication/login/forgotPassword/submitNewPasswordField/checkAndSubmitNewPassword.js"));
app.use("/gather/applicants/previous/all/contract/app", require("./routes/employers/employerListings/hireApplicant/gatherOtherApplicants/gatherAllApplicantDataSpecific.js"));
app.use("/gather/all/transactions/stripe/employer", require("./routes/employers/transactionalHistory/gatherTransactions/gatherIssuingTransactions.js"));
app.use("/gather/all/transactions/stripe/hacker", require("./routes/hackers/transactionalHistory/transactionalHistoryHacker.js"));
app.use("/send/phone/code/again/auth", require("./routes/authentication/twilio/resendCode/resendRepeatRequestedCode.js"));
app.use("/gather/hackers/random/general/leaderboards", require("./routes/hackers/leaderboards/gatherTopUsers.js"));
app.use("/mark/view/unauth/blog/post/anyone", require("./routes/unauthenticated/blogs/markView/markBlogViewAny.js"));

app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  console.log("hit *", __dirname);

  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

io.on("connection", socket => {

	console.log("New client connected");

	socket.on("newBidRecieved", (listing) => {
		console.log("NEW BID RECIEVED!...", listing);

		io.sockets.emit("newBidRecieved", listing);
	})

	socket.on("fireTutorialConfetti", (amount) => {
		console.log("Start displaying confetti - activate display...!", amount);

		io.sockets.emit("fireTutorialConfetti", amount);
	})

	socket.on("disconnect", () => console.log("Client disconnected"));
});

runCronJob();

Connection.open();

server.listen(PORT, () => {

	console.log(`app listening on port ${PORT}!`);
});