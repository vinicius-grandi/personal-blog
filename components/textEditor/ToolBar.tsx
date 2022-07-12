import { AnchorPlugin } from '@draft-js-plugins/anchor';
import { ToolbarProps } from '@draft-js-plugins/inline-toolbar';
import { EditorState } from 'draft-js';
import { ComponentType } from 'react';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

interface OverrideContentProps {
  getEditorState: () => EditorState
  setEditorState: (editorState: EditorState) => void
  onOverrideContent: (content: ComponentType<unknown> | undefined) => void
}

type OverrideOnOverrideContent = (
  content: ComponentType<OverrideContentProps> | undefined
) => void;

function ToolBar({
  linkPlugin,
  InlineToolbar,
}: { InlineToolbar: ComponentType<ToolbarProps>; linkPlugin: AnchorPlugin }) {
  return (
    <InlineToolbar>
      {
              ({ onOverrideContent, theme }) => (
                <div>
                  <linkPlugin.LinkButton
                    onOverrideContent={
                    onOverrideContent as OverrideOnOverrideContent
                  }
                    theme={theme}
                    key={1}
                  />
                </div>
              )
            }
    </InlineToolbar>
  );
}

export default ToolBar;
