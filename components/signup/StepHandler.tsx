import { NextPage } from 'next';
import PropTypes from 'prop-types';
import Info from './info';
import Verification from './Verification';

type StepProps = {
  step?: number;
  prevStep: () => void;
  nextStep: () => void;
};

const StepHandler: NextPage<StepProps> = ({ step, nextStep, prevStep }) => {
  switch (step) {
    case 1:
      return <Info nextStep={nextStep} />;
    case 2:
      return <Verification nextStep={nextStep} prevStep={prevStep} />;
    default:
      return <h1>Something went really wrong</h1>;
  }
};

StepHandler.defaultProps = {
  step: 1,
};

StepHandler.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  step: PropTypes.number,
};

export default StepHandler;
