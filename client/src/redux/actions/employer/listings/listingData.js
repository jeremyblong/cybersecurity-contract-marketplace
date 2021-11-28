import { LISTING_INFORMATION } from "../../types.js";

export const saveListingData = (item) => {
	return {
		type: LISTING_INFORMATION,
		payload: item
	}
}