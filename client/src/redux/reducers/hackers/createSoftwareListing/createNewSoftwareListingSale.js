import { SOFTWARE_LISTING_FOR_SALE } from "../../../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SOFTWARE_LISTING_FOR_SALE: 
			return {
				...state,
				softwareListingSaleInfo: action.payload
			}
		default: 
			return state;
	}
}