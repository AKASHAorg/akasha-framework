import React, { useState, useEffect } from 'react';
import { CropperProps } from 'react-easy-crop';

import { Profile } from '@akashaorg/typings/ui';

import Avatar from '@akashaorg/design-system-core/lib/components/Avatar';
import Box from '@akashaorg/design-system-core/lib/components/Box';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import List, { ListProps } from '@akashaorg/design-system-core/lib/components/List';
import { ModalProps } from '@akashaorg/design-system-core/lib/components/Modal';

import { getColorClasses } from '@akashaorg/design-system-core/lib/utils/getColorClasses';
import { useCloseActions } from '@akashaorg/design-system-core/lib/utils/useCloseActions';

import { EditImageModal } from './EditImageModal';
import { DeleteImageModal } from './DeleteImageModal';

type ImageType = 'avatar' | 'cover-image';

export type HeaderProps = {
  coverImage: Profile['background'];
  avatar: Profile['avatar'];
  profileId: Profile['did']['id'];
  title: string;
  cancelLabel: string;
  deleteLabel: string;
  saveLabel: string;
  imageTitle: { avatar: ModalProps['title']; coverImage: ModalProps['title'] };
  deleteTitle: { avatar: ModalProps['title']; coverImage: ModalProps['title'] };
  confirmationLabel: { avatar: string; coverImage: string };
  dragToRepositionLabel: string;
  onAvatarChange: (avatar?: File) => void;
  onCoverImageChange: (coverImage?: File) => void;
  onImageDelete: (type: ImageType) => void;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  coverImage,
  profileId,
  avatar,
  cancelLabel,
  deleteLabel,
  saveLabel,
  imageTitle,
  deleteTitle,
  confirmationLabel,
  dragToRepositionLabel,
  onAvatarChange,
  onCoverImageChange,
  onImageDelete,
}) => {
  const uploadInputRef: React.RefObject<HTMLInputElement> = React.useRef(null);
  const [showAvatarActions, setShowAvatarActions] = useState(false);
  const [showCoverActions, setShowCoverDropdown] = useState(false);
  const [imageType, setImageType] = useState<ImageType>();
  const [showEditImage, setShowEditImage] = useState(false);
  const [showDeleteImage, setShowDeleteImage] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [coverImageUrl, setCoverImageUrl] = useState(coverImage);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const editAvatarRef = useCloseActions(() => {
    setShowAvatarActions(false);
  });

  const editCoverRef = useCloseActions(() => {
    setShowCoverDropdown(false);
  });

  const closeActionsDropDown = () => {
    switch (imageType) {
      case 'avatar':
        setShowAvatarActions(false);
        return;
      case 'cover-image':
        setShowCoverDropdown(false);
        return;
    }
  };

  const dropDownActions: ListProps['items'] = [
    {
      label: 'Upload',
      icon: 'ArrowUpOnSquareIcon',
      onClick: () => {
        if (uploadInputRef.current) uploadInputRef.current.click();
        closeActionsDropDown();
      },
    },
    {
      label: 'Edit',
      icon: 'PencilIcon',
      onClick: () => {
        setShowEditImage(true);
        closeActionsDropDown();
      },
    },
    {
      label: 'Delete',
      icon: 'TrashIcon',
      color: { light: 'errorLight', dark: 'errorDark' },
      onClick: () => {
        setShowDeleteImage(true);
        closeActionsDropDown();
      },
    },
  ];

  const imageModalProps: Partial<CropperProps> =
    imageType === 'avatar'
      ? { aspect: 250 / 250, cropShape: 'round' }
      : { aspect: 560 / 169, objectFit: 'contain' };

  const onSave = image => {
    if (image) {
      switch (imageType) {
        case 'avatar':
          setAvatarFile(image);
          setAvatarUrl({ default: { src: URL.createObjectURL(image), width: 0, height: 0 } });
          break;
        case 'cover-image':
          setCoverImageFile(image);
          setCoverImageUrl({ default: { src: URL.createObjectURL(image), width: 0, height: 0 } });
      }
    }
    setShowEditImage(false);
  };

  const onDelete = () => {
    switch (imageType) {
      case 'avatar':
        onImageDelete('avatar');
        setAvatarUrl(null);
        break;
      case 'cover-image':
        onImageDelete('cover-image');
        setCoverImageUrl(null);
    }
    setShowDeleteImage(false);
  };

  const onUpload = (image: File) => {
    if (image) {
      switch (imageType) {
        case 'avatar':
          setAvatarFile(image);
          setAvatarUrl({ default: { src: URL.createObjectURL(image), width: 0, height: 0 } });
          break;
        case 'cover-image':
          setCoverImageFile(image);
          setCoverImageUrl({ default: { src: URL.createObjectURL(image), width: 0, height: 0 } });
      }
    }
    uploadInputRef.current.value = null;
  };

  useEffect(() => {
    onAvatarChange(avatarFile);
  }, [onAvatarChange, avatarFile]);

  useEffect(() => {
    onCoverImageChange(coverImageFile);
  }, [onCoverImageChange, coverImageFile]);

  return (
    <Stack direction="column" spacing="gap-y-2">
      <Text variant="h6">{title}</Text>
      <Box customStyle="relative mb-8">
        <Card
          radius={20}
          background={{ light: 'grey7', dark: 'grey5' }}
          customStyle={`flex p-4 h-28 w-full bg-no-repeat bg-center bg-cover bg-[url(${coverImageUrl?.default?.src})]`}
          ref={editCoverRef}
        >
          <Stack direction="column" spacing="gap-y-1" customStyle="relative mt-auto ml-auto">
            <Button
              icon="PencilSquareIcon"
              size="xs"
              variant="primary"
              onClick={() => {
                setShowCoverDropdown(!showCoverActions);
                setImageType('cover-image');
              }}
              greyBg
              iconOnly
            />
            {showCoverActions && (
              <List items={dropDownActions} customStyle="absolute right-0 top-7" />
            )}
          </Stack>
        </Card>
        <Stack
          align="center"
          justify="center"
          customStyle="absolute left-6 -bottom-8"
          ref={editAvatarRef}
        >
          <Avatar
            profileId={profileId}
            size="lg"
            avatar={avatarUrl}
            customStyle={`border-2 ${getColorClasses(
              {
                light: 'white',
                dark: 'grey2',
              },
              'border',
            )} ${getColorClasses(
              {
                light: 'grey8',
                dark: 'grey4',
              },
              'bg',
            )}`}
          />
          <Box customStyle="absolute">
            <Button
              icon="PencilSquareIcon"
              size="xs"
              variant="primary"
              onClick={() => {
                setShowAvatarActions(!showAvatarActions);
                setImageType('avatar');
              }}
              greyBg
              iconOnly
            />
            {showAvatarActions && <List items={dropDownActions} customStyle="absolute top-7" />}
          </Box>
        </Stack>
      </Box>
      <EditImageModal
        show={showEditImage}
        title={imageType === 'avatar' ? imageTitle.avatar : imageTitle.coverImage}
        cancelLabel={cancelLabel}
        saveLabel={saveLabel}
        onClose={() => setShowEditImage(false)}
        image={imageType === 'avatar' ? avatarUrl : coverImageUrl}
        dragToRepositionLabel={dragToRepositionLabel}
        onSave={onSave}
        {...imageModalProps}
      />
      <DeleteImageModal
        show={showDeleteImage}
        title={imageType === 'avatar' ? deleteTitle.avatar : deleteTitle.coverImage}
        cancelLabel={cancelLabel}
        deleteLabel={deleteLabel}
        confirmationLabel={
          imageType === 'avatar' ? confirmationLabel.avatar : confirmationLabel.coverImage
        }
        onDelete={onDelete}
        onClose={() => setShowDeleteImage(false)}
      />
      <input ref={uploadInputRef} type="file" onChange={e => onUpload(e.target.files[0])} hidden />
    </Stack>
  );
};
