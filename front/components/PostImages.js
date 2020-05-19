import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, [showImagesZoom]);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, [showImagesZoom]);

  if ( images.length === 1 ) {
    return (
      <>
        <img src={`http://localhost:3065/${images[0].src}`} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  } 
  if ( images.length === 2 ) {
    return (
      <>
        <div>
          <img src={`http://localhost:3065/${images[0].src}`} width="50%" onClick={onZoom} />
          <img src={`http://localhost:3065/${images[1].src}`} width="50%" onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    ); 
  } 
  return (
    <>
      <div>
        <img src={`http://localhost:3065/${images[0].src}`} width="50%" onClick={onZoom} />
        <div style={{ display: 'inline-block', width: "50%", textAlign: 'center', verticalAlign: 'center'}} onClick={onZoom} >
          <Icon type="plus" />
          <br />
          {images.length - 1}
          個の写真をもっと見る。
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ 
    src: PropTypes.string,
  })).isRequired,
}

export default PostImages;