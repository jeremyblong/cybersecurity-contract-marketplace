import React, { Fragment } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";

const ConfirmationSuccessfullyPostedHelper = () => {
    // history object for redirects
    const history = useHistory();
    // return animated success message!
    return (
        <Fragment>
            <div className="bg-custom-unauthorized">
                <section className="wrapper-unauthorized">
                    <div className="container">
                        <div id="scene" className="scene" data-hover-only="false">
                            <div className="circle" data-depth="1.2"></div>
                            <div className="one" data-depth="0.9">
                                <div className="content">
                                    <span className="piece"></span>
                                    <span className="piece"></span>
                                    <span className="piece"></span>
                                </div>
                            </div>
                            <div className="two" data-depth="0.60">
                                <div className="content">
                                    <span className="piece"></span>
                                    <span className="piece"></span>
                                    <span className="piece"></span>
                                </div>
                            </div>
                            <div className="three" data-depth="0.40">
                                <div className="content">
                                    <span className="piece"></span>
                                    <span className="piece"></span>
                                    <span className="piece"></span>
                                </div>
                            </div>
                            <p id="custom404" className="p404" data-depth="0.50">Posted</p>
                            {/* <p id="custom404" className="p404" data-depth="0.10">Listing!</p> */}
                        </div>
                        <div className="text">
                            <article>
                                <p>Successfully posted your listing! <br />Your listing is now <strong>LIVE</strong> and <strong>VISIBLE</strong> to all of our user's, Good luck & we wish you the best luck!</p>
                                <button onClick={() => {
                                    history.push("/dashboard");
                                }}>Go To Homepage</button>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </Fragment>
    );
}
export default ConfirmationSuccessfullyPostedHelper;