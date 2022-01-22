import { CREATE_NEW_COURSE_DATA } from "../../types.js";

export const updateCourseInformationData = (item) => {
	return {
		type: CREATE_NEW_COURSE_DATA,
		payload: item
	}
}