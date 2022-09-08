import 'systemjs-webpack-interop/auto-public-path';
/* Components */
import {
  Box,
  BoxExtendedProps,
  ButtonExtendedProps,
  Carousel,
  FormField,
  Grid,
  Grommet,
  grommet,
  Heading,
  Image,
  RadioButtonGroup,
  ResponsiveContext,
  Select,
  Text,
  TextArea,
  TextInput,
  ThemeContext,
} from 'grommet';

import styled, { createGlobalStyle, css, withTheme } from 'styled-components';

import Autosizer from 'react-virtualized-auto-sizer';

import Avatar from './components/Avatar';
import AppAvatar from './components/AppAvatar';
import EditableAvatar from './components/EditableAvatar';
import StackedAvatar from './components/StackedAvatar';

import Sidebar from './components/SideBar';
import SidebarMenuItem from './components/SideBar/sidebar-menu-item';

import Topbar from './components/TopBar';

import EditorCard from './components/EditorCard';
import { CommentEditor } from './components/EditorCard/comment-editor';
import { EditorPlaceholder } from './components/EditorCard/editor-placeholder';

import EntryCard from './components/EntryCard';
import EntryList from './components/EntryList';
import { EntryBox } from './components/EntryCard/entry-box';
import CardHeaderMenuDropdown from './components/EntryCard/card-header-menu';
import { MenuItemButton } from './components/EntryCard/menu-item-button';
import { EntryCardHidden } from './components/EntryCard/entry-card-hidden';

import ReadOnlyEditor from './components/ReadOnlyEditor';

import {
  BasicCardBox,
  MainAreaCardBox,
  WidgetAreaCardBox,
  ModalCard,
  ModalCardLogin,
} from './components/EntryCard/basic-card-box';

import BoxFormCard from './components/BoxFormCard';
import EnsFormCard from './components/EnsFormCard';
import ImageCropper from './components/ImageCropper';

import NotificationsCard from './components/NotificationCard';

import CustomizeFeedCard from './components/OnboardingCard';

import ProfileCard from './components/ProfileCard';
import { ProfileDelistedCard } from './components/ProfileCard/profile-delisted-card';
import { ProfileSearchCard } from './components/ProfileCard/profile-search-card';
import { ProfileMiniCard } from './components/ProfileCard/profile-mini-card';

import TagCard from './components/TagCard';
import { TagDetailCard } from './components/TagCard/tag-detail-card';
import { TagProfileCard } from './components/TagCard/tag-profile-card';
import { TagSearchCard } from './components/TagCard/tag-search-card';

import FilterCard from './components/FilterCard';
import SwitchCard, {
  StyledSwitchCardButton,
  TAB_TOOLBAR_TYPE,
  TabsToolbar,
} from './components/SwitchCard';
import Tag from './components/Tag';
import MdCard from './components/MdCard';

import { MyFeedCard } from './components/MyFeedCard';

import AppInfoWidgetCard from './components/AppInfoWidgetCard';
import AppsWidgetCard from './components/AppsWidgetCard';
import CookieWidgetCard from './components/CookieCard';
import ICDetailCard from './components/ICDetailCard';
import ICWidgetCard from './components/ICWidgetCard';
import LoginCTAWidgetCard, { CTAAnchor } from './components/LoginCTAWidgetCard';
import SourcesWidgetCard from './components/SourcesWidgetCard';
import MiniInfoWidgetCard from './components/MiniInfoWidgetCard';
import TrendingWidgetCard from './components/TrendingWidgetCard';
import TutorialWidgetCard from './components/TutorialWidgetCard';
import SignUpCard from './components/SignUpCard';

import EntryCardLoading from './components/VirtualList/placeholders/entry-card-placeholder';

import Button from './components/Button';
import DuplexButton from './components/DuplexButton';
import IconButton from './components/IconButton';
import IconLink from './components/IconLink';
import ProfileAvatarButton from './components/ProfileAvatarButton';
import VoteIconButton from './components/VoteIconButton';
import VariableIconButton from './components/VariableIconButton';
import Web3ConnectButton from './components/Web3ConnectButton';
import TabButton from './components/TabButton';

