import { UserDataType } from '../components/StackedAvatar';

const userData: UserDataType = [
  {
    ethAddress: '0x003410490050000320006570034567114572000',
    avatar: { url: 'https://placebeard.it/360x360', fallbackUrl: '' },
  },
  {
    ethAddress: '0x004410490050000320006570034567114572001',
    avatar: { url: 'https://placebeard.it/360x360', fallbackUrl: '' },
  },
  {
    ethAddress: '0x005410490050000320006570034567114572002',
    avatar: { url: 'https://placebeard.it/360x360', fallbackUrl: '' },
  },
  {
    ethAddress: '0x006410490050000320006570034567114572003',
    avatar: { url: 'https://placebeard.it/360x360', fallbackUrl: '' },
  },
];

const chartData = [
  { mentions: Math.floor(Math.random() * 100), date: 1590994625 },
  { mentions: Math.floor(Math.random() * 10), date: 1591081025 },
  { mentions: Math.floor(Math.random() * 100), date: 1591167425 },
  { mentions: Math.floor(Math.random() * 300), date: 1591253825 },
  { mentions: Math.floor(Math.random() * 280), date: 1591340225 },
  { mentions: Math.floor(Math.random() * 120), date: 1591426625 },
  { mentions: Math.floor(Math.random() * 120), date: 1591513025 },
];

const trendingTagsData = [
  { name: 'AKASHA', totalPosts: 176, tagHistoricData: chartData, subscribed: true },
  { name: 'AKASHAWorld', totalPosts: 94, tagHistoricData: chartData, subscribed: false },
  { name: 'Ethereum', totalPosts: 27, tagHistoricData: chartData, subscribed: false },
  { name: 'EthereumWorld', totalPosts: 17, tagHistoricData: chartData, subscribed: true },
  { name: 'Crypto', totalPosts: 6, tagHistoricData: chartData, subscribed: false },
];

const trendingProfilesData = [
  {
    _id: '123',
    ethAddress: '0x003410490050000320006570034567114572000',
    pubKey: 'abc123zxcv7scxkfe32fce21ce2ce2rv1',
    name: 'Jon Gilbert',
    userName: '@jongilbert',
    ensName: 'jongilbert.akasha.eth',
    avatar: { fallbackUrl: 'https://placebeard.it/480/480' },
    coverImage: { url: 'goldenrod', fallbackUrl: 'red' },
    totalFollowers: 312,
    totalFollowing: 33,
    totalInterests: 8,
    totalPosts: '235',
    default: [],
    providers: [],
    description:
      'Product design @companyname. Main interests: User experience, Design processes, Project Managament. Author of This could be a book name, and Another Book. Love people, plants, words, and food.',
  },
  {
    _id: '123',
    ethAddress: '0x003410490050778032325657003456711457212',
    pubKey: 'abc123zxcv7scxkfe32fce21ce2ce2rvr2',
    name: 'Alexei Gilbertovich',
    userName: '@alexeigilbertovich',
    ensName: 'alexeigilbertovich.akasha.eth',
    avatar: { fallbackUrl: 'https://placebeard.it/480/480' },
    coverImage: { fallbackUrl: 'blue' },
    totalFollowers: 7585,
    totalFollowing: 33,
    totalInterests: 8,
    totalPosts: '235',
    description:
      'Product design @companyname. Main interests: User experience, Design processes, Project Managament. Author of This could be a book name, and Another Book. Love people, plants, words, and food.',
    isFollowed: true,
    default: [],
    providers: [],
  },
  {
    _id: '123',
    ethAddress: '0x003410490050000320006570034567114572000',
    pubKey: 'abc123zxcv7scxkfe32fce21ce2ce2rv2',
    name: 'Jon Silbert',
    userName: '@jonsilbert',
    ensName: 'jonsilbert.akasha.eth',
    avatar: { fallbackUrl: 'https://placebeard.it/480/480' },
    coverImage: { url: 'goldenrod', fallbackUrl: 'red' },
    totalFollowers: 312,
    totalFollowing: 33,
    totalInterests: 8,
    totalPosts: '235',
    default: [],
    providers: [],
    description:
      'Product design @companyname. Main interests: User experience, Design processes, Project Managament. Author of This could be a book name, and Another Book. Love people, plants, words, and food.',
  },
  {
    _id: '123',
    ethAddress: '0x003410490050000320006570034567114572000',
    pubKey: 'abc123zxcv7scxkfe32fce21ce2ce2rv3',
    name: 'Jon Wilbert',
    userName: '@jonwilbert',
    ensName: 'jonwilbert.akasha.eth',
    avatar: { fallbackUrl: 'https://placebeard.it/480/480' },
    coverImage: { url: 'goldenrod', fallbackUrl: 'red' },
    totalFollowers: 312,
    totalFollowing: 33,
    totalInterests: 8,
    totalPosts: '235',
    default: [],
    providers: [],
    description:
      'Product design @companyname. Main interests: User experience, Design processes, Project Managament. Author of This could be a book name, and Another Book. Love people, plants, words, and food.',
  },
  {
    _id: '123',
    ethAddress: '0x003410490050000320006570034567114572000',
    pubKey: 'abc123zxcv7scxkfe32fce21ce2ce2rv4',
    name: 'Jon Bilbert',
    userName: '@jonbilbert',
    ensName: 'jonbilbert.akasha.eth',
    avatar: { fallbackUrl: 'https://placebeard.it/480/480' },
    coverImage: { url: 'goldenrod', fallbackUrl: 'red' },
    totalFollowers: 312,
    totalFollowing: 33,
    totalInterests: 8,
    totalPosts: '235',
    default: [],
    providers: [],
    description:
      'Product design @companyname. Main interests: User experience, Design processes, Project Managament. Author of This could be a book name, and Another Book. Love people, plants, words, and food.',
  },
];

export { userData, trendingTagsData, trendingProfilesData };
