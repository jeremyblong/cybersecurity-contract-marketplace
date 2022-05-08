import React from 'react';
import {Link} from 'react-router-dom'; 

const PageBanner = ({pageTitle, homePageUrl, homePageText, activePageText}) => {
    return (
        <div id={"create-spacer-toppie"} className="page-title-area bg-22">
            <div className="container">
                <div className="page-title-content">
                    <h2>{pageTitle}</h2>
                    <ul>
                        <li>
                            <Link to={homePageUrl}>
                                <a>{homePageText}</a>
                            </Link>
                        </li>
                        <li>{activePageText}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PageBanner;