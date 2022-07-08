import PropTypes from 'prop-types';

const FormStatePropTypes = PropTypes.shape({
  step: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
});

export default FormStatePropTypes;
