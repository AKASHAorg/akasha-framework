import * as React from 'react';
import DS from '@akashaorg/design-system';
import { useTranslation } from 'react-i18next';
import { RootComponentProps } from '@akashaorg/ui-awf-typings';
import { SETTINGS } from '../../routes';
import { LoginState, useFollowers, useFollowing } from '@akashaorg/ui-awf-hooks';

const { BasicCardBox, Box, Icon, Text, MessageAppMiniCard } = DS;

export interface InboxPageProps extends RootComponentProps {
  loginState: LoginState;
}

const InboxPage: React.FC<InboxPageProps> = props => {
  const { loginState } = props;

  const { t } = useTranslation('app-messaging');

  const navigateTo = props.plugins.routing?.navigateTo;

  const [pinnedConvos, setPinnedConvos] = React.useState([]);

  const handleSettingsClick = () => {
    navigateTo?.({
      appName: '@akashaorg/app-messaging',
      getNavigationUrl: routes => routes[SETTINGS],
    });
  };

  const followersQuery = useFollowers(loginState.pubKey, 500);
  const followers = React.useMemo(
    () => followersQuery.data?.pages?.reduce((acc, curr) => [...acc, ...curr.results], []),
    [followersQuery.data?.pages],
  );

  const followingQuery = useFollowing(loginState.pubKey, 500);
  const following = React.useMemo(
    () => followingQuery.data?.pages?.reduce((acc, curr) => [...acc, ...curr.results], []),
    [followingQuery.data?.pages],
  );
  const contactList = followers?.filter(followerProfile =>
    following?.some(followingProfile => followerProfile.pubKey === followingProfile.pubKey),
  );
  const pinnedContacts = React.useMemo(() => [], []);
  const unpinnedContacts = React.useMemo(() => {
    return contactList?.filter(contact => {
      if (pinnedConvos?.includes(contact.pubKey)) {
        pinnedContacts.push(contact);
        return false;
      } else {
        return true;
      }
    });
  }, [contactList, pinnedContacts, pinnedConvos]);

  React.useEffect(() => {
    if (localStorage.getItem('Pinned Conversations')) {
      const currentData = JSON.parse(localStorage.getItem('Pinned Conversations'));
      setPinnedConvos(currentData);
    }
  }, []);

  const handlePinConversation = (pubKey: string) => {
    let currentData: string[] = [];
    if (localStorage.getItem('Pinned Conversations')) {
      currentData = JSON.parse(localStorage.getItem('Pinned Conversations'));
    }
    const index = currentData.indexOf(pubKey);
    if (index !== -1) {
      currentData.splice(index, 1);
    } else {
      currentData.push(pubKey);
    }
    const uniqueData = new Set(currentData);
    const newData = Array.from(uniqueData);
    localStorage.setItem('Pinned Conversations', JSON.stringify(newData));
    setPinnedConvos(newData);
  };

  const handleCardClick = (pubKey: string) => {
    props.plugins.routing?.navigateTo?.({
      appName: '@akashaorg/app-messaging',
      getNavigationUrl: routes => `${routes.chat}/${pubKey}`,
    });
  };

  const handleAvatarClick = (pubKey: string) => {
    navigateTo?.({
      appName: '@akashaorg/app-profile',
      getNavigationUrl: navRoutes => `${navRoutes.rootRoute}/${pubKey}`,
    });
  };

  return (
    <BasicCardBox style={{ maxHeight: '92vh' }}>
      <Box pad="medium" gap="small">
        <Box direction="row" justify="between">
          <Text size="large" weight={'bold'}>
            {t('Messaging App')}
          </Text>
          <Icon type="settings" onClick={handleSettingsClick} />
        </Box>
        <Text>{t('An encrypted end to end messaging app 🔒.')}</Text>
        <Box border={{ color: 'border', side: 'all' }} round="small">
          <Box pad={{ horizontal: 'small', vertical: 'medium' }}>
            <Text weight={'bold'} size="large">
              {t('Conversations')}
            </Text>
          </Box>
          <Box overflow={'auto'}>
            <Box>
              {!!pinnedContacts.length && (
                <>
                  <Text weight={'bold'}>{t('PINNED')}</Text>
                  {pinnedContacts.map((contact, idx) => (
                    <MessageAppMiniCard
                      key={idx}
                      locale="en"
                      pinConvoLabel={t('Pin Conversation')}
                      unpinConvoLabel={t('Unpin Conversation')}
                      isPinned={false}
                      isRead={false}
                      senderName={contact?.name}
                      senderUsername={contact?.userName}
                      senderAvatar={contact?.avatar}
                      senderEthAddress={contact?.ethAddress}
                      onClickCard={() => handleCardClick(contact.pubKey)}
                      onClickAvatar={() => handleAvatarClick(contact.pubKey)}
                      onConvoPin={() => handlePinConversation(contact.pubKey)}
                    />
                  ))}
                </>
              )}
            </Box>
            <Box>
              {!!pinnedContacts.length && <Text weight={'bold'}>{t('ALL CONVERSATIONS')}</Text>}
              {unpinnedContacts?.map((contact, idx) => (
                <MessageAppMiniCard
                  key={idx}
                  locale="en"
                  pinConvoLabel={t('Pin Conversation')}
                  unpinConvoLabel={t('Unpin Conversation')}
                  isPinned={false}
                  isRead={false}
                  senderName={contact?.name}
                  senderUsername={contact?.userName}
                  senderAvatar={contact?.avatar}
                  senderEthAddress={contact?.ethAddress}
                  onClickCard={() => handleCardClick(contact.pubKey)}
                  onClickAvatar={() => handleAvatarClick(contact.pubKey)}
                  onConvoPin={() => handlePinConversation(contact.pubKey)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </BasicCardBox>
  );
};

export default InboxPage;
