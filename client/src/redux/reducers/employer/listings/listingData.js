import { LISTING_INFORMATION } from "../../../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LISTING_INFORMATION: 
			return {
				...state,
				listingData: action.payload
			}
		default: 
			return state;
	}
}