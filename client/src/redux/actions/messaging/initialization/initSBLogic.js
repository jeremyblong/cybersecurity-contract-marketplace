import { SAVE_INIT_SB_DATA } from "../../types.js";

export const saveSendbirdInitialData = (item) => {
	return {
		type: SAVE_INIT_SB_DATA,
		payload: item
	}
}