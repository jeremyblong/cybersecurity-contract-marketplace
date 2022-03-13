import React, { Fragment, useState, useEffect } from 'react';
import { Col, Row, Card, CardBody, Media } from 'reactstrap'
import Lightbox from "react-image-lightbox";
import axios from 'axios'
import helpers from "./miscFunctions/helperFunctions.js";


const { renderProfilePicVideoGallery } = helpers;

const PhotosTabEmployerProfileHelper = ({ employerData }) => {

    console.log("employerData", employerData);

    const [ images, setImage ] = useState([])  

    useEffect(() => {
        setTimeout(() => {
            if (typeof employerData.profilePicsVideos !== "undefined" && employerData.profilePicsVideos.length > 0) {
                setImage(employerData.profilePicsVideos);
            }
        },  575);
    }, [])

    console.log("images", images);

    const initilindex = { index:0, isOpen:false }
    const [ photoIndex, setPhotoIndex ] = useState(initilindex)

    const onMovePrev = () => {
        const prev = (photoIndex.index + images.length - 1) % images.length
        setPhotoIndex({ ...photoIndex, index: prev })
    }

    const  onMoveNext = () => {
        const next = (photoIndex.index + 1) % images.length
        setPhotoIndex({ ...photoIndex, index: next })
    }
    
    return (
        <Fragment>
            <Row>
                {typeof employerData.profilePicsVideos !== "undefined" && employerData.profilePicsVideos.length > 0 ?
                <Col sm="12">
                    <Card>
                        <CardBody className="my-gallery row gallery-with-description">
                            {employerData.profilePicsVideos.map((file, index) => {
                                return (
                                    <Fragment key={index}>
                                        <figure className="col-xl-3 col-sm-6"><a href={null} data-size="1600x950">
                                            {renderProfilePicVideoGallery(file, setPhotoIndex, photoIndex, index)}
                                            <div className="caption">
                                                <h4>Profile Picture #{index + 1}</h4>
                                                <p>{"This is one of the 'profile pictures' uploaded by this employer. This are in order from most oldest to newest (newest being last or lower)"}</p>
                                            </div></a>
                                        </figure>
                                    </Fragment>
                                );
                            })}
                        </CardBody>
                    </Card>
                </Col> : ""}
            </Row>
            {photoIndex.isOpen && (
                <Lightbox
                    mainSrc={`${process.env.REACT_APP_ASSET_LINK}/${images[photoIndex.index].link}`}
                    nextSrc={`${process.env.REACT_APP_ASSET_LINK}/${images[(photoIndex.index + 1) % images.length].link}`}
                    prevSrc={`${process.env.REACT_APP_ASSET_LINK}/${images[(photoIndex.index + images.length - 1) % images.length].link}`}
                    imageTitle={photoIndex.index + 1 + "/" + images.length}
                    onCloseRequest={() => setPhotoIndex({ ...photoIndex,isOpen:false })}
                    onMovePrevRequest={onMovePrev}
                    onMoveNextRequest={onMoveNext}
                />
            )}
        </Fragment>
    );
};

export default PhotosTabEmployerProfileHelper;