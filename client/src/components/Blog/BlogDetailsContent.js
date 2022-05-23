import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import Sidebar from './Sidebar';
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import moment from "moment";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Row, Col, Button } from "reactstrap";
import ShowMoreText from "react-show-more-text";
import "./styles.css";
import { confirmAlert } from 'react-confirm-alert';
import { connect } from "react-redux";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";



const BlogDetailsContent = ({ userData, authenticated }) => {

	const [ blog, setBlogData ] = useState(null);
	const [ ready, setReady ] = useState(false);
	const [ subtitleMore, setSubtitleMore ] = useState(false);
	const [ blogs, setBlogsState ] = useState([]);
	const [ blogIDS, setBlogIDS ] = useState([]);
	const [ commentText, setCommentText ] = useState("");

	const history = useHistory();

	const { id } = useParams();

	console.log("id", id);

	useEffect(() => {
		const configuration = {
			params: {
				id
			}
		}
		axios.get(`${process.env.REACT_APP_BASE_URL}/mark/view/unauth/blog/post/anyone`, configuration).then((res) => {
            if (res.data.message === "Successfully marked view!") {
                console.log("Successfully marked view!", res.data);
            } else {
                console.log("ERROR!...:", res.data);

                NotificationManager.error("We could not mark your 'view' for this blog post, your page view was NOT calculated/added!", "Could NOT mark view!", 4750);
            }
        }).catch((err) => {
            console.log("CRITICAL Successfully submitted data!...:", err);

            NotificationManager.error("We could not mark your 'view' for this blog post, your page view was NOT calculated/added!", "Could NOT mark view!", 4750);
        })
	}, []);

	useEffect(() => {
		const configuration = {
			params: {
				id
			}
		}
		axios.get(`${process.env.REACT_APP_BASE_URL}/gather/individual/foward/facing/blog`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered blog!") {
                console.log("Successfully gathered blog!", res.data);

				const { blog, blogIDS } = res.data;

				const blogIDArray = [];

				for (let index = 0; index < blogIDS.length; index++) {
					const id = blogIDS[index];
					blogIDArray.push(id.id);
				}

				setBlogIDS(blogIDArray);
				setBlogData(blog);
				setReady(true);
            } else {
                console.log("ERROR!...:", res.data);

                NotificationManager.error("We could NOT fetch the desired blog post data, an unknown error has occurred... Try reloading the page or contact support if the problem persists!", "Could NOT load blog post data!", 4750);
            }
        }).catch((err) => {
            console.log("CRITICAL Successfully submitted data!...:", err);

            NotificationManager.error("We could NOT fetch the desired blog post data, an unknown error has occurred... Try reloading the page or contact support if the problem persists!", "Could NOT load blog post data!", 4750);
        })
	}, [id]);

	useEffect(() => {
		const configuration = {};

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/all/blogs/forward/facing/snippet`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered blogs snippet!") {
                console.log(res.data);

                const { blogs } = res.data;

                setBlogsState(blogs);

            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
	}, []);

	const handleLikeReactionBlogPost = () => {
		console.log("handleLikeReactionBlogPost clicked..");

		if (authenticated === true) {
			confirmAlert({
				title: `Are you sure you'd like to 'like' this blog-post?`,
				message: `You're about to 'like' or respond to this blog post, are you sure you'd like to take this action? You can change this decision/action down the road at any time!`,
				buttons: [
				  {
					label: `Yes, 'like' this post!`,
					onClick: () => {
						console.log("liked!");
	
						const configuration = {
							blogID: blog.id,
							signedinUserID: userData.uniqueId,
							signedinUserFullName: `${userData.firstName} ${userData.lastName}`
						};
	
						axios.post(`${process.env.REACT_APP_BASE_URL}/like/blog/post/authenticated`, configuration).then((res) => {
							if (res.data.message === "Successfully 'liked' this blog post!") {
								console.log(res.data);
	
								const { blog } = res.data;
	
								setBlogData(blog);
							} else {
								console.log("Err", res.data);
							}
						}).catch((err) => {
							console.log(err);
						})
					}
				  },
				  {
					label: 'No, Cancel.',
					onClick: () => {
						console.log("cancelled.");
					}
				  }
				]
			});
		} else {
			NotificationManager.warning("You MUST be AUTHENTICATED *before* posting or attempting to 'react' to this blog post. Please LOGIN before attempting to react to this post otherwise, no action will be allowed.", "You MUST be authenticated to react!", 4750);
		}
	}
	const handleDislikeReactionBlogPost = () => {
		console.log("handleDislikeReactionBlogPost clicked..");

		if (authenticated === true) {
			confirmAlert({
				title: `Are you sure you'd like to 'dislike' this blog-post?`,
				message: `You're about to 'dislike' or respond to this blog post, are you sure you'd like to take this action? You can change this decision/action down the road at any time!`,
				buttons: [
				  {
					label: `Yes, 'dislike' this post!`,
					onClick: () => {
						console.log("disliked!");

						const configuration = {
							blogID: blog.id,
							signedinUserID: userData.uniqueId,
							signedinUserFullName: `${userData.firstName} ${userData.lastName}`
						};
	
						axios.post(`${process.env.REACT_APP_BASE_URL}/dislike/blog/post/authenticated`, configuration).then((res) => {
							if (res.data.message === "Successfully 'disliked' this blog post!") {
								console.log(res.data);
	
								const { blog } = res.data;
	
								setBlogData(blog);
							} else {
								console.log("Err", res.data);
							}
						}).catch((err) => {
							console.log(err);
						})
					}
				  },
				  {
					label: 'No, Cancel.',
					onClick: () => {
						console.log("cancelled.");
					}
				  }
				]
			});
		} else {
			NotificationManager.warning("You MUST be AUTHENTICATED *before* posting or attempting to 'react' to this blog post. Please LOGIN before attempting to react to this post otherwise, no action will be allowed.", "You MUST be authenticated to react!", 4750);
		}
	}

	const redirectToNextBlog = () => {
		
		const findIndex = blogs.findIndex((blog) => blog.id === id);

		console.log("findIndex", findIndex);

		const nextBlog = blogIDS[findIndex + 1];
		
		if (typeof nextBlog !== "undefined") {
			history.push(`/blog-details/${nextBlog}`);
		}
	}
	const redirectToPreviousBlog = () => {
		
		const findIndex = blogs.findIndex((blog) => blog.id === id);

		console.log("findIndex", findIndex);

		const previousBlog = blogIDS[findIndex - 1];
		
		if (typeof previousBlog !== "undefined") {
			history.push(`/blog-details/${previousBlog}`);
		}
	}
	const handleCommentSubmission = () => {
		console.log("handleCommentSubmission clicked/ran..");

		if (authenticated === true) {
			const configuration = {
				blogID: blog.id,
				signedinUserID: userData.uniqueId,
				signedinUserFullName: `${userData.firstName} ${userData.lastName}`,
				commentText,
				mostRecentProfilePicVideo: typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null, 
				signedinAccountType: userData.accountType
			};
	
			axios.post(`${process.env.REACT_APP_BASE_URL}/post/comment/blog/post/forward/facing/side`, configuration).then((res) => {
				if (res.data.message === "Successfully posted comment!") {
					console.log(res.data);
	
					const { blog } = res.data;
	
					setBlogData(blog);
					setCommentText("");
				} else {
					console.log("Err", res.data);
				}
			}).catch((err) => {
				console.log(err);
			})
		} else {
			NotificationManager.warning("You MUST be AUTHENTICATED *before* posting or attempting to 'react' to this blog post. Please LOGIN before attempting to react to this post otherwise, no action will be allowed.", "You MUST be authenticated to react!", 4750);
		}
	}
	console.log("blog", blog);

	console.log("blogs", blogs);

	const renderContentMain = () => {
		if (ready === true) {
			return (
				<Fragment>
					<div className="blog-details-desc">
						<div className="article-content">
							<h3>{blog.title}</h3>

							<Row style={{ marginTop: "22.5px" }}>
								<Col sm="12" md="12" lg="12" xl="12">
									<div className="entry-meta">
										<ul>
											<li>
												<span>Posted On:</span> 
												<Link to={"/"}>
													<a>{moment(blog.date).fromNow()}</a>
												</Link>
											</li>
											<li>
												<span>Posted By:</span> 
												<Link to={"/"}>
													<a>'The Hacker Marketplace'/ADMIN</a>
												</Link>
											</li>
										</ul>
									</div>
								</Col>
							</Row>
							<Row>
								<Col sm="12" md="12" lg="12" xl="12">
									<div className="entry-meta">
										<ul>
											<li>
												<span>Total View(s):</span> 
												<Link to={"/"}>
													<a>{blog.totalViews}</a>
												</Link>
											</li>
											<li>
												<span>Like(s):</span> 
												<Link to={"/"}>
													<a>{blog.likes}</a>
												</Link>
											</li>
											<li>
												<span>Dislikes(s):</span> 
												<Link to={"/"}>
													<a>{blog.dislikes}</a>
												</Link>
											</li>
										</ul>
									</div>
								</Col>
							</Row>

							<div className="article-image">
								<img src="/img/blog-details/blog-details.jpg" alt="image" />
							</div>

							<Row>
								<Col sm="12" md="6" lg="6" xl="6">
									<Button className={"btn-square-success"} outline style={{ width: "100%" }} color={"success-2x"} onClick={() => handleLikeReactionBlogPost()}>Like This Blog Post</Button>
								</Col>
								<Col sm="12" md="6" lg="6" xl="6">
									<Button className={"btn-square-danger"} outline style={{ width: "100%" }} color={"danger-2x"} onClick={() => handleDislikeReactionBlogPost()}>Dislike This Blog Post</Button>
								</Col>
							</Row>

							<blockquote className="flaticon-quote">
								<h3 className='subtitle-header-blog'>Sub-Title: </h3>
								<hr />
								<ShowMoreText
									lines={3}
									more="Show more"
									less="Show less"
									className="subtitleblog-class"
									anchorClass="my-anchor-css-class-blogging"
									onClick={() => setSubtitleMore(prevState => !prevState)}
									expanded={subtitleMore}
									truncatedEndingComponent={"... "}
								>
									<p>{blog.subtitle}</p>
								</ShowMoreText>
							</blockquote>

							<ReactMarkdown className='blog-desc-markdown-content' children={blog.body} remarkPlugins={[remarkGfm]} />
							
						</div>

						<div className="article-footer">
							<div className="article-tags">
								<span><i className='bx bx-share-alt'></i></span>

								<a to={"/"}>Share</a>
							</div>

							<div className="article-share">
								<ul className="social">
									<li>
										<a to="https://facebook.com/" target="_blank">
											<i className='bx bxl-facebook'></i>
										</a>
									</li>
									<li>
										<a to="https://twitter.com/" target="_blank">
											<i className='bx bxl-twitter'></i>
										</a>
									</li>
									<li>
										<a to="https://linkedin.com/" target="_blank">
											<i className='bx bxl-linkedin'></i>
										</a>
									</li>
									<li>
										<a to="https://pinterest.com/" target="_blank">
											<i className='bx bxl-pinterest-alt'></i>
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div className="post-navigation">
							<div className="navigation-links">
								<div className="nav-previous">
									<div>
										<a onClick={() => redirectToPreviousBlog()}>
											<i className='bx bx-left-arrow-alt'></i> Prev Post
										</a>
									</div>
								</div>

								<div className="nav-next">
									<div>
										<a onClick={() => redirectToNextBlog()}>Next Post <i className='bx bx-right-arrow-alt'></i></a>
									</div>
								</div>
							</div>
						</div>

						<div className="comments-area">
							<h3 className="comments-title">{typeof blog.comments !== "undefined" && blog.comments.length > 0 ? blog.comments.length : 0} Comment(s):</h3>

							<ol className="comment-list">
								{typeof blog.comments !== "undefined" && blog.comments.length > 0 ? blog.comments.map((comment, index) => {
									return (
										<Fragment key={index}>
											<li className="comment">
												<div className="comment-body">
													<footer className="comment-meta">
														<div className="comment-author vcard">
															{comment.posterPicOrVideo.type.includes("video") ? <ReactPlayer playing={true} loop={true} muted={true} width={75} height={75} className={"avatar"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${comment.posterPicOrVideo.link}`} /> : <img src={`${process.env.REACT_APP_ASSET_LINK}/${comment.posterPicOrVideo.link}`} className="avatar" alt="image" />}
															<b className="fn">{comment.posterName}</b>
															<span className="says">says:</span>
														</div>

														<div className="comment-metadata">
															<span>Posted {moment(comment.date).fromNow()}</span>
														</div>
													</footer>

													<div className="comment-content">
														<p>{comment.commentText}</p>
													</div>

													<div className="reply">
														<Link to={"/"}>
															<a className="comment-reply-link">Reply To This Comment</a>
														</Link>
													</div>
												</div>
											</li>
										</Fragment>
									);
								}) : <Fragment>
									<img src={require("../../assets/images/no-blog-comments.png")} className={"no-comments-blog"} />
								</Fragment>}
							</ol>

							<div className="comment-respond">
								<h3 className="comment-reply-title">Leave a Reply/Comment</h3>

								<form className="comment-form">
									<p className="comment-form-comment">
										<label>Comment Text (Enter whatever you'd like - simply share your <strong>thoughts!</strong>)</label>
										<textarea style={{ marginTop: "17.5px" }} placeholder={`Enter a value for this comment box BEFORE proceeding with 'posting' your comment...`} value={commentText} onChange={(e) => setCommentText(e.target.value)} name="comment" id="comment" cols="45" rows="7" required="required"></textarea>
									</p>
									<p className="form-submit">
										<Button style={{ width: "100%" }} onClick={() => handleCommentSubmission()} id="submit" color={"secondary"} className="btn-square-secondary submit">Post/Submit My Comment!</Button>
									</p>
								</form>
							</div>
						</div>
					</div>
				</Fragment>
			);
		} else {
			return renderSkelatonLoading();
		}
	}
	const renderSkelatonLoading = () => {
        return (
            <Fragment>
                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                    <p>
                        <Skeleton count={45} />
                    </p>
                </SkeletonTheme>
            </Fragment>
        );
    }
    return (
        <section className="blog-details-area ptb-100">
			<div className="container">
				<div className="row">
					<div className="col-lg-8 col-md-12">
						{renderContentMain()}
					</div>

					<div className="col-lg-4 col-md-12">
                        {/* Sidebar */}
                        <div className="blog-right-sidebar sidebar-pl-15">
                            <Sidebar blogs={typeof blogs !== "undefined" && blogs.length > 0 ? blogs : null} />
                        </div>
					</div>
				</div>
			</div>
		</section>
    )
}
const mapStateToProps = (state) => {
	return {
		userData: state.auth.data,
		authenticated: Object.keys(state.auth.data).length > 0 && _.has(state.auth.data, "firstName") &&  _.has(state.auth.data, "lastName") ? true : false
 	}
}
export default connect(mapStateToProps, { })(BlogDetailsContent);