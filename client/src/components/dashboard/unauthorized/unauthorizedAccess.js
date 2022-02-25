import React, { Component } from 'react';
import "./styles.css";

class UnauthorizedAccessHelper extends Component {
    render() {
        return (
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
                            <p className="p404" data-depth="0.50">Restricted!</p>
                            <p className="p404" data-depth="0.10">Restricted!</p>
                        </div>
                        <div className="text">
                            <article>
                                <p>Uh oh! Looks like you got lost. <br />This page requires certain account privileges and unfortunately your account does NOT meet the requirements...</p>
                                <button>Go Back</button>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default UnauthorizedAccessHelper;
