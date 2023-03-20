import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };
    return (
      <Item>
        <Image onClick={toggleModal} src={webformatURL} alt={tags} />
        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            toggleModal={toggleModal}
          />
        )}
      </Item>
    );
  }

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};

export default ImageGalleryItem