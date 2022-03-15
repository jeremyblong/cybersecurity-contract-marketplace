const express = require("express");
const app = express();
const config = require("config");
// init middleware
const bodyParser = require('body-parser');
const cors = require("cors");
// const server = http.createServer(app);
// const io = require('socket.io')(server, {
// 	cors: {
// 		origin: '*',
// 	}
// });
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

app.use(cookieParser(config.get("COOKIE_SECRET")));

require("./strategies/jwtstrategy.js");
require("./strategies/localstrategy.js");
require("./schemas/authentication/authenticate.js");

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
	origin: function (origin, callback) {
	  if (!origin || whitelist.indexOf(origin) !== -1) {
		callback(null, true)
	  } else {
		callback(new Error("Not allowed by CORS"))
	  }
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
app.use(helmet());
app.use(mongoSanitize());
app.use(limiter);
// ~ test route STARTS here ~
app.use("/activate/random/test/action", require("./routes/randomTestRoute.js"));
// ~ test route ENDS here ~


// routes go here...
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
// ~ webhook logic STARTS here ~
app.use("/passbase/webhook", require("./webhooks/passbase/webhook.js"));
// ~ webhook logic ENDS here ~

app.get('*', function(req, res) {
  res.sendFile(__dirname, './client/public/index.html');
});

app.get('*', cors(), function(_, res) {
	res.sendFile(__dirname, './client/build/index.html'), function(err) {
	  if (err) {
		res.status(500).send(err)
	  };
	};
});
    
app.get('/*', cors(), function(_, res) {
	res.sendFile(__dirname, './client/build/index.html'), function(err) {
		if (err) {
		res.status(500).send(err)
		};
	};
});

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", req.headers.origin);
// 	res.header("Access-Control-Allow-Credentials", true);
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// 	res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
// 	next();
// });

// io.on("connection", socket => {

// 	console.log("New client connected");

// 	socket.on("disconnect", () => console.log("Client disconnected"));
// });

Connection.open();

app.listen(PORT, () => {

	console.log(`app listening on port ${PORT}!`);
});


// NEED TO DO BEFORE PRODUCTION //
// 1. Change hardwired email to dynamic variable email in routes/authentication/login/emailAlert/alertViaEmailOfAuth.js "to" recipient