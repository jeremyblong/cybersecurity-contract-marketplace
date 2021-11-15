import React from 'react';
import { useRecoilState } from 'recoil'
import { collapsedState } from '../../utils/recoil-atoms'
import { Link } from 'react-router-dom';
import TopHeader from './TopHeader';

const Navbar = () => {
    const [collapsed, setCollapsed] = useRecoilState(collapsedState);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    React.useEffect(() => {
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        // window.scrollTo(0, 0);
    })

    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    return (
        <>
            <header className="header-area fixed-top">
                {/* TopHeader */}
                <TopHeader /> 

                <div className="nav-area">
                    <div id="navbar" className="navbar-area">
                        <div className="main-nav">
                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-md navbar-light">
                                    <Link to="/">
                                        <a onClick={() => setCollapsed(true)} className="navbar-brand">
                                            <img src="/img/logo.png" alt="logo" />
                                        </a>
                                    </Link>

                                    <button 
                                        onClick={toggleNavbar} 
                                        className={classTwo}
                                        type="button" 
                                        data-toggle="collapse" 
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                                        aria-expanded="false" 
                                        aria-label="Toggle navigation" 
                                    >
                                        <span className="icon-bar top-bar"></span>
                                        <span className="icon-bar middle-bar"></span>
                                        <span className="icon-bar bottom-bar"></span>
                                    </button>

                                    <div className={classOne} id="navbarSupportedContent">
                                        <ul className="navbar-nav m-auto">
                                            <li className="nav-item">
                                                <Link to="/#" activeClassName="active">
                                                    <a onClick={e => e.preventDefault()} className="nav-link">
                                                        Home <i className='bx bx-chevron-down'></i>
                                                    </a>
                                                </Link>

                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <Link to="/" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Home One</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/index2" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Home Two</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/index3" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Home Three</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/index4" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Home Four</a>
                                                        </Link>
                                                    </li> 

                                                    <li className="nav-item">
                                                        <Link to="/index5" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Home Five</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/index6" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Home Six</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="nav-item">
                                                <Link to="/about" activeClassName="active">
                                                    <a onClick={() => setCollapsed(true)} className="nav-link">About</a>
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link to="/#">
                                                    <a onClick={e => e.preventDefault()} className="nav-link">
                                                        Pages <i className='bx bx-chevron-down'></i>
                                                    </a>
                                                </Link>

                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <Link to="/pricing" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Pricing</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/testimonials" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Testimonials</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/team" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Team</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/faq" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">FAQ</a>
                                                        </Link>
                                                    </li>
 
                                                    <li className="nav-item">
                                                        <Link to="/#">
                                                            <a onClick={e => e.preventDefault()} className="nav-link">
                                                                User <i className='bx bx-chevron-down'></i>
                                                            </a>
                                                        </Link>

                                                        <ul className="dropdown-menu">
                                                            <li className="nav-item">
                                                                <Link to="/sign-in" activeClassName="active">
                                                                    <a onClick={() => setCollapsed(true)} className="nav-link">Sign In</a>
                                                                </Link>
                                                            </li>

                                                            <li className="nav-item">
                                                                <Link to="/sign-up" activeClassName="active">
                                                                    <a onClick={() => setCollapsed(true)} className="nav-link">Sign Up</a>
                                                                </Link>
                                                            </li>

                                                            <li className="nav-item">
                                                                <Link to="/forgot-password" activeClassName="active">
                                                                    <a onClick={() => setCollapsed(true)} className="nav-link">Forgot Password</a>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/coming-soon" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Coming Soon</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/404" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">404 Error Page</a>
                                                        </Link>
                                                    </li>
 
                                                    <li className="nav-item">
                                                        <Link to="/privacy-policy" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Privacy Policy</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/terms-conditions" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Terms & Conditions</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
 
                                            <li className="nav-item">
                                                <Link to="/#" activeClassName="active">
                                                    <a onClick={e => e.preventDefault()} className="nav-link">
                                                        Services <i className='bx bx-chevron-down'></i>
                                                    </a>
                                                </Link>
                                                
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <Link to="/services-one" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Services Style One</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/services-two" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Services Style Two</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/services-three" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Services Style Three</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/service-details" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Service Details</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
  
                                            <li className="nav-item">
                                                <Link to="/#">
                                                    <a onClick={e => e.preventDefault()} className="nav-link">
                                                        Blog <i className='bx bx-chevron-down'></i>
                                                    </a>
                                                </Link>

                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <Link to="/blog-grid" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Blog Grid</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/blog-left-sidebar" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Blog Left Sidebar</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/blog-right-sidebar" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Blog Right Sidebar</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to="/blog-details" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link">Blog Details</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="nav-item">
                                                <Link to="/contact" activeClassName="active">
                                                    <a onClick={() => setCollapsed(true)} className="nav-link">Contact</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="others-option">
                                        <div className="get-quote">
                                            <Link to="/sign-in">
                                                <a className="default-btn">
                                                    Login/Sign-Up - Dashboard
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
