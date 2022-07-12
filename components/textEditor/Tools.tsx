import { EditorState, RichUtils } from 'draft-js';
import { SetStateAction, Dispatch, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Bold = styled.button`
  background-color: #616161;
  color: white;
  padding: 0.46rem;
  border-radius: 3px;
  margin: 1rem 0;
`;

const HeaderStyle = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  z-index: 1;
`;

function Tools({
  editorState,
  setEditorState,
}: {
  editorState: EditorState,
  setEditorState: Dispatch<SetStateAction<EditorState>>,
}): JSX.Element {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <Container>
      <Bold
        type="button"
        onClick={() => {
          setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
        }}
      >
        Bold
      </Bold>
      <HeaderStyle
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <input value="H1" readOnly />
        {showOptions && (
        <>
          <input value="H2" readOnly />
          <input value="H3" readOnly />
        </>
        )}
      </HeaderStyle>
    </Container>
  );
}

export default Tools;
