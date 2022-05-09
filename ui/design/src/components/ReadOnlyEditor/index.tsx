import * as React from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact, Editable, RenderElementProps } from 'slate-react';
import { withMentions, withImages, withTags, withLinks } from '../Editor/plugins';
import { renderElement, renderLeaf } from '../Editor/renderers';
import { ImageElement } from '@akashaorg/ui-awf-typings/lib/editor';
import ImageOverlay from '../ImageOverlay';

export interface IReadOnlyEditor {
  content: Descendant[];
  handleMentionClick?: (pubKey: string) => void;
  handleTagClick?: (name: string) => void;
  handleLinkClick?: (url: string) => void;
}

/**
 * loads a read-only version of slate
 * @param content - slate content to be rendered
 * @param handleMentionClick - click handler for mentions in the content
 * @param handleTagClick - click handler for tags in the content
 * @param handleLinkClick - click handler for links in the content, will open external links in new tab
 */
const ReadOnlyEditor: React.FC<IReadOnlyEditor> = props => {
  const { content, handleMentionClick, handleTagClick, handleLinkClick } = props;

  const [imageOverlayOpen, setImageOverlayOpen] = React.useState(false);
  const [value, setValue] = React.useState(content);
  const [imgUrl, setImgUrl] = React.useState<{ url: string; fallbackUrl?: string } | null>(null);

  /**
   * opens the fullscreen image modal and shows the clicked upon image in it
   */
  const handleClickImage = (element: ImageElement) => {
    setImgUrl(element);
    setImageOverlayOpen(true);
  };

  const closeImageOverlay = () => {
    setImageOverlayOpen(false);
  };

  /**
   * initialise the editor with required plugins to parse content
   */
  const editor = React.useMemo(
    () => withLinks(withTags(withMentions(withReact(withImages(createEditor()))))),
    [],
  );

  React.useEffect(() => {
    editor.children = content;
    setValue(content);
  }, [editor, content]);

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={() => {
          /**
           * it is a read only editor
           */
          return;
        }}
      >
        <Editable
          readOnly={true}
          renderElement={(renderProps: RenderElementProps) =>
            /**
             * pass the handlers for the various content elements in slate
             * pass null for handleDeleteImage because that is only supported when editing content
             */
            renderElement(
              renderProps,
              handleMentionClick,
              handleTagClick,
              handleLinkClick,
              null,
              handleClickImage,
            )
          }
          renderLeaf={renderLeaf}
        />
      </Slate>
      {imageOverlayOpen && <ImageOverlay src={imgUrl} closeModal={closeImageOverlay} />}
    </>
  );
};

export default ReadOnlyEditor;
