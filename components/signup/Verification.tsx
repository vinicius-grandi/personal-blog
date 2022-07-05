import { NextPage } from 'next';
import React from 'react';
import PropTypes from 'prop-types';

const Verification: NextPage<{ [key in ('nextStep' | 'prevStep')]: () => void }> = ({
  nextStep, prevStep,
}) => (
  <>
    <button type="submit" onClick={() => prevStep()}>
      Previous
    </button>
    <label htmlFor="username">
      username:
      <input type="text" id="username" name="username" />
    </label>
    <label htmlFor="username">
      password:
      <input type="text" id="password" name="password" />
    </label>
    <button type="submit" onClick={() => nextStep()}>
      Continue
    </button>
  </>
);

Verification.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default Verification;
