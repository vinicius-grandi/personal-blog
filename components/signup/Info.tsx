import { NextPage } from 'next';
import React from 'react';
import PropTypes from 'prop-types';

const Info: NextPage<{ nextStep: () => void }> = ({
  nextStep,
}) => (
  <>
    <label htmlFor="username">
      username:
      <input type="text" id="username" name="username" />
    </label>
    <label htmlFor="username">
      password:
      <input type="text" id="password" name="password" />
    </label>
    <button type="button" onClick={() => nextStep()}>
      Continue
    </button>
  </>
);

Info.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default Info;
