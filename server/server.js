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

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	next();
});

// io.on("connection", socket => {

// 	console.log("New client connected");

// 	socket.on("disconnect", () => console.log("Client disconnected"));
// });

Connection.open();

app.listen(PORT, () => {

	console.log(`app listening on port ${PORT}!`);
});