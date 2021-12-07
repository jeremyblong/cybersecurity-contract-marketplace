import { LISTING_INFORMATION } from "../../../actions/types.js";

const initialState = {
	// listingData: {
	// 	testingDatesHackers: [],
	// 	listingDescription: "",
	// 	rulesOfEngagement: "",
	// 	assetArray: [], 
	// 	typeOfHack: {}, 
	// 	publicCompanyName: "", 
	// 	outOfScopeVulnerabilities: "", 
	// 	hashtags: [], 
	// 	businessAddress: {}, 
	// 	requiredRankToApply: {}, 
	// 	experienceAndCost: {}, 
	// 	desiredSkills: [], 
	// 	maxNumberOfApplicants: {}, 
	// 	disclosureVisibility: {}, 
	// 	tokensRequiredToApply: {}, 
	// 	listingVisibility: {}, 
	// 	estimatedCompletionDate: null
	// }
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LISTING_INFORMATION: 
			return {
				...state,
				listingData: action.payload
			}
		default: 
			return state;
	}
}