import { SAVE_APPLICATION_DETAILS } from "../../types.js";

export const saveApplicationDetailsProgress = (item) => {
	return {
		type: SAVE_APPLICATION_DETAILS,
		payload: item
	}
}