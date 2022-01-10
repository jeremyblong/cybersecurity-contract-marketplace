import { SAVE_APPLICATION_DETAILS } from "../../../actions/types.js";

const initialState = {

};

export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_APPLICATION_DETAILS: 
			return {
				...state,
				applicationDetails: action.payload
			}
		default: 
			return state;
	}
}