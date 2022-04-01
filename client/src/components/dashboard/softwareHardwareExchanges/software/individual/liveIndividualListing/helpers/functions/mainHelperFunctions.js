import React, { Fragment } from "react";

const preparePriceString = (item, openBidListPane) => {
    const type = item.auctionPurchaseType;
    // AUCTION LISTINGS (((ONLY)))
    if (type.includes("auction")) {
        if (type === "auction-ONLY") {
            const bids = item.bids;
            const currentPrice = Number(item.currentBidPrice);
            return (
                <Fragment>
                    <p onClick={() => openBidListPane(true)} className={"price-price-header price-price-header-topper"}><code className={"custom-price-tag"}>{`${bids.length}`}</code> {"current bids"}</p>
                    <div />
                    <p className={"price-price-header"}><code className={"custom-price-tag"}>{`$${currentPrice.toFixed(2)}(USD)`}</code> current price (${item.auctionPriceRelatedData.biddingIncrementInterval.value.toFixed(2)} Minimum Bid Increment)</p>
                    <div />
                    <p className={"price-price-header"}>Auction ONLY</p>
                    <div />
                </Fragment>
            );
        } else if (type === "auction-AND-buy-it-now") {
            const reservePrice = item.auctionPriceRelatedData.reservePrice;
            const buyitnowPrice = item.auctionPriceRelatedData.buyItNowData.buyItNowPrice;
            const currentPrice = Number(item.currentBidPrice);
            const bids = item.bids;
            return (
                <Fragment>
                    <p onClick={() => openBidListPane(true)} className={"price-price-header price-price-header-topper"}><code className={"custom-price-tag"}>{`$${currentPrice.toFixed(2)}(USD)`}</code> current price (${item.auctionPriceRelatedData.biddingIncrementInterval.value.toFixed(2)} Minimum Bid Increment)</p>
                    <div />
                    <p className={"price-price-header"}><code className={"custom-price-tag"}>{bids.length}</code> current bids</p>
                    <div />
                    <p className={"price-price-header"}><code className={"custom-price-tag"}>{`$${buyitnowPrice.toFixed(2)}(USD)`}</code> to "Buy-it-now" (immediate purchase)</p>
                    <div />
                    <p className={"price-price-header"}><code className={"custom-price-tag"}>{`$${reservePrice.toFixed(2)}(USD)`}</code> {"reserved price"}</p>
                    <div />
                </Fragment>
            );
        } 
        // BUY IT NOW LISTINGS (((ONLY)))
    } else {
        // create buy-it-now variable
        const buyitnow = item.auctionPriceRelatedData.buyItNowPrice;
        // buy it now OR best offer
        if (type === "buy-it-now-OR-best-offer") {
            // create minoffer variable for string below
            const minOffer = item.auctionPriceRelatedData.offerFeatureData.minimumRequiredOfferValue;
            // RETURN both best - offer buy it now
            return (
                <Fragment>
                    <p className={"price-price-header"}><code className={"custom-price-tag"}>{`$${buyitnow.toFixed(2)}(USD)`}</code> buy-it-now price</p>
                    <div />
                    <p className={"price-price-header"}><code className={"custom-price-tag"}>{`$${minOffer.toFixed(2)}(USD)`}</code> minimum offer (must offer at least this value)</p>
                    <div />
                    {/* <p className={"price-price-header"}><code className={"custom-price-tag"}>{`$${buyitnowPrice.toFixed(2)}`}</code> to "Buy-it-now" (immediate purchase)</p>
                    <div />
                    <p className={"price-price-header"}><code className={"custom-price-tag"}>{`$${reservePrice.toFixed(2)}`}</code> {"reserved price"}</p> */}
                </Fragment>
            );
        } else if (type === "buy-it-now-ONLY") {
            return (
                <Fragment>
                    <p className={"price-price-header"}><code className={"custom-price-tag"}>{`$${buyitnow.toFixed(2)}(USD)`}</code> buy-it-now (ONLY) price</p>
                    <div />
                    <p className={"price-price-header"}><code className={"custom-price-tag"}>{"Buy-it-now ONLY"}</code></p>
                    <div />
                </Fragment>
            );
        }
    }
}

export default {
    preparePriceString
};