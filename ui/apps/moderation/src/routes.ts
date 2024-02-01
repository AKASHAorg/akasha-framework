export const HOME = 'Overview';
export const MODERATORS = 'Moderators';
export const VIEW_MODERATOR = 'ViewModerator';
export const HISTORY = 'Transparency Log';
export const HISTORY_ITEM = 'Transparency Log Item';
export const MODERATION_VALUE = 'Moderation Value';
export const BECOME_MODERATOR = 'Become Moderator';
export const CHECK_APPLICATION_STATUS = 'Check Application Status';
export const MODIFY_APPLICATION = 'Modify Application';
export const REPORT_ITEM = 'Report Item';

export const baseHistoryUrl = '/history';
export const baseOverviewUrl = '/overview';
export const baseModeratorsUrl = '/moderators';
export const baseApplicationUrl = '/application';

export default {
  [HOME]: baseOverviewUrl,
  [MODERATORS]: baseModeratorsUrl,
  [VIEW_MODERATOR]: `${baseModeratorsUrl}/:moderatorProfileId`,
  [HISTORY]: baseHistoryUrl,
  [HISTORY_ITEM]: `${baseHistoryUrl}/:itemId`,
  [MODERATION_VALUE]: `${baseOverviewUrl}/values/:value`,
  [BECOME_MODERATOR]: '/become-a-moderator',
  [CHECK_APPLICATION_STATUS]: `${baseApplicationUrl}/status`,
  [MODIFY_APPLICATION]: `${baseApplicationUrl}/modify`,
  [REPORT_ITEM]: '/report/:itemType/:id',
};
