import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import type { FormState } from '../components/signup/FormState.d';
import StepHandler from '../components/signup/StepHandler';

const Container = styled.div`
  background-color: #1c221f;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignupPage: NextPage = () => {
  const [formState, setFormState] = useState<FormState>({
    step: 1,
    username: '',
    password: '',
  });
  const nextStep = () => setFormState({ ...formState, step: formState.step + 1 });
  const prevStep = () => setFormState({ ...formState, step: formState.step - 1 });
  const handleChange = (input: HTMLInputElement) => {
    setFormState({ ...formState, [input.name]: input.value });
  };
  return (
    <Container>
      <Form>
        <StepHandler
          handleChange={handleChange}
          step={formState.step}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </Form>
    </Container>
  );
};

export default SignupPage;
