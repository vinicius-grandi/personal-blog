import { NextPage } from 'next';
import { useState } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';

const AdminPage: NextPage = () => {
  const [html, setHtml] = useState('my <strong>HTML</strong>');
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setHtml(e.target.value);

  return <DefaultEditor value={html} onChange={onChange} />;
};

export default AdminPage;
