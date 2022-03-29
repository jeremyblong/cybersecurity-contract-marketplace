import React from 'react';
import {Link} from 'react-router-dom'; 

const Features = () => {
    return (
        <div className="container pt-100">
            <div className="row">

                <div className="col-lg-4 col-sm-6 offset-sm-3 offset-lg-0">
                    <div className="single-features mb-0">
                        <h3><i className="bx bx-certification"></i> Testing <strong>BOTH</strong> PHYSICAL & DIGITAL <strong>assets/resources</strong> at a <strong>FRACTION</strong> of the cost!</h3>
                        <p>Test <strong>ALL</strong> of your company assets from physical security at your cooperate office or digital assets such as API endpoints, website's, mobile apps & many more various resources. Physical security can be <strong>JUST AS IMPORTANT</strong> to control, maintain and monitor as your digital assets. Don't slack on the most important aspects of your business, your server rooms, your employees computers & <strong>YOUR DATA</strong> most of all!</p>
                        <span className="bx bx-certification"></span>
                    </div>
                </div>

                <div className="col-lg-4 col-sm-6">
                    <div className="single-features">
                        <h3><i className="bx bx-check-shield"></i> Transparent/Honesty (Know Who You're Working With)</h3>
                        <p><strong>FULLY</strong> transparent & honest experience from start to finish. We require <strong>ALL</strong> hacker's & employers alike to verify their <strong>identity</strong> with physical documents before any invasive action can be taken! We take every precaution possible to protect <strong>BOTH</strong> parties in this process, just know you're in good hands..</p>
                        <span className="bx bx-check-shield"></span>
                    </div>
                </div>

                <div className="col-lg-4 col-sm-6">
                    <div className="single-features">
                        <h3><i className="bx bx-lock"></i> Completely Open Marketplace - Freely Engage/Interact!</h3>
                        <p>Our platform is set-up to allow user's to freely interact <strong>WITHOUT</strong> some outrageous time/wait-span until your account is active & you can start making money, make money almost <strong>IMMEDIATELY!</strong> We do have many checks and safeguards <em>however</em> they will not restrict you from most activity, only restricts engagement in certain activities.. We <strong>HIGHLY</strong> recommend authenticating your account as soon as possible though to better your ranking/level!</p>
                        <span className="bx bx-lock"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;