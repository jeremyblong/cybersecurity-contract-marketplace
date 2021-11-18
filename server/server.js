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


app.use(cookieParser(config.get("COOKIE_SECRET")));

require("./strategies/jwtstrategy.js");
require("./strategies/localstrategy.js");
require("./schemas/authentication/authenticate.js");

aws.config.update({
    secretAccessKey: config.get("awsAccessKey"),
    accessKeyId: config.get("awsSecretKey"),
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
}
  
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


// routes go here...
app.use("/registration/hacker", require("./routes/authentication/registration/hacker/registerAsHacker.js"));
app.use("/login/hacker", require("./routes/authentication/login/hackerLogin.js"));
app.use("/login/employer", require("./routes/authentication/login/employerLogin.js"));
app.use("/refresh/token", require("./routes/authentication/refreshToken/refresh.js"));
app.use("/logout", require("./routes/authentication/logout/logout.js"));
app.use("/registration/employer", require("./routes/authentication/registration/employer/registerAsEmployer.js"));

app.get('*', function(req, res) {
  res.sendFile(__dirname, './client/public/index.html')
})

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