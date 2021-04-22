import { commentsStats, postsStats, statsProvider } from './constants';
import { queryCache } from '../storage/cache';
import { logger, verifyEd25519Sig } from '../helpers';

const dataSigError = new Error('Data signature was not validated!');
const mutations = {
  addProfileProvider: async (_, { data }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: data,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad addProfileProvider sig`);
      return Promise.reject(dataSigError);
    }
    return dataSources.profileAPI.addProfileProvider(user.pubKey, data);
  },
  makeDefaultProvider: async (_, { data }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: data,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad makeDefaultProvider sig`);
      return Promise.reject(dataSigError);
    }
    return dataSources.profileAPI.makeDefaultProvider(user.pubKey, data);
  },
  registerUserName: async (_, { name }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: name,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad registerUserName sig`);
      return Promise.reject(dataSigError);
    }
    return dataSources.profileAPI.registerUserName(user.pubKey, name);
  },
  createTag: async (_, { name }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: name,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad createTag sig`);
      return Promise.reject(dataSigError);
    }
    return dataSources.tagsAPI.addTag(name);
  },
  createPost: async (_, { content, post }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: content,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad createPost sig`);
      return Promise.reject(dataSigError);
    }
    logger.info(`verified createPost sig`);
    const profile = await dataSources.profileAPI.resolveProfile(user.pubKey, true);
    if (!profile.length) {
      return Promise.reject('[Must be authenticated! Profile not found!]');
    }
    const profileData = profile[0];
    const postID = await dataSources.postsAPI.createPost(user.pubKey, content, post);
    if (postID?.length) {
      const totalPostsIndex = profileData.metaData.findIndex(
        m => m.provider === statsProvider && m.property === postsStats,
      );
      if (totalPostsIndex !== -1) {
        profileData.metaData[totalPostsIndex].value =
          +profileData.metaData[totalPostsIndex].value + 1;
        profileData.metaData[totalPostsIndex].value = profileData.metaData[
          totalPostsIndex
        ].value.toString();
      } else {
        profileData.metaData.push({
          provider: statsProvider,
          property: postsStats,
          value: '1',
        });
      }
      await dataSources.profileAPI.updateProfile([profileData]);
    }
    if (post.tags && post.tags.length) {
      for (const tag of post.tags) {
        await dataSources.tagsAPI.indexPost('Posts', postID[0], tag);
      }
    }
    const userIDCache = dataSources.profileAPI.getCacheKey(user.pubKey);
    await queryCache.del(userIDCache);
    return postID[0];
  },
  follow: async (_, { ethAddress }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: ethAddress,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad follow sig`);
      return Promise.reject(dataSigError);
    }
    return dataSources.profileAPI.followProfile(user.pubKey, ethAddress);
  },
  unFollow: async (_, { ethAddress }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: ethAddress,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad unFollow sig`);
      return Promise.reject(dataSigError);
    }
    return dataSources.profileAPI.unFollowProfile(user.pubKey, ethAddress);
  },
  saveMetaData: async (_, { data }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: data,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad saveMetaData sig`);
      return Promise.reject(dataSigError);
    }
    return dataSources.profileAPI.saveMetadata(user.pubKey, data);
  },
  addComment: async (_, { content, comment }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: content,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad addComment sig`);
      return Promise.reject(dataSigError);
    }
    if (!comment.postID) {
      return Promise.reject('Must provide a postID to the call!');
    }
    const postData = await dataSources.postsAPI.getRealPost(comment.postID);
    if (!postData) {
      return Promise.reject('Post was not found!');
    }
    const commentID = await dataSources.commentsAPI.addComment(user.pubKey, content, comment);
    if (!commentID?.length) {
      return Promise.reject('Could not save the comment!');
    }
    const totalCommentsIndex = postData.metaData.findIndex(
      m => m.provider === statsProvider && m.property === commentsStats,
    );
    if (totalCommentsIndex !== -1) {
      postData.metaData[totalCommentsIndex].value =
        +postData.metaData[totalCommentsIndex].value + 1;
      postData.metaData[totalCommentsIndex].value = postData.metaData[
        totalCommentsIndex
      ].value.toString();
    } else {
      postData.metaData.push({
        provider: statsProvider,
        property: commentsStats,
        value: '1',
      });
    }
    await dataSources.postsAPI.updatePosts([postData]);
    if (comment.tags && comment.tags.length) {
      for (const tag of comment.tags) {
        await dataSources.tagsAPI.indexComment('Comments', commentID[0], tag);
      }
    }
    const postIDCache = dataSources.postsAPI.getPostCacheKey(comment.postID);
    await queryCache.del(postIDCache);
    return commentID[0];
  },
  reportContent: async (_, { report, meta }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: report,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad reportContent sig`);
      return Promise.reject(dataSigError);
    }
    logger.info(`verified reportContent sig`);
    const profile = await dataSources.profileAPI.resolveProfile(user.pubKey, true);
    if (!profile.length) {
      return Promise.reject('[Must be authenticated! Profile not found!]');
    }
    const reportID = await dataSources.reportingAPI.addReport(
      'ModerationDecisions',
      meta.contentType,
      meta.contentID,
      user.publicKey,
      report.reason,
      report.explanation,
    );
    return reportID;
  },
  moderateContent: async (_, { decision, meta }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: decision,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad moderateContent sig`);
      return Promise.reject(dataSigError);
    }
    logger.info(`verified moderateContent sig`);
    // verify that current user is a valid moderator
    const isAllowed = await dataSources.moderatorsAPI.isModerator(user.pubKey);
    if (!isAllowed) {
      return Promise.reject('[Must be a valid moderator!]');
    }
    return dataSources.moderationAPI.makeDecision(
      meta.contentID,
      user.publicKey,
      decision.explanation,
      decision.delisted,
    );
  },
  updateModerator: async (_, { moderator }, { dataSources, user, signature }) => {
    if (!user) {
      return Promise.reject('Must be authenticated!');
    }
    const verified = await verifyEd25519Sig({
      pubKey: user?.pubKey,
      data: moderator,
      signature: signature,
    });
    if (!verified) {
      logger.warn(`bad updateModerator sig`);
      return Promise.reject(dataSigError);
    }
    logger.info(`verified updateModerator sig`);
    // verify that current user is a valid admin
    const isAllowed = await dataSources.moderatorsAPI.isAdmin(user.pubKey);
    if (!isAllowed) {
      return Promise.reject('[Must be a valid moderation admin!]');
    }
    return await dataSources.moderatorsAPI.updateModerator(
      moderator.ethAddress,
      moderator.admin,
      moderator.active,
    );
  },
};
export default mutations;
