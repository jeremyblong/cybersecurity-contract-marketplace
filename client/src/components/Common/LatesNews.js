import React from 'react';
import {Link} from 'react-router-dom'; 

const LatesNews = () => {
    return (
        <section className="blog-area pb-70">
			<div className="container">
				<div className="section-title">
					<h2>Latest News From "The Hacker Marketplace"</h2>
					<p>View our blogs, updates and <strong>any new content</strong> availiable on "The Hacker Marketplace"! We post <strong>very frequently</strong> so make sure to <strong>stay tuned</strong> for breaking news, tutorials, updates on local cybersecurity "best practices" & much more..</p>
				</div>

				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<div className="single-blog">
							<img src="/img/blog/blog1.jpg" alt="Image" />

							<div className="blog-content">
								<h3>
                                    <Link to="/blog-details">
									    <a>Secure Managed IT</a>
                                    </Link>
								</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p>

                                <Link to="/blog-details">
                                    <a className="read-more">Read More</a>
                                </Link>
							</div>
						</div>
					</div>

					<div className="col-lg-4 col-sm-6">
						<div className="single-blog">
							<img src="/img/blog/blog2.jpg" alt="Image" />

							<div className="blog-content">
								<h3>
                                    <Link to="/blog-details">
                                        <a>Cloud Security</a>
                                    </Link>
								</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p>
								
                                <Link to="/blog-details">
                                    <a className="read-more">Read More</a>
                                </Link>
							</div>
						</div>
					</div>

					<div className="col-lg-4 col-sm-6 offset-sm-3 offset-lg-0">
						<div className="single-blog">
							<img src="/img/blog/blog3.jpg" alt="Image" />

							<div className="blog-content">
								<h3>
                                    <Link to="/blog-details">
                                        <a>Secure Managed Web</a>
                                    </Link>
								</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p>
								
                                <Link to="/blog-details">
                                    <a className="read-more">Read More</a>
                                </Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    )
}

export default LatesNews;