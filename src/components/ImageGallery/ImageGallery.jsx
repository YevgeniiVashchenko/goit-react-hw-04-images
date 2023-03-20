import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../../services/fetch';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  SUCCESS: 'success',
};

export const ImageGallery = ({ query, page, handleCilck }) => {
  const [status, setStatus] = useState(Status.IDLE);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    async function handleFetch(query, page) {
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page);

        // Повернення пустого масиву з бекенду
        if (data.hits.length === 0) {
          setStatus(Status.IDLE);
          setIsMore(false);
          toast.error('No results were found for your request');
          return;
        }

        // Активація кнопки
        setIsMore(data.hits.length === 12);

        const newImages = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        // Перевірка на новий запит
        if (page === 1) {
          toast.success(`We found ${data.totalHits} images`);
          setStatus(Status.SUCCESS);
          setImages([...newImages]);
          window.scroll({ top: 0 });
        } else {
          setImages(prevState => [...prevState, ...newImages]);
        }

        //Остання сторінка запитів
        const totalPages = Math.ceil(data.totalHits / 12);
        if (page === totalPages && page > 1) {
          toast.info(`You reached end of results`);
        }
      } catch (error) {
        toast.error('Sorry, something went wrong. Please, try again');
        setStatus(Status.IDLE);
      } finally {
        setIsLoading(false);
      }
    }

    handleFetch(query, page);
  }, [query, page]);

    return (
      <>
        {isLoading && <Loader visible={isLoading} />}

        {status === 'success' && (
          <Gallery>
            {images.map(image => {
              return <ImageGalleryItem key={image.id} image={image} />;
            })}
          </Gallery>
        )}

        {isMore && <Button onClick={handleCilck} />}

        <ToastContainer autoClose={2000} />
      </>
    );
  }


ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  handleCilck: PropTypes.func.isRequired,
};

export default ImageGallery
