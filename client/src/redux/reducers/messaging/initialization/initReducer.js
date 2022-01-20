import { SAVE_INIT_SB_DATA } from "../../../actions/types.js";

export default (state = {}, action) => {
	switch (action.type) {
		case SAVE_INIT_SB_DATA: 
			return {
				...state,
				sendbirdInitData: action.payload
			}
		default: 
			return state;
	}
}