import { CHANGE_MAIN_STYLES } from "../types.js";

export const shiftCoreStyles = (item) => {
	return {
		type: CHANGE_MAIN_STYLES,
		payload: item
	}
}