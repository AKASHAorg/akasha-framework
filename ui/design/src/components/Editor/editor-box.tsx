import { Box } from 'grommet';
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { createEditor, Editor, Range, Transforms, Node, Text as SlateText } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact, ReactEditor } from 'slate-react';
import { Avatar } from '../Avatar/index';
import { IEntryData } from '../Cards/entry-cards/entry-box';
import { Icon } from '../Icon/index';
import { EmojiPopover, ImagePopover } from '../Popovers/index';
import { EmbedBox } from './embed-box';
import { FormatToolbar } from './format-toolbar';
import { CustomEditor } from './helpers';
import { withMentions, withImages, withTags } from './plugins';
import { renderElement, renderLeaf } from './renderers';
import { StyledBox, StyledEditable, StyledIconDiv } from './styled-editor-box';
import { Button } from '../Buttons';
import isHotkey from 'is-hotkey';
import { MentionPopover } from './mention-popover';
import { EditorMeter } from './editor-meter';
import { serializeToPlainText } from './serialize';

export interface IEditorBox {
  avatar?: string;
  ethAddress: string | null;
  postLabel?: string;
  placeholderLabel?: string;
  onPublish: any;
  embedEntryData?: IEntryData;
  minHeight?: string;
  withMeter?: boolean;
  getMentions: (query: string) => void;
  getTags: (query: string) => void;
  mentions?: {
    name: string;
    userName: string;
    pubKey: string;
    avatar: string;
    ethAddress: string;
    description: string;
    coverImage: string;
  }[];
  tags?: string[];
  // upload an URL or a file and returns a promise that resolves to an array
  uploadRequest?: (data: string | File, isUrl?: boolean) => any;
  publishingApp?: string;
  editorState: any;
  setEditorState: any;
}

