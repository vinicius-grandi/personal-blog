import { NextPage } from 'next';
import PropTypes from 'prop-types';
import Info from './Info';
import Verification from './Verification';

type StepProps = {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  handleChange: (input: HTMLInputElement) => void;
};

const StepHandler: NextPage<StepProps> = ({
  step, handleChange, nextStep, prevStep,
}) => {
  switch (step) {
    case 1:
      return <Info handleChange={handleChange} nextStep={nextStep} />;
    case 2:
      return <Verification nextStep={nextStep} prevStep={prevStep} />;
    default:
      return <h1>Something went really wrong</h1>;
  }
};

StepHandler.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default StepHandler;
