import { NextPage } from 'next';
import PropTypes from 'prop-types';
import FormStateMemoryTypes from '../../lib/PropTypeValues';
import { FormState } from './FormState';
import Info from './Info';
import Verification from './Verification';

type StepProps = {
  formState: FormState;
  prevStep: () => void;
  nextStep: () => void;
  handleChange: (input: HTMLInputElement) => void;
};

const StepHandler: NextPage<StepProps> = ({
  formState, handleChange, nextStep, prevStep,
}) => {
  switch (formState.step) {
    case 1:
      return <Info handleChange={handleChange} nextStep={nextStep} />;
    case 2:
      return (
        <Verification
          handleChange={handleChange}
          prevStep={prevStep}
          formState={formState}
        />
      );
    default:
      return <h1>Something went really wrong</h1>;
  }
};

StepHandler.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  formState: FormStateMemoryTypes.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default StepHandler;
