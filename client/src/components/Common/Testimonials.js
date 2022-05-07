import React from 'react';
import OwlCarousel from 'react-owl-carousel3';
import "./styles.css";


const options = {
    loop:true,
    margin: 30,
    nav:false,
    mouseDrag: true,
    dots: false,
    autoplay: true,
    smartSpeed:1500,
    autoplayHoverPause: true,
    center: true,
    responsive:{
        0:{
            items:1,
        },
        768:{
            items:2,
        },
        992:{
            items:3,
        }
    }
};

const Testimonials = () => {
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])

    return (
        <section id={"client-area-bottom"} className="client-area ptb-100">
            <div className="container">
                <div className="section-title white-title">
					<h2>What Client's Say About Us</h2>
					<p>We have recently launched in the past weeks therefore we have very few if any reviews at the current moment. Stay tuned for future updates & posts once we gain more traction & feedback!</p>
				</div>

                {display ? <OwlCarousel 
                    className="client-wrap owl-carousel owl-theme"
                    {...options}
                > 
                    <div className="single-client">
                        <i className="quotes bx bxs-quote-alt-left"></i>
                        <p>No current or pending reviews - Stay tuned for future reviews as we just launching & building an audience...</p>

                        <ul>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                        </ul>

                        <div className="client-img">
                            <img src="/img/client-img/client1.jpg" alt="Image" />
                            <h3>N/A</h3>
                            <span>Developer</span>
                        </div>
                    </div>

                    <div className="single-client">
                        <i className="quotes bx bxs-quote-alt-left"></i>
                        <p>No current or pending reviews - Stay tuned for future reviews as we just launching & building an audience...</p>

                        <ul>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                        </ul>

                        <div className="client-img">
                            <img src="/img/client-img/client2.jpg" alt="Image" />
                            <h3>N/A</h3>
                            <span>CEO</span>
                        </div>
                    </div>

                    <div className="single-client">
                        <i className="quotes bx bxs-quote-alt-left"></i>
                        <p>No current or pending reviews - Stay tuned for future reviews as we just launching & building an audience...</p>

                        <ul>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                        </ul>

                        <div className="client-img">
                            <img src="/img/client-img/client3.jpg" alt="Image" />
                            <h3>N/A</h3>
                            <span>Designer</span>
                        </div>
                    </div>

                    <div className="single-client">
                        <i className="quotes bx bxs-quote-alt-left"></i>
                        <p>No current or pending reviews - Stay tuned for future reviews as we just launching & building an audience...</p>

                        <ul>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                        </ul>
                        
                        <div className="client-img">
                            <img src="/img/client-img/client4.jpg" alt="Image" />
                            <h3>N/A</h3>
                            <span>Developer</span>
                        </div>
                    </div>
                </OwlCarousel> : ''}
            </div>
        </section>
    )
}

export default Testimonials;