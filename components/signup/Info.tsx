import { NextPage } from 'next';
import React from 'react';
import PropTypes from 'prop-types';

const Info: NextPage<{
  nextStep: () => void,
  handleChange: (input: HTMLInputElement) => void,
  setErrMsg: (msg: string) => void,
  user: { username: string; password: string }
}> = ({
  nextStep,
  handleChange,
  user: { username, password },
  setErrMsg,
}) => (
  <>
    <label htmlFor="username">
      username:
      <input type="text" id="username" name="username" onChange={(ev) => handleChange(ev.target)} />
    </label>
    <label htmlFor="password">
      password:
      <input type="password" id="password" name="password" onChange={(ev) => handleChange(ev.target)} />
    </label>
    <button
      type="button"
      onClick={() => {
        if (username.length < 1 || password.length < 1) {
          return setErrMsg('Please, insert your user and password');
        }
        setErrMsg('');
        return nextStep();
      }}
      className="continue-btn"
    >
      Continue
    </button>
  </>
);

Info.propTypes = {
  nextStep: PropTypes.func.isRequired,
  setErrMsg: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export default Info;
