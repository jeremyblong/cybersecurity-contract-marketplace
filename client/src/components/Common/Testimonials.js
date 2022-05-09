import React from 'react';
import Slider from "react-slick";
import "./styles.css";


const settings = {
    dots: true,
    infinite: true,
    draggable: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 675,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
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

                {display ? <Slider className="client-wrap owl-carousel owl-theme" {...settings}>
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
                </Slider> : ''}
            </div>
        </section>
    )
}

export default Testimonials;