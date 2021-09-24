import React from 'react';

import DS from '@akashaproject/design-system';
import { ILogger } from '@akashaproject/awf-sdk/typings/lib/interfaces/log';
import { useGetFlags } from '@akashaproject/ui-awf-hooks/lib/moderation-request';

import ExplanationsBoxEntry, {
  IExplanationsBoxEntryProps,
  IFlagEntry,
} from './explanations-box-entry';

const { Box, Text } = DS;

export interface IExplanationsBoxProps extends Omit<IExplanationsBoxEntryProps, 'flagEntry'> {
  entryId: string;
  logger: ILogger;
}

const ExplanationsBox: React.FC<IExplanationsBoxProps> = props => {
  const { entryId, reportedByLabel, forLabel, logger } = props;

  const getFlagsQuery = useGetFlags(entryId);
  const flagEntries = getFlagsQuery.data;

  return (
    <Box width="100%">
      {getFlagsQuery.isLoading && <Text>Loading ...</Text>}
      {getFlagsQuery.isSuccess && (
        <Box>
          {flagEntries.map((flagEntry: IFlagEntry, id: number) => (
            <ExplanationsBoxEntry
              key={id}
              flagEntry={flagEntry}
              reportedByLabel={reportedByLabel}
              forLabel={forLabel}
              logger={logger}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ExplanationsBox;