export interface IMetadata {
  app: string;
  version: number;
  quote?: string;
  tags: string[];
  mentions: string[];
}

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const EditorBox: React.FC<IEditorBox> = props => {
  const {
    avatar,
    ethAddress,
    postLabel,
    placeholderLabel,
    onPublish,
    embedEntryData,
    minHeight,
    withMeter,
    getMentions,
    getTags,
    mentions = [],
    tags = [],
    uploadRequest,
    publishingApp = 'AkashaApp',
    editorState,
    setEditorState,
  } = props;

  const mentionPopoverRef: React.RefObject<HTMLDivElement> = useRef(null);
  const mediaIconRef: React.RefObject<HTMLDivElement> = useRef(null);
  const emojiIconRef: React.RefObject<HTMLDivElement> = useRef(null);

  const [mentionTargetRange, setMentionTargetRange] = useState<Range | null>(null);
  const [tagTargetRange, setTagTargetRange] = useState<Range | null>(null);
  const [index, setIndex] = useState(0);
  const [createTag, setCreateTag] = React.useState('');

  const [letterCount, setLetterCount] = useState(0);

  const [currentSelection, setCurrentSelection] = useState<Range | null>(null);

  const [publishDisabled, setPublishDisabled] = useState(true);

  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);
  const [emojiPopoverOpen, setEmojiPopoverOpen] = useState(false);

  const editor = useMemo(
    () => withTags(withMentions(withHistory(withReact(withImages(createEditor()))))),
    [],
  );

  useEffect(() => {
    countLetters();
    if (mentionTargetRange && mentions && mentions.length > 0) {
      const el = mentionPopoverRef.current;
      const domRange = ReactEditor.toDOMRange(editor, mentionTargetRange);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 20}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
    if (tagTargetRange && tags && tags.length > 0) {
      const el = mentionPopoverRef.current;
      const domRange = ReactEditor.toDOMRange(editor, tagTargetRange);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 20}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [mentions, tags, editor, index, mentionTargetRange, tagTargetRange, editor]);

  const handlePublish = () => {
    const content: any = editor;
    const metadata: IMetadata = {
      app: publishingApp,
      quote: embedEntryData?.entryId,
      tags: [],
      mentions: [],
      version: 1,
    };

    (function getMetadata(node: any) {
      if (node.type === 'mention') {
        metadata.mentions.push(node.pubKey as string);
      }
      if (node.type === 'tag') {
        metadata.tags.push(node.value as string);
      }
      if (node.children) {
        node.children.map((n: any) => getMetadata(n));
      }
    })({ children: content });
    const textContent: string = serializeToPlainText({ children: content });
    const data = { metadata, content, textContent, author: ethAddress };
    onPublish(data);
  };

  const reducer = (acc: number, val: number) => acc + val;
  const countLetters = () => {
    const textLength = editor.children
      .map((node: Node) => {
        if (SlateText.isText(node)) return node.text.length;
        if (node.children) {
          return node.children
            .map(child => {
              if (SlateText.isText(child)) return child.text.length;
              return 0;
            })
            .reduce(reducer);
        }
        return 0;
      })
      .reduce(reducer);

    if (textLength > 0) {
      setPublishDisabled(false);
    } else if (textLength === 0) {
      setPublishDisabled(true);
    }
    if (typeof setLetterCount === 'function') {
      setLetterCount(textLength);
    }
  };

  const handleChange = (value: Node[]) => {
    const textLength = value
      .map((node: Node) => {
        if (SlateText.isText(node)) return node.text.length;
        if (node.children) {
          return node.children
            .map(child => {
              if (SlateText.isText(child)) return child.text.length;
              return 0;
            })
            .reduce(reducer);
        }
        return 0;
      })
      .reduce(reducer);

    if (textLength > 280) {
      editor.selection = currentSelection;
      return;
    }
    setCurrentSelection(editor.selection);

    setEditorState(value);

    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: 'word' });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      const beforeMentionMatch = beforeText && beforeText.match(/^@(\w+)$/);
      // todo: proper matching /^#([a-z0-9]*)(\-?|.?)([a-z0-9]*)$/
      const beforeTagMatch = beforeText && beforeText.match(/^#(\w+)$/);
      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMentionMatch && afterMatch && beforeRange) {
        setMentionTargetRange(beforeRange);
        getMentions(beforeMentionMatch[1]);
        setIndex(0);
        return;
      }
      if (beforeTagMatch && afterMatch && beforeRange) {
        const tagName = beforeTagMatch[1];
        // .concat(beforeTagMatch[2], beforeTagMatch[3]);
        setTagTargetRange(beforeRange);
        getTags(tagName);
        setCreateTag(tagName);
        setIndex(0);
        return;
      }
    }

    setMentionTargetRange(null);
    setTagTargetRange(null);
  };

  const selectMention = (event: KeyboardEvent, mentionRange: Range) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const prevIndex = index >= mentions.length - 1 ? 0 : index + 1;
        setIndex(prevIndex);
        break;
      case 'ArrowUp':
        event.preventDefault();
        const nextIndex = index <= 0 ? mentions.length - 1 : index - 1;
        setIndex(nextIndex);
        break;
      case 'Tab':
      case 'Enter':
        event.preventDefault();
        Transforms.select(editor, mentionRange);
        CustomEditor.insertMention(editor, mentions[index]);
        setMentionTargetRange(null);
        break;
      case 'Escape':
        event.preventDefault();
        setMentionTargetRange(null);
        break;
    }
  };

  const selectTag = (event: KeyboardEvent, tagRange: Range) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const prevIndex = index >= tags.length - 1 ? 0 : index + 1;
        setIndex(prevIndex);
        break;
      case 'ArrowUp':
        event.preventDefault();
        const nextIndex = index <= 0 ? tags.length - 1 : index - 1;
        setIndex(nextIndex);
        break;
      case 'Tab':
      case 'Enter':
        event.preventDefault();
        Transforms.select(editor, tagRange);
        CustomEditor.insertTag(editor, tags[index]);
        setTagTargetRange(null);
        break;
      case 'Escape':
        event.preventDefault();
        setTagTargetRange(null);
        break;
    }
  };

  const onKeyDown = useCallback(
    event => {
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault();
          const mark = HOTKEYS[hotkey];
          CustomEditor.toggleFormat(editor, mark);
        }
      }
      if (mentionTargetRange && mentions.length > 0) {
        selectMention(event, mentionTargetRange);
      }
      if (tagTargetRange && tags.length > 0) {
        selectTag(event, tagTargetRange);
      } else if (tagTargetRange && [9, 13, 32].includes(event.keyCode) && createTag.length > 1) {
        Transforms.select(editor, tagTargetRange);
        CustomEditor.insertTag(editor, createTag);
        setTagTargetRange(null);
      }
    },
    [index, mentionTargetRange, tagTargetRange, mentions, tags],
  );

  const handleMediaClick = () => {
    setImagePopoverOpen(!imagePopoverOpen);
  };

  const closeImagePopover = () => {
    setImagePopoverOpen(false);
  };

  const openEmojiPicker = () => {
    setEmojiPopoverOpen(!emojiPopoverOpen);
  };

  const closeEmojiPicker = () => {
    setEmojiPopoverOpen(false);
  };

  const handleInsertImageLink = (url: string) => {
    if (!url) {
      return;
    }
    CustomEditor.insertImage(editor, url);
  };

  const handleInsertEmoji = (emojiCode: string) => {
    CustomEditor.insertText(editor, emojiCode);
  };

  const mentionsNames = mentions.map(mention => {
    return mention.userName || mention.ethAddress;
  });

  return (
    <StyledBox pad="none" justify="between" fill={true}>
      <Box
        direction="row"
        pad={{ horizontal: 'medium' }}
        align="start"
        overflow="auto"
        className="scrollBox"
        height={minHeight ? { min: minHeight } : undefined}
      >
        <Avatar src={avatar} ethAddress={ethAddress} margin={{ top: '0.5rem' }} />
        <Box width="100%" pad={{ horizontal: 'small' }} direction="row" justify="between">
          <Box fill={true}>
            <Slate editor={editor} value={editorState} onChange={handleChange}>
              <FormatToolbar />
              <StyledEditable
                placeholder={placeholderLabel}
                spellCheck={false}
                autoFocus={true}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={onKeyDown}
              />
              {mentionTargetRange && mentionsNames.length > 0 && (
                <MentionPopover
                  ref={mentionPopoverRef}
                  values={mentionsNames}
                  currentIndex={index}
                />
              )}
              {tagTargetRange && tags.length > 0 && (
                <MentionPopover ref={mentionPopoverRef} values={tags} currentIndex={index} />
              )}
            </Slate>
            {embedEntryData && (
              <Box pad={{ vertical: 'medium' }}>
                <EmbedBox embedEntryData={embedEntryData} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        direction="row"
        justify="between"
        fill="horizontal"
        pad={{ horizontal: 'medium', vertical: 'xsmall' }}
        flex={false}
      >
        <Box direction="row" gap="xsmall" align="center">
          <StyledIconDiv ref={emojiIconRef}>
            <Icon type="emoji" clickable={true} onClick={openEmojiPicker} size="md" />
          </StyledIconDiv>
          <StyledIconDiv ref={mediaIconRef}>
            <Icon type="image" clickable={true} onClick={handleMediaClick} size="md" />
          </StyledIconDiv>
        </Box>

        <Box direction="row" gap="small" align="center">
          {withMeter && <EditorMeter counter={letterCount} />}
          <Button
            primary={true}
            icon={<Icon type="send" color="white" />}
            label={postLabel}
            onClick={handlePublish}
            disabled={publishDisabled}
          />
        </Box>
      </Box>
      {imagePopoverOpen && mediaIconRef.current && (
        <ImagePopover
          target={mediaIconRef.current}
          closePopover={closeImagePopover}
          insertImage={handleInsertImageLink}
          uploadRequest={uploadRequest}
        />
      )}
      {emojiPopoverOpen && emojiIconRef.current && (
        <EmojiPopover
          target={emojiIconRef.current}
          closePopover={closeEmojiPicker}
          onClickEmoji={handleInsertEmoji}
        />
      )}
    </StyledBox>
  );
};

EditorBox.defaultProps = {
  postLabel: 'Post',
  placeholderLabel: 'Share your thoughts',
};

export default EditorBox;
