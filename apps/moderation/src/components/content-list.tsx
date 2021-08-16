import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DS from '@akashaproject/design-system';
import { ILocale } from '@akashaproject/design-system/lib/utils/time';
import { RootComponentProps } from '@akashaproject/ui-awf-typings';
import { moderationRequest } from '@akashaproject/ui-awf-hooks';
import ContentTab from './content-tab';
import ContentCard from './content-card/content-card';
import PromptAuthorization from './prompt-authorization';

const { Box, Text, SwitchCard } = DS;

interface IContentListProps {
  slotId: string;
  user: string | null;
  logger: any;
  singleSpa: any;
}

interface IBaseItem {
  id: number;
  type: string;
  entryId: string;
  reasons: string[];
  description?: string;
  count: number;
  entryDate: string;
}

interface IPendingItem extends IBaseItem {
  reporter: string;
}

interface IModeratedItem extends IPendingItem {
  delisted: boolean;
  moderator: string;
  evaluationDate: string;
}

export interface ICount {
  kept: number;
  pending: number;
  delisted: number;
}

const ContentList: React.FC<IContentListProps & RootComponentProps> = props => {
  const { user, logger } = props;

  const [pendingItems, setPendingItems] = React.useState<IPendingItem[]>([]);
  const [moderatedItems, setModeratedItems] = React.useState<IModeratedItem[]>([]);
  const [isPending, setIsPending] = React.useState<boolean>(true);
  const [isDelisted, setIsDelisted] = React.useState<boolean>(true);
  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<ICount>({ kept: 0, pending: 0, delisted: 0 });
  const [isAuthorised, setIsAuthorised] = React.useState<boolean>(false);
  const [activeButton, setActiveButton] = React.useState<string>('Delisted');

  const location = useLocation();
  const { t, i18n } = useTranslation();
  const locale = (i18n.languages[0] || 'en') as ILocale;

  React.useEffect(() => {
    if (!user) {
      // if not authenticated, prompt to authenticate
      props.singleSpa.navigateToUrl('/moderation-app/unauthenticated');
    } else {
      // if authenticated, check authorisation status
      getModeratorStatus(user);
    }
  }, [user]);

  React.useEffect(() => {
    // if authorised,
    if (isAuthorised && isPending) {
      // check for pending contents while pending tab is active
      fetchPendingContents();
    }
    if (isAuthorised && !isPending) {
      // check for moderated contents while moderated tab is active
      fetchModeratedContents();
    }
  }, [isPending, isAuthorised]);

  React.useEffect(() => {
    // listens to changes in location such as when returning from modal and updates current contents in view
    if (location.search.length === 0) {
      // trigger only when location has no search query
      if (isPending) {
        fetchPendingContents();
      } else {
        fetchModeratedContents();
      }
    }
  }, [location]);

  const getModeratorStatus = async (loggedUser: string) => {
    setRequesting(true);
    try {
      const response = await moderationRequest.checkModerator(loggedUser);
      if (response === 200) {
        setIsAuthorised(true);
      }
    } catch (error) {
      logger.error('[content-list.tsx]: getModeratorStatus err %j', error.message || '');
    } finally {
      setRequesting(false);
    }
  };

  const getStatusCount = async () => {
    setRequesting(true);
    try {
      const response = await moderationRequest.getCount();
      setCount(response);
    } catch (error) {
      logger.error('[content-list.tsx]: getStatusCount err %j', error.message || '');
    } finally {
      setRequesting(false);
    }
  };

  const fetchPendingContents = async () => {
    // fetch pending (reported) contents
    setRequesting(true);
    try {
      const modResponse = await moderationRequest.getAllPending();
      setPendingItems(modResponse);
      getStatusCount();
    } catch (error) {
      logger.error('[content-list.tsx]: fetchPendingContents err %j', error.message || '');
    } finally {
      setRequesting(false);
    }
  };

  const fetchModeratedContents = async () => {
    // fetch delisted (moderated) contents
    setRequesting(true);
    try {
      const modResponse = await moderationRequest.getAllModerated();
      setModeratedItems(modResponse);
      getStatusCount();
    } catch (error) {
      logger.error('[content-list.tsx]: fetchModeratedContents err %j', error.message || '');
    } finally {
      setRequesting(false);
    }
  };

  const handleButtonClick = (entryId: string, contentType: string) => {
    props.navigateToModal({
      name: 'moderate-modal',
      status: isPending ? 'pending' : 'moderated',
      entryId,
      contentType,
    });
  };

  const renderNotFound = (activeTab: string) => {
    return (
      <Text textAlign="center">{t(`No ${activeTab} items found. Please check again later`)}</Text>
    );
  };

  const buttonLabels = [t('Kept'), t('Delisted')];

  const buttonValues = ['Kept', 'Delisted'];

  const onTabClick = (value: string) => {
    // set active button state
    setActiveButton(buttonValues[buttonLabels.indexOf(value)]);
    // toggle list accordingly
    if (value === 'Kept') {
      setIsDelisted(false);
    } else if (value === 'Delisted') {
      setIsDelisted(true);
    }
  };

  return isAuthorised ? (
    <Box>
      <ContentTab
        isPending={isPending}
        pendingLabel={t('Pending')}
        moderatedLabel={t('Moderated')}
        countKept={count.kept}
        countPending={count.pending}
        countDelisted={count.delisted}
        setIsPending={setIsPending}
      />
      {!isPending && (
        <SwitchCard
          count={isDelisted ? count.delisted : count.kept}
          activeButton={activeButton}
          countLabel={!isDelisted ? buttonLabels[0] : buttonLabels[1]}
          buttonLabels={buttonLabels}
          buttonValues={buttonValues}
          onTabClick={onTabClick}
          buttonsWrapperWidth={'40%'}
          loggedUser={user}
        />
      )}
      {requesting && <Text textAlign="center">Fetching items. Please wait...</Text>}
      {!requesting &&
        isPending &&
        (pendingItems.length
          ? pendingItems.map((pendingItem: IPendingItem) => (
              <ContentCard
                {...props}
                key={pendingItem.id}
                isPending={isPending}
                locale={locale}
                showExplanationsLabel={t('Show explanations')}
                hideExplanationsLabel={t('Hide explanations')}
                reportedLabel={t('reported')}
                contentType={pendingItem.type}
                forLabel={t('for')}
                reportedByLabel={t('Reported by')}
                originallyReportedByLabel={t('Initially reported by')}
                entryId={pendingItem.entryId}
                reasons={pendingItem.reasons.map((el: string) => t(el))}
                reporter={pendingItem.reporter}
                andLabel={t('and')}
                otherReporters={
                  pendingItem.count
                    ? `${pendingItem.count} ${
                        pendingItem.count === 1 ? `${t('other')}` : `${t('others')}`
                      }`
                    : ''
                }
                reportedOnLabel={t('On')}
                reportedDateTime={pendingItem.entryDate}
                makeADecisionLabel={t('Make a Decision')}
                handleButtonClick={handleButtonClick}
              />
            ))
          : renderNotFound('pending'))}
      {!requesting &&
        !isPending &&
        (moderatedItems.length
          ? moderatedItems
              .filter(item => item.delisted === isDelisted)
              .map(moderatedItem => (
                <ContentCard
                  {...props}
                  key={moderatedItem.id}
                  isPending={isPending}
                  locale={locale}
                  showExplanationsLabel={t('Show explanations')}
                  hideExplanationsLabel={t('Hide explanations')}
                  determinationLabel={t('Determination')}
                  determination={moderatedItem.delisted ? t('Delisted') : t('Kept')}
                  reportedLabel={t('reported')}
                  contentType={moderatedItem.type}
                  forLabel={t('for')}
                  reportedByLabel={t('Reported by')}
                  originallyReportedByLabel={t('Initially reported by')}
                  entryId={moderatedItem.entryId}
                  reasons={moderatedItem.reasons.map(el => t(el))}
                  reporter={moderatedItem.reporter}
                  andLabel={t('and')}
                  otherReporters={
                    moderatedItem.count
                      ? `${moderatedItem.count} ${
                          moderatedItem.count === 1 ? `${t('other')}` : `${t('others')}`
                        }`
                      : ''
                  }
                  reportedOnLabel={t('On')}
                  reportedDateTime={moderatedItem.entryDate}
                  moderatorDecision={moderatedItem.description}
                  moderator={moderatedItem.moderator}
                  moderatedByLabel={t('Moderated by')}
                  moderatedOnLabel={t('On')}
                  evaluationDateTime={moderatedItem.evaluationDate}
                  reviewDecisionLabel={t('Review decision')}
                  handleButtonClick={handleButtonClick}
                />
              ))
          : renderNotFound('moderated'))}
    </Box>
  ) : (
    <PromptAuthorization
      titleLabel={t('You must be an Ethereum World Moderator to access this page')}
      subtitleLabel={t(
        'The wallet you connected does not match a moderator account in our system. Please try again with the correct wallet.',
      )}
    />
  );
};

export default ContentList;
