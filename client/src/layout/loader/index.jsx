import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import ReactPlayer from 'react-player';


const Loader = (props) => {

    const [show, setShow] = useState(true);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false)
        }, 4250);

        return () => {
            clearTimeout(timeout);
        }
       
    }, [show]);

    return (
        <Fragment>
            <div className={`loader-wrapper ${show ? '' : 'loderhide'}`}>
                {/* <div className="loader-index"><span></span></div> */}
                <ReactPlayer playing={true} loop={true} muted={true} height={"100%"} width={"100%"} className={"fullscreen-loader"} wrapper={"div"} url={require("../../assets/video/animated-loading.mp4")} />
                {/* <svg>
                    <defs></defs>
                    <filter id="goo">
                    <fegaussianblur in="SourceGraphic" stdDeviation="11" result="blur"></fegaussianblur>
                    <fecolormatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo">    </fecolormatrix>
                    </filter>
                </svg> */}
            </div>
        </Fragment>
    );
}

export default Loader;