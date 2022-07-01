import { NextPage } from 'next';
import PropTypes from 'prop-types';

interface Svg {
  strokeColor: string;
}

const SearchIcon: NextPage<Svg> = ({ strokeColor }) => (
  <svg
    width="61"
    height="61"
    viewBox="0 0 61 61"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.6905 39.2143C32.7118 39.2143 39.2143 32.7117 39.2143 24.6905C39.2143 16.6692 32.7118 10.1667 24.6905 10.1667C16.6692 10.1667 10.1667 16.6692 10.1667 24.6905C10.1667 32.7117 16.6692 39.2143 24.6905 39.2143Z"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M51.0396 50.8333L34.8571 34.8571"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

SearchIcon.propTypes = {
  strokeColor: PropTypes.string.isRequired,
};

export default SearchIcon;
