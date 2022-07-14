import { EditorState, RichUtils } from 'draft-js';
import { SetStateAction, Dispatch, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: baseline;
`;

const Bold = styled.button`
  background-color: #616161;
  color: white;
  padding: 0.46rem;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    background-color: #444444;
  }
`;

const HeaderStyle = styled.div`
  position: relative;
  height: 0;
  input {
    text-align: center;
    width: 100%;
    height: 30px;
  }
  &:hover {
    cursor: pointer;
  }
  input:hover {
    cursor: pointer;
    background-color: #a8a8a8;
  }
`;

function Tools({
  editorState,
  setEditorState,
}: {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
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
        <input type="text" value="H1" readOnly />
        {showOptions && (
          <>
            {Array.from(Array(3)).map((_, idx) => (
              <input type="text" value={`H${idx + 2}`} onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'))} readOnly />
            ))}
          </>
        )}
      </HeaderStyle>
      <Bold
        type="button"
        onClick={() => {
          setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
        }}
      >
        Italic
      </Bold>
    </Container>
  );
}

export default Tools;
