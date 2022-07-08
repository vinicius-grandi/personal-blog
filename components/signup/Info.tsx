import { NextPage } from 'next';
import React from 'react';
import PropTypes from 'prop-types';

const Info: NextPage<{ nextStep: () => void, handleChange: (input: HTMLInputElement) => void,
}> = ({
  nextStep,
  handleChange,
}) => (
  <>
    <label htmlFor="username">
      username:
      <input type="text" id="username" name="username" onChange={(ev) => handleChange(ev.target)} />
    </label>
    <label htmlFor="password">
      password:
      <input type="text" id="password" name="password" onChange={(ev) => handleChange(ev.target)} />
    </label>
    <button type="button" onClick={() => nextStep()}>
      Continue
    </button>
  </>
);

Info.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Info;
