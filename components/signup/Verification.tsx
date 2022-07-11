import { NextPage } from 'next';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormStateMemoryTypes from '../../lib/PropTypeValues';
import { FormState } from './FormState';
import { useBaseurl } from '../../contexts/baseurl';

const Verification: NextPage<{
  formState: FormState;
  prevStep: () => void;
  handleChange: (input: HTMLInputElement) => void;
}> = ({
  prevStep,
  handleChange,
  formState,
}) => {
  const [verificationCodeDisabled, setVerificationCodeDisabled] = useState(true);
  const { baseurl } = useBaseurl();
  const [statusMsg, setStatusMsg] = useState('');

  const verificationCodeHandler = async () => {
    setVerificationCodeDisabled(false);
    const formData = new FormData();
    const { code, username } = formState;

    formData.append('username', username);
    formData.append('code', code);
    try {
      const response = await fetch('/api/code/send', {
        method: 'post',
        body: formData,
      });
      const data = await response.json();
      setStatusMsg(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label htmlFor="code">
        Verification Code:
        <input
          type="text"
          id="code"
          name="code"
          onChange={(ev) => handleChange(ev.target)}
          disabled={verificationCodeDisabled}
        />
      </label>
      <p>{statusMsg}</p>
      <button type="button" onClick={verificationCodeHandler}>
        Send Code
      </button>
      <div>
        <button type="button" onClick={() => prevStep()}>
          Previous
        </button>
        <button type="submit" disabled={verificationCodeDisabled}>
          Continue
        </button>
      </div>
    </>
  );
};

Verification.propTypes = {
  prevStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formState: FormStateMemoryTypes.isRequired,
};

export default Verification;
