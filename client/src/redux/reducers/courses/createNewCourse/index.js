import { CREATE_NEW_COURSE_DATA } from "../../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case CREATE_NEW_COURSE_DATA: 
			return {
				...state,
				courseData: action.payload
			}
		default: 
			return state;
	}
}