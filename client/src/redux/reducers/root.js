import { combineReducers } from "redux";
import auth from "./authentication/auth.js";
import Customizer from '../customizer/reducer';
import listingData from "./employer/listings/listingData.js";
import softwareListingSale from "./hackers/createSoftwareListing/createNewSoftwareListingSale.js";
import changeGlobalStyles from "./universal/index.js";
import applicationDetails from "./hackers/applyToEmployerListing/applicationInfo.js";
import streamingData from "./streaming/hackers/creation/createNewStreamData.js";
import sendbirdInitData from "./messaging/initialization/initReducer.js";
import courseData from "./courses/createNewCourse/index.js";

export default combineReducers({
	auth,
	Customizer,
	listingData,
	softwareListingSale,
	changeGlobalStyles,
	applicationDetails,
	streamingData,
	sendbirdInitData,
	courseData
});