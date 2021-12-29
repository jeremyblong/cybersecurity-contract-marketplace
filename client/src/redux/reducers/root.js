import { combineReducers } from "redux";
import auth from "./authentication/auth.js";
import Customizer from '../customizer/reducer';
import listingData from "./employer/listings/listingData.js";
import softwareListingSale from "./hackers/createSoftwareListing/createNewSoftwareListingSale.js";
import changeGlobalStyles from "./universal/index.js";

export default combineReducers({
	auth,
	Customizer,
	listingData,
	softwareListingSale,
	changeGlobalStyles
});