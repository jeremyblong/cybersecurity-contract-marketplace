import React from 'react';
import { useHistory } from "react-router-dom";

const Custom404 = () => {
    const history = useHistory();
    return (
        <div className="error-area">
            <div className="d-table">
                <div className="d-table-cell">
                    <div className="container">
                        <div className="error-content-wrap">
                            <img src="/img/404.png" alt="Image" />
                            <h3>Unauthorized access - Please login to view this page.</h3>
                            <p>The page you were looking for could not be accessed without being authenticated. Please sign-in if you wish to visit this page.</p>
                            <button onClick={() => {
                                history.push("/sign-in")
                            }}>
                                <a className="default-btn page-btn">
                                    Sign-in
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Custom404;