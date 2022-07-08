import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import type { FormState } from '../components/signup/FormState.d';
import StepHandler from '../components/signup/StepHandler';
import { useBaseurl } from '../contexts/baseurl';

const Container = styled.div`
  background-color: #1c221f;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignupPage: NextPage<{ baseurl?: string }> = ({ baseurl }) => {
  const [formState, setFormState] = useState<FormState>({
    step: 1,
    username: '',
    password: '',
    code: '',
  });
  const { setBaseurl } = useBaseurl();
  const router = useRouter();

  if (setBaseurl && baseurl) {
    setBaseurl(baseurl ?? '');
  }
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
    if (response.status === 200) {
      await router.replace('/');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <StepHandler
          handleChange={handleChange}
          formState={formState}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </Form>
    </Container>
  );
};

SignupPage.propTypes = {
  baseurl: PropTypes.string,
};

SignupPage.defaultProps = {
  baseurl: '',
};

SignupPage.getInitialProps = async ({ req }) => {
  let baseurl: string | undefined = '';
  if (req) {
    baseurl = req.headers.host;
  }
  return { baseurl };
};

export default SignupPage;