import AreaChart from './components/AreaChart';
import LineChart from './components/LineChart';
import ResponsiveChart from './components/ResponsiveChart';

import EditorBox from './components/Editor';
import { editorDefaultValue } from './components/Editor/initialValue';
import EditorMeter from './components/EditorMeter';

import HorizontalDivider from './components/HorizontalDivider';

import StepIndicator from './components/StepIndicator';

import ErrorLoader from './components/ErrorLoader';
import { ErrorInfoCard } from './components/ErrorLoader/error-info-card';
import EntryPublishErrorCard from './components/EntryPublishErrorCard';
import ModerationAppErrorCard from './components/ModerationAppErrorCard';
import ModerationIntroCard from './components/ModerationIntroCard';

import TextInputField from './components/TextInputField';

import Icon, { iconTypes } from './components/Icon';
import { AppIcon } from './components/Icon/app-icon';

import CommentInput from './components/CommentInput';
import SearchInput from './components/SearchInput';
import DropSearchInput from './components/DropSearchInput';

import EditorModal from './components/EditorModal';
import ExtensionPoint from './utils/extension-point';
import ShareModal from './components/ShareModal';
import { StyledLayer } from './components/ListModal/styled-modal';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import EthProviderModal from './components/SignInModal/eth-provider-modal';
import EthProviderListModal from './components/SignInModal/eth-provider-list-modal';
import { ModalContainer } from './components/SignInModal/fullscreen-modal-container';
import { ModalRenderer } from './components/SignInModal/modal-renderer';
import MessageAppMiniCard from './components/MessageMiniCard';
import BubbleCard from './components/BubbleCard';
import MessageAppConvoHeader from './components/MessageAppConvoHeader';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';

import MobileListModal from './components/MobileListModal';
import ModerateModal from './components/ModerateModal';
import ReportModal from './components/ReportModal';
import ProfileCompletedModal from './components/ProfileCompletedModal';
import FeedbackModal from './components/FeedbackModal';
import ConfirmationModal from './components/ConfirmationModal';
import StatModal from './components/StatModal';
import InstallModal from './components/InstallModal';
import ManageCollaboratorsModal from './components/ManagCollaboratorsModal.tsx';

import BookmarkPill from './components/BookmarkPill';
import NewPostsPill from './components/NewPostsPill';
import NotificationPill from './components/NotificationPill';

import NotificationsPopover from './components/NotificationsPopover';
import SelectPopover from './components/SelectPopover';

import ViewportSizeProvider, { useViewportSize } from './components/Providers/viewport-dimension';
import TextIcon from './components/TextIcon';
import LinkInput from './components/TextInputIconForm';
import SubtitleTextIcon from './components/SubtitleTextIcon';
import Checkbox from './components/Checkbox';
import { SearchStartCard } from './components/SearchStartCard';
import InfoCard from './components/InfoCard';
import { SearchBar } from './components/SearchBar';
// import VirtualList from './components/VirtualList';
import Helmet from 'react-helmet';
import Spinner from './components/Spinner';

import TransparencyLogMiniCard from './components/TransparencyLogMiniCard';
import TransparencyLogDetailCard from './components/TransparencyLogDetailCard';
import TransparencyLogBanner from './components/TransparencyLogBanner';
import { StyledSelectBox } from './components/EntryCard/styled-entry-box';
import WalletRequestStep from './components/WalletRequestStep';
import WelcomeCard from './components/WelcomeCard';
import { StartCard } from './components/StartCard';
import { OnboardingStartCard } from './components/OnboardingStartCard';
import { OnboardingSuggestionsCard } from './components/OnboardingSuggestionsCard';

/* Utilities (these are not components) */
import { formatImageSrc } from './utils/image-utils';
import { isBase64, truncateMiddle } from './utils/string-utils';
import { formatRelativeTime } from './utils/time';
import useIntersectionObserver from './utils/intersection-observer';
import getCroppedImage from './utils/get-cropped-image';

/* Themes and theme related utils */
import darkTheme from './styles/themes/dark';
import lightTheme from './styles/themes/light';
import { createTheme } from './styles/themes/utils/create-theme';
import { ThemeSelector } from './styles/themes/utils/theme-selector';

export { BoxExtendedProps, ButtonExtendedProps };

/* Grommet utils */
// @TODO: fix this export style...
const exported = {
  Autosizer,
  Avatar,
  AppAvatar,
  AppIcon,
  AreaChart,
  LineChart,
  ResponsiveChart,
  Button,
  Carousel,
  DuplexButton,
  EditableAvatar,
  StackedAvatar,
  ErrorInfoCard,
  ErrorLoader,
  ModerationAppErrorCard,
  ModerationIntroCard,
  AppInfoWidgetCard,
  AppsWidgetCard,
  BasicCardBox,
  BookmarkPill,
  NewPostsPill,
  NotificationPill,
  CustomizeFeedCard,
  DropSearchInput,
  EditorBox,
  EditorMeter,
  editorDefaultValue,
  ExtensionPoint,
  CommentEditor,
  EditorCard,
  EditorPlaceholder,
  EditorModal,
  EntryBox,
  CardHeaderMenuDropdown,
  EntryCard,
  EntryCardHidden,
  EntryCardLoading,
  ReadOnlyEditor,
  BoxFormCard,
  EnsFormCard,
  ImageCropper,
  Heading,
  MiniInfoWidgetCard,
  ProfileCard,
  ProfileDelistedCard,
  ProfileSearchCard,
  ProfileMiniCard,
  TextInputField,
  TagCard,
  TagDetailCard,
  TagProfileCard,
  TagSearchCard,
  Icon,
  iconTypes,
  IconButton,
  IconLink,
  SignInModal,
  SignUpModal,
  ProfileAvatarButton,
  VoteIconButton,
  VariableIconButton,
  Web3ConnectButton,
  TabButton,
  CommentInput,
  SearchInput,
  MainAreaCardBox,
  NotificationsPopover,
  ShareModal,
  ReportModal,
  ModerateModal,
  ProfileCompletedModal,
  FeedbackModal,
  ManageCollaboratorsModal,
  Spinner,
  TransparencyLogMiniCard,
  TransparencyLogDetailCard,
  TransparencyLogBanner,
  SelectPopover,
  SubtitleTextIcon,
  Sidebar,
  SidebarMenuItem,
  Text,
  TextArea,
  TextInput,
  TextIcon,
  LinkInput,
  Topbar,
  createTheme,
  darkTheme,
  lightTheme,
  Box,
  FormField,
  Grid,
  Image,
  Grommet,
  grommet,
  RadioButtonGroup,
  ResponsiveContext,
  Select,
  ThemeContext,
  ThemeSelector,
  css,
  styled,
  withTheme,
  createGlobalStyle,
  ViewportSizeProvider,
  useViewportSize,
  // VirtualList,
  isBase64,
  truncateMiddle,
  formatImageSrc,
  formatRelativeTime,
  getCroppedImage,
  useIntersectionObserver,
  WidgetAreaCardBox,
  ModalCard,
  ModalCardLogin,
  EthProviderListModal,
  EthProviderModal,
  MessageAppMiniCard,
  BubbleCard,
  MessageAppConvoHeader,
  ChatList,
  ChatArea,
  MobileListModal,
  ModalContainer,
  ModalRenderer,
  MenuItemButton,
  NotificationsCard,
  HorizontalDivider,
  StepIndicator,
  CookieWidgetCard,
  ICDetailCard,
  ICWidgetCard,
  LoginCTAWidgetCard,
  CTAAnchor,
  TrendingWidgetCard,
  SourcesWidgetCard,
  TutorialWidgetCard,
  SignUpCard,
  FilterCard,
  SwitchCard,
  StyledSwitchCardButton,
  TabsToolbar,
  Tag,
  MdCard,
  EntryPublishErrorCard,
  StyledLayer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Helmet: Helmet as any,
  ConfirmationModal,
  StatModal,
  EntryList,
  StyledSelectBox,
  Checkbox,
  WalletRequestStep,
  WelcomeCard,
  InstallModal,
  SearchStartCard,
  InfoCard,
  SearchBar,
  TAB_TOOLBAR_TYPE,
  StartCard,
  OnboardingStartCard,
  OnboardingSuggestionsCard,
  MyFeedCard,
};

export default exported;
