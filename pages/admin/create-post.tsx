import { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Head from 'next/head';
import useUser from '../../lib/useUser';

const Title = styled.label`
  margin: 1rem 6rem;
  h1 {
    display: inline;
  }
  input {
    height: 100%;
  }
`;

const Main = styled.main`
  position: relative;
  margin: 1rem 6rem;
  a {
    color: blue;
    font-style: italic;
  }
  #save-btn {
    position: fixed;
    background-color: green;
    &:hover {
      background-color: #064d06;
    }
    padding: 0.4rem;
    color: white;
    bottom: 2rem;
    right: 2rem;
  }
  box-shadow: 0.4px 1px 2px #000;
  flex-grow: 1;
`;

const Editor = dynamic(() => import('../../components/textEditor/Editor'), {
  ssr: false,
});

export default function CreatePostPage() {
  const data = useUser(false);
  const [title, setTitle] = useState('');
  return (
    <>
      <Head>
        <title>Create New Post</title>
      </Head>
      <Title>
        <h1>Title:</h1>
        {' '}
        <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
      </Title>
      <Main>
        <Editor data={data} title={title} />
      </Main>
    </>
  );
}
