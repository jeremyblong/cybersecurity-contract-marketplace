import { SAVE_STREAM_PRE_DATA } from "../../../../actions/types.js";

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_STREAM_PRE_DATA: 
			return {
				...state,
				streamingPreInformation: action.payload
			}
		default: 
			return state;
	}
}