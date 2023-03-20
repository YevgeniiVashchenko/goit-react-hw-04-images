import PropTypes from 'prop-types';
import { Triangle } from 'react-loader-spinner';
import { Background } from './Loader.styled';

export const Loader = ({ visible }) => {
  return (
    <Background>
      <Triangle
        height="100"
        width="100"
        color="red"
        ariaLabel="triangle-loading"
        wrapperStyle={{position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%)',}}
        visible={visible}
      />
    </Background>
  );
};

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};