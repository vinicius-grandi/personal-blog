import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import type { FormState } from '../components/signup/FormState.d';
import Verification from '../components/signup/Verification';
import Info from '../components/signup/Info';
import useUser from '../lib/useUser';

const Container = styled.div`
  background-color: #1c221f;
  padding: 10%;
  margin: auto;
  max-width: 500px;
  min-width: 500px;
  height: 400px;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  flex-direction: column;
  align-content: center;
  color: #f4f4f4;
  *:not(input, div) {
    margin: 0.5rem;
  }
  label {
    display: flex;
    flex-direction: column;
  }
  button {
    background-color: #D9D9D9;
    padding: 0.5rem;
    font-size: 0.9rem;
    max-width: 100px;
    font-weight: 600;
    border-radius: 2px;
  }

  label {
    width: 100%;
  }

  input {
    height: 2rem;
  }

  .continue-btn {
    float: right;
    align-self: flex-end
  }
`;

const SignupPage: NextPage<{ baseurl?: string }> = () => {
  useUser(true);
  const [formState, setFormState] = useState<FormState>({
    step: 1,
    username: '',
    password: '',
    code: '',
  });
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();

  const nextStep = () => setFormState({ ...formState, step: formState.step + 1 });
  const prevStep = () => setFormState({ ...formState, step: formState.step - 1 });
  const handleChange = (input: HTMLInputElement) => {
    setFormState({ ...formState, [input.name]: input.value });
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { username, password, code } = formState;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('code', code);
    const response = await fetch('/api/signup', {
      method: 'post',
      body: formData,
    });
    const data = await response.json();
    setErrMsg(data.message ?? '');
    if (response.status === 200) {
      await router.replace('/');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} id="sign-up-form">
        <fieldset style={{ display: formState.step === 1 ? 'initial' : 'none' }}>
          <legend>information</legend>
          <Info
            handleChange={handleChange}
            nextStep={nextStep}
            setErrMsg={setErrMsg}
            user={{ username: formState.username, password: formState.password }}
          />
        </fieldset>
        <fieldset style={{ display: formState.step === 2 ? 'initial' : 'none' }}>
          <legend>verification</legend>
          <Verification
            handleChange={handleChange}
            prevStep={prevStep}
            formState={formState}
          />
        </fieldset>
        {errMsg.length > 0 && (
        <p>
          [err]
          {' '}
          {errMsg}
        </p>
        )}
      </Form>
    </Container>
  );
};

export default SignupPage;
