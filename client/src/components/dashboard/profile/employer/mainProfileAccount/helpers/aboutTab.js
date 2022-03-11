import React, { Fragment ,useState, useEffect } from 'react';
import { Col, Row, Card, CardBody, Media } from 'reactstrap';
import Lightbox from "react-image-lightbox";
import axios from 'axios';



const PhotosTabEmployerProfileHelper = () => {

    const [ images, setImage ] = useState([]) 
    const [ smallImages, setsmallImages ] = useState([])   

    const initilindex = { index:0, isOpen:false }
    const [ photoIndex, setPhotoIndex ] = useState(initilindex);

    const onMovePrev = () => {
        const prev = (photoIndex.index + images.length - 1) % images.length
        setPhotoIndex({...photoIndex,index:prev})
    }

    const  onMoveNext = () => {
        const next = (photoIndex.index + 1) % images.length
        setPhotoIndex({...photoIndex,index:next})
    }
    
    return (
        <Fragment>
            <Row>
                {smallImages.length > 0 ?
                    <Col sm="12">
                        <Card>
                            <CardBody className="my-gallery row gallery-with-description">
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:0, isOpen:true})
                                        }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:1, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:2, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:3, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:4, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:5, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:6, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:7, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:8, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:9, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:10, isOpen:true})
                                    }
                                        />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                                <figure className="col-xl-3 col-sm-6"><a href={null}  data-size="1600x950">
                                    <Media
                                        src={require(`../../../../../../assets/images/placeholder.png`)}
                                        alt="Gallery"
                                        className="img-thumbnail"
                                        onClick={() =>
                                        setPhotoIndex({ ...photoIndex,index:11, isOpen:true})
                                    }
                                    />
                                    <div className="caption">
                                        <h4>Portfolio Title</h4>
                                        <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                                    </div></a>
                                </figure>
                            </CardBody>
                        </Card>
                    </Col>
                :""}
           </Row>
            {photoIndex.isOpen && (
                    <Lightbox
                        mainSrc={require(`../../../../../../assets/images/placeholder.png`)}
                        nextSrc={require(`../../../../../../assets/images/placeholder.png`)}
                        prevSrc={require(`../../../../../../assets/images/placeholder.png`)}
                        imageTitle={photoIndex.index + 1 + "/" + images.length}
                        onCloseRequest={() => setPhotoIndex({ ...photoIndex,isOpen:false})}
                        onMovePrevRequest={onMovePrev}
                        onMoveNextRequest={onMoveNext}
                    />
            )}
        </Fragment>
    );
};

export default PhotosTabEmployerProfileHelper;