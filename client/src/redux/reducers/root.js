import { combineReducers } from "redux";
import auth from "./authentication/auth.js";
import Customizer from '../customizer/reducer';
import listingData from "./employer/listings/listingData.js";


export default combineReducers({
	auth,
	Customizer,
	listingData
});