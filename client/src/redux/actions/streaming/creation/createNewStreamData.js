import { SAVE_STREAM_PRE_DATA } from "../../types.js";

export const saveStreamPreFilledData = (item) => {
	return {
		type: SAVE_STREAM_PRE_DATA,
		payload: item
	}
}