import { Container } from 'inversify';
import { TYPES } from '@akashaproject/sdk-typings';
import Logging from './logging';
import Gql from './gql';
import Settings from './settings';
import Stash from './stash';
import DB from './db';
import Web3Connector from './common/web3.connector';
import EventBus from './common/event-bus';
import AWF_Auth from './auth';
import AWF_Profile from './profiles';
import AWF_ENS from './registry';
import AWF_Entry from './posts/entry';
import AWF_Comments from './posts/comments';
import AWF_Tags from './posts/tags';
const diContainer = new Container({
  defaultScope: 'Singleton',
});

diContainer.bind<Logging>(TYPES.Log).to(Logging);
diContainer.bind<Gql>(TYPES.Gql).to(Gql);
diContainer.bind<Settings>(TYPES.Settings).to(Settings);
diContainer.bind<Stash>(TYPES.Stash).to(Stash);
console.log('Stash', diContainer.get<Stash>(TYPES.Stash));
diContainer.bind<DB>(TYPES.Db).to(DB);
diContainer.bind<EventBus>(TYPES.EventBus).to(EventBus);
console.log('dbini', diContainer.get<DB>(TYPES.Db));
diContainer.bind<Web3Connector>(TYPES.Web3).to(Web3Connector);
diContainer.bind<AWF_Auth>(TYPES.Auth).to(AWF_Auth);
diContainer.bind<AWF_Profile>(TYPES.Profile).to(AWF_Profile);
diContainer.bind<AWF_ENS>(TYPES.ENS).to(AWF_ENS);
diContainer.bind<AWF_Entry>(TYPES.Entry).to(AWF_Entry);
diContainer.bind<AWF_Comments>(TYPES.Comment).to(AWF_Comments);
diContainer.bind<AWF_Tags>(TYPES.Tag).to(AWF_Tags);
export default diContainer;
