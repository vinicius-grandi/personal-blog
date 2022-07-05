import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import Info from '../components/signup/info';

export type FormState = {
  step: number;
  username: string;
  password: string;
};

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
  return (
    <Container>
      <Form>
        <Info nextStep={nextStep} />
      </Form>
    </Container>
  );
};

export default SignupPage;
