import { CHANGE_MAIN_STYLES } from "../../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_MAIN_STYLES: 
			return {
				...state,
				paneActive: action.payload
			}
		default: 
			return state;
	}
}