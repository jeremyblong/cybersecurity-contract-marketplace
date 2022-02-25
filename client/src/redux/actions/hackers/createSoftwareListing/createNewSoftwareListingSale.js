import { SOFTWARE_LISTING_FOR_SALE } from "../../types.js";

export const saveSoftwareListingInfo = (item) => {
	return {
		type: SOFTWARE_LISTING_FOR_SALE,
		payload: item
	}
}