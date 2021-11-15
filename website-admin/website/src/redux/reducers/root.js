import { combineReducers } from "redux";
import auth from "./authentication/auth.js";
import Customizer from '../customizer/reducer'


export default combineReducers({
	auth,
	Customizer
});