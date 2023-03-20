import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
let scrollPosition = 0;

export const Modal = ({ largeImageURL, tags, toggleModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    disableScroll();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      enableScroll();
    };
  }, [toggleModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({ top: scrollPosition });
    document.documentElement.style.scrollBehavior = '';
  };

  const disableScroll = () => {
    scrollPosition = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        top: -${scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${window.innerWidth - document.body.offsetWidth}px
      `;
    document.documentElement.style.scrollBehavior = 'unset';
  };

    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow src={largeImageURL} alt={tags} />
      </Overlay>,
      modalRoot
    );
  }
  Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    toggleModal: PropTypes.func.isRequired,
  };