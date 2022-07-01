import { NextPage } from 'next';
import PropTypes from 'prop-types';

interface Svg {
  strokeColor: string;
}

const HomeIcon: NextPage<Svg> = ({ strokeColor }) => (
  <svg
    width="57"
    height="57"
    viewBox="0 0 57 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.07143 28.5L28.5 4.07144L52.9286 28.5"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 23.0714V44.7857C9.5 46.2848 10.7152 47.5 12.2143 47.5H20.3571C21.8562 47.5 23.0714 46.2848 23.0714 44.7857V33.9286C23.0714 32.4295 24.2867 31.2143 25.7857 31.2143H31.2143C32.7133 31.2143 33.9286 32.4295 33.9286 33.9286V44.7857C33.9286 46.2848 35.1438 47.5 36.6429 47.5H44.7857C46.2848 47.5 47.5 46.2848 47.5 44.7857V23.0714"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

HomeIcon.propTypes = {
  strokeColor: PropTypes.string.isRequired,
};

export default HomeIcon;
