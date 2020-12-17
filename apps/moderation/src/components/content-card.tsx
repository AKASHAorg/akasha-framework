import React from 'react';
import moment from 'moment';
import { combineLatest } from 'rxjs';
import DS from '@akashaproject/design-system';
import { ILocale } from '@akashaproject/design-system/lib/utils/time';

import { mapEntry } from '../services/posting-service';

import EntryDataCard from './entry-data-card';
import ExplanationsCard from './explanations-box';

import { StyledBox } from './styled';

const { Box, Icon, Text, Avatar, Button, MainAreaCardBox } = DS;

export interface IContentCardProps {
  isPending: boolean;
  locale: ILocale;

  showExplanationsLabel: string;
  hideExplanationsLabel: string;
  determinationLabel?: string;
  reportedLabel: string;
  contentType: string;
  forLabel: string;
  andLabel?: string;
  reportedByLabel: string;
  originallyReportedByLabel: string;
  entryId: string;
  reasons: string[];
  reporter?: string;
  reporterName?: string;
  reporterENSName?: string;
  otherReporters?: string;
  reportedOnLabel?: string;
  reportedDateTime: string;
  moderator?: string;
  moderatorName?: string;
  moderatorENSName?: string;
  moderatedByLabel?: string;
  moderatedOnLabel?: string;
  evaluationDateTime?: string;
  keepContentLabel?: string;
  delistContentLabel?: string;
  logger: any;
  sdkModules: any;
  handleButtonClick: (param1: string, param2: string, param3: string, param5: any) => void;
}

