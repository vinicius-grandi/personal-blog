import Editor from '@draft-js-plugins/editor';
import { stateToHTML, Options } from 'draft-js-export-html';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import Immutable, { Iterator } from 'immutable';
import {
  EditorState,
  ContentState,
  RichUtils,
  EditorCommand,
  DraftHandleValue,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useMemo, useState } from 'react';
import ToolBar from './ToolBar';
import Tools from './Tools';
import { User } from '../../pages/api/user';

const blockRenderMap = Immutable.Map({
  h1: {
    element: 'h1',
  },
  h2: {
    element: 'h2',
  },
  h3: {
    element: 'h3',
  },
  h4: {
    element: 'h4',
  },
});

function EditorComponent({ data }: { data: User | undefined }): JSX.Element {
  const [post, setPost] = useState({ authorId: 0, title: '', content: '' });
  const { linkPlugin, InlineToolbar, plugins } = useMemo(() => {
    const lp = createLinkPlugin();
    const inlineTP = createInlineToolbarPlugin();
    return {
      linkPlugin: lp,
      InlineToolbar: inlineTP.InlineToolbar,
      plugins: [inlineTP, lp],
    };
  }, []);

  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(ContentState.createFromText('type here')),
  );

  const iteratorToArray = (iterator: Iterator<string>, arr: string[]): string[] => {
    const strArr: string[] = [...arr];
    const nextValue = iterator.next();
    if (nextValue.done) {
      return strArr;
    }
    strArr.push(nextValue.value);
    return iteratorToArray(iterator, strArr);
  };

  const handleSave = () => {
    if (data && data.user) {
      setPost({ ...post, authorId: data.user.id });
    }
    const keys = iteratorToArray(blockRenderMap.keys(), []);
    const blockRenderers: any = {};
    keys.forEach((val) => {
      blockRenderers[val] = (block: any) => `<h1>${block.getText()}</h1>`;
    });
    const options = {
      blockRenderers,
    };
    console.log(options);
    const html = stateToHTML(editorState.getCurrentContent(), options);
    console.log(html);
  };

  const handleKeyCommand = (
    command: EditorCommand,
    editorS: EditorState,
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorS, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    console.log(command);

    return 'not-handled';
  };

  return (
    <>
      <Tools editorState={editorState} setEditorState={setEditorState} />
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        editorKey="editor"
        handleKeyCommand={handleKeyCommand}
        plugins={plugins}
        blockRenderMap={blockRenderMap}
      />
      <ToolBar InlineToolbar={InlineToolbar} linkPlugin={linkPlugin} />
      <button id="save-btn" type="button" onClick={handleSave}>Save Post</button>
    </>
  );
}

export default EditorComponent;
