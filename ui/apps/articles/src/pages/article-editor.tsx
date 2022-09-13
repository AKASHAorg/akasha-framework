import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DS from '@akashaorg/design-system';
import { RootComponentProps } from '@akashaorg/typings/ui';

import ArticleEditorCard from '../components/article-editor-card';

const { Box, EditorToolbar, Icon, MainAreaCardBox, Text } = DS;

export interface IArticleEditorProps {
  className?: string;
}

const ArticleEditor: React.FC<RootComponentProps & IArticleEditorProps> = props => {
  const { className } = props;

  const [dropOpen, setDropOpen] = React.useState<string | null>(null);
  const [fontColor] = React.useState<string>('blue');
  const [listStyle, setListStyle] = React.useState<string>('listBulleted');
  const [alignStyle, setAlignStyle] = React.useState<string>('alignLeft');

  const navigate = useNavigate();
  const { t } = useTranslation('app-articles');

  const handleClickIcon = () => {
    navigate(-1);
  };

  const handleListIconClick = (iconType: string) => {
    setListStyle(iconType);
    setDropOpen(null);
  };

  const handleAlignIconClick = (iconType: string) => {
    setAlignStyle(iconType);
    setDropOpen(null);
  };

  const handleManageCollaborators = () => {
    props.navigateToModal({ name: 'manage-collaborators' });
  };

  const handleSaveDraft = () => {
    /** do something */
  };

  const handlePublish = () => {
    /** do something */
  };

  return (
    <MainAreaCardBox className={className}>
      <Box direction="row" pad="medium" fill="horizontal">
        <Icon type="chevronLeft" style={{ cursor: 'pointer' }} onClick={handleClickIcon} />
        <Text size="xlarge" weight="bold">
          {t('Article Editor')}
        </Text>
      </Box>
      <EditorToolbar
        dropOpen={dropOpen}
        fontColor={fontColor}
        listStyle={listStyle}
        alignStyle={alignStyle}
        wrapperBorder={{ side: 'horizontal', color: 'border' }}
        closeDrop={() => setDropOpen(null)}
        onDropOpen={type => setDropOpen(type)}
        onBoldClick={() => {
          /** */
        }}
        onItalicClick={() => {
          /** */
        }}
        onUnderlineClick={() => {
          /** */
        }}
        onStrikeThroughClick={() => {
          /** */
        }}
        onListIconClick={handleListIconClick}
        onAlignIconClick={handleAlignIconClick}
      />
      <ArticleEditorCard
        inviteCollaboratorsLabel={t('Invite collaborators')}
        collaboratingLabel={t('Collaborating')}
        saveDraftLabel={t('Save draft')}
        publishLabel={t('Publish')}
        canPublish={true}
        onManageCollaborators={handleManageCollaborators}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />
    </MainAreaCardBox>
  );
};

export default ArticleEditor;