const ContentCard: React.FC<IContentCardProps> = props => {
  const {
    isPending,
    locale,
    showExplanationsLabel,
    hideExplanationsLabel,
    determinationLabel,
    reportedLabel,
    contentType,
    forLabel,
    andLabel,
    reportedByLabel,
    originallyReportedByLabel,
    entryId,
    reasons,
    reporter,
    reporterName,
    reporterENSName,
    otherReporters,
    reportedOnLabel,
    reportedDateTime,
    moderator,
    moderatorName,
    moderatorENSName,
    moderatedByLabel,
    moderatedOnLabel,
    evaluationDateTime,
    keepContentLabel,
    delistContentLabel,
  } = props;

  const [entryData, setEntryData] = React.useState<any>(null);

  const [showExplanations, setShowExplanations] = React.useState<boolean>(false);

  React.useEffect(() => {
    const entryCall = props.sdkModules.posts.entries.getEntry({ entryId });
    const ipfsGatewayCall = props.sdkModules.commons.ipfsService.getSettings({});
    const getEntryCall = combineLatest([ipfsGatewayCall, entryCall]);
    getEntryCall.subscribe((resp: any) => {
      const ipfsGateway = resp[0].data;
      const entry = resp[1].data?.getPost;
      if (entry) {
        const mappedEntry = mapEntry(entry, ipfsGateway);
        setEntryData(mappedEntry);
      }
    });
  }, [entryId]);

  const handleClick = (action: string) => () => {
    if (entryId) {
      props.handleButtonClick(entryId, action, contentType, entryData);
    }
  };

  return (
    <Box margin={{ bottom: '1rem' }}>
      <MainAreaCardBox>
        <Box pad="1rem">
          <EntryDataCard entryData={entryData} contentType={contentType} locale={locale} />
          {!isPending && (
            <Text
              size="small"
              margin={{ top: 'large' }}
              color="secondaryText"
              style={{ textTransform: 'uppercase' }}
            >
              {determinationLabel}
            </Text>
          )}
          <Box
            direction="row"
            margin={{ top: isPending ? 'large' : 'medium' }}
            wrap={true}
            align="center"
          >
            <Icon type="error" size="md" accentColor={true} />
            <Text
              margin={{ left: '0.2rem', bottom: '0.2rem' }}
              style={{ fontWeight: 'bold' }}
            >{`${contentType[0].toUpperCase()}${contentType.slice(
              1,
            )} ${reportedLabel}  ${forLabel}`}</Text>

            {reasons.map((reason, idx) => (
              <>
                {/* show 'and' at the appropriate position, if more than one reason */}
                {reasons.length > 1 && idx === reasons.length - 1 && (
                  <Text
                    margin={{ left: '0.2rem', bottom: '0.2rem' }}
                    style={{ fontWeight: 'bold' }}
                  >
                    {andLabel}
                  </Text>
                )}
                <StyledBox
                  key={idx}
                  margin={{ left: '0.2rem', bottom: '0.2rem' }}
                  pad={{ horizontal: '0.2rem' }}
                  round={'0.125rem'}
                >
                  <Text as="span" color="accentText" style={{ fontWeight: 'bold' }}>
                    {reason}
                  </Text>
                </StyledBox>
              </>
            ))}
          </Box>

          <Text
            as="a"
            color="accentText"
            margin={{ top: 'large' }}
            style={{ cursor: 'pointer' }}
            onClick={() => setShowExplanations(!showExplanations)}
          >
            {showExplanations ? hideExplanationsLabel : showExplanationsLabel}
          </Text>
          {showExplanations && (
            <ExplanationsCard
              entryId={entryId}
              reportedByLabel={reportedByLabel}
              forLabel={forLabel}
              logger={props.logger}
            />
          )}
          {!isPending && (
            <>
              <Text margin={{ top: 'large' }}>
                {moderator
                  ? `${moderatedByLabel} ${moderator.slice(0, 6)}...${moderator.slice(
                      moderator.length - 5,
                      moderator.length - 1,
                    )}`
                  : `${moderatedByLabel} ${moderatorName} (${moderatorENSName})`}
              </Text>
              <Text color="secondaryText">{`${moderatedOnLabel} ${moment(evaluationDateTime).format(
                'D MMM yyyy・hh:mm',
              )}`}</Text>
            </>
          )}
          <Box
            direction="row"
            margin={{ top: 'medium' }}
            pad={{ top: 'medium' }}
            align="center"
            border={{ side: 'top', color: 'border', style: 'solid' }}
          >
            <Box width={isPending ? '65%' : '100%'}>
              <Box direction="row">
                <Text color={!isPending ? 'secondaryText' : 'initial'}>
                  {originallyReportedByLabel}
                </Text>
                <Avatar
                  ethAddress={reporter || ''}
                  src="https://placebeard.it/360x360"
                  size="xs"
                  margin={{ left: '0.2rem' }}
                  backgroundColor={'lightBackground'}
                  border="sm"
                />
                {reporter && (
                  <Text margin={{ left: '0.2rem' }} color="accentText">
                    {`${reporter.slice(0, 6)}...${reporter.slice(reporter.length - 4)}`}
                  </Text>
                )}
                {reporterName && (
                  <Text margin={{ left: '0.2rem' }} color="accentText">
                    {reporterName}
                  </Text>
                )}
                {reporterENSName && (
                  <Text
                    margin={{ left: '0.2rem' }}
                    color={!isPending ? 'secondaryText' : 'initial'}
                  >
                    ({reporterENSName})
                  </Text>
                )}
                {otherReporters && !!otherReporters.length && (
                  <>
                    <Text margin={{ left: '0.2rem' }}>{andLabel}</Text>
                    <Text margin={{ left: '0.2rem' }} color="accentText">
                      {otherReporters}
                    </Text>
                  </>
                )}
                {!isPending && (
                  <Text
                    margin={{ left: '0.2rem' }}
                    color="secondaryText"
                  >{`${reportedOnLabel} ${moment(reportedDateTime).format('D MMM yyyy')}.`}</Text>
                )}
              </Box>
              {isPending && (
                <Text color="secondaryText">{`${reportedOnLabel} ${moment(reportedDateTime).format(
                  'D MMM yyyy・HH:mm',
                )}`}</Text>
              )}
            </Box>
            {isPending && (
              <Box direction="row" width="35%" justify="end">
                <Button
                  margin={{ right: 'xsmall' }}
                  label={keepContentLabel}
                  onClick={handleClick('Keep')}
                />
                <Button primary={true} label={delistContentLabel} onClick={handleClick('Delist')} />
              </Box>
            )}
          </Box>
        </Box>
      </MainAreaCardBox>
    </Box>
  );
};

export default ContentCard;
