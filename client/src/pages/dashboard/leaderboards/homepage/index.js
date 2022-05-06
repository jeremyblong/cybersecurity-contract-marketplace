import React, { Fragment } from 'react';
import LeaderboardHomepageHelper from "../../../../components/dashboard/leaderboards/homepage/index.js";


const LeaderboardHomepagePage = (props) => {
    return (
        <Fragment>
            <LeaderboardHomepageHelper props={props} />
        </Fragment>
    );
}

export default LeaderboardHomepagePage;