import * as React from 'react';
import { createEditor } from 'slate';
import { Slate, withReact, Editable, RenderElementProps } from 'slate-react';
import { withMentions, withImages, withTags } from './plugins';
import { renderElement, renderLeaf } from './renderers';

export interface IReadOnlyEditor {
  content: any;
  handleMentionClick?: (pubKey: string) => void;
  handleTagClick?: (name: string) => void;
}

const ReadOnlyEditor: React.FC<IReadOnlyEditor> = props => {
  const { content, handleMentionClick, handleTagClick } = props;
  const editor = React.useMemo(
    () => withTags(withMentions(withReact(withImages(createEditor())))),
    [],
  );
  return (
    <Slate
      editor={editor}
      value={content}
      onChange={() => {
        return;
      }}
    >
      <Editable
        readOnly={true}
        renderElement={(renderProps: RenderElementProps) =>
          renderElement(renderProps, handleMentionClick, handleTagClick)
        }
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

export { ReadOnlyEditor };
