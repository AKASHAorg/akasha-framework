declare module '*/profile.graphql' {
  import { DocumentNode, TypedQueryDocumentNode } from 'graphql';

  const AddProfileProvider: DocumentNode;
  const MakeDefaultProvider: DocumentNode;
  const RegisterUsername: DocumentNode;
  const ResolveProfile: TypedQueryDocumentNode;
  const GetProfile: TypedQueryDocumentNode;
  const Follow: DocumentNode;
  const UnFollow: DocumentNode;
  const IsFollowing: TypedQueryDocumentNode;
  const SaveMetaData: DocumentNode;
  const ToggleInterestSub: DocumentNode;
  const SearchProfiles: TypedQueryDocumentNode;
  const GlobalSearch: TypedQueryDocumentNode;
  const GetFollowers: TypedQueryDocumentNode;
  const GetFollowing: TypedQueryDocumentNode;
  const GetInterests: TypedQueryDocumentNode;
  const IsUserNameAvailable: TypedQueryDocumentNode;

  export {
    AddProfileProvider,
    MakeDefaultProvider,
    RegisterUsername,
    ResolveProfile,
    GetProfile,
    Follow,
    UnFollow,
    IsFollowing,
    SaveMetaData,
    SearchProfiles,
    GlobalSearch,
    GetFollowers,
    GetFollowing,
    ToggleInterestSub,
    GetInterests,
    IsUserNameAvailable
  };
}

declare module '*/tag.graphql' {
  import { DocumentNode, FragmentSpreadNode, TypedQueryDocumentNode } from 'graphql';
  const TagFields: FragmentSpreadNode;
  const GetTag: TypedQueryDocumentNode;
  const GetTags: TypedQueryDocumentNode;
  const SearchTags: TypedQueryDocumentNode;
  const CreateTag: DocumentNode;

  export { TagFields, GetTag, GetTags, SearchTags, CreateTag };
}

declare module '*/entry.graphql' {
  import { DocumentNode, FragmentSpreadNode, TypedQueryDocumentNode } from 'graphql';
  const DataProviderFragment: FragmentSpreadNode;
  const UserProfileFragment: FragmentSpreadNode;
  const GetEntry: TypedQueryDocumentNode;
  const GetEntries: TypedQueryDocumentNode;
  const GetPostsByAuthor: TypedQueryDocumentNode;
  const GetPostsByTag: TypedQueryDocumentNode;
  const GetLinkPreview: TypedQueryDocumentNode;
  const GetCustomFeed: TypedQueryDocumentNode;
  const CreateEntry: DocumentNode;
  const EditEntry: DocumentNode;
  const RemoveEntry: DocumentNode;

  export {
    DataProviderFragment,
    UserProfileFragment,
    GetEntry,
    GetEntries,
    GetPostsByAuthor,
    GetPostsByTag,
    CreateEntry,
    EditEntry,
    RemoveEntry,
    GetLinkPreview,
    GetCustomFeed,
  };
}

declare module '*/comments.graphql' {
  import { DocumentNode, FragmentSpreadNode, TypedQueryDocumentNode } from 'graphql';
  const DataProviderFragment: FragmentSpreadNode;
  const UserProfileFragment: FragmentSpreadNode;
  const GetComment: TypedQueryDocumentNode;
  const GetComments: TypedQueryDocumentNode;
  const AddComment: DocumentNode;
  const EditComment: DocumentNode;
  const RemoveComment: DocumentNode;

  export {
    GetComment,
    GetComments,
    AddComment,
    DataProviderFragment,
    UserProfileFragment,
    EditComment,
    RemoveComment,
  };
}

declare module '*/icRegistry.graphql' {
  import { FragmentSpreadNode, TypedQueryDocumentNode } from 'graphql';
  const IntegrationInfoFragment: FragmentSpreadNode;
  const IntegrationReleaseInfoFragment: FragmentSpreadNode;
  const GetLatestRelease: TypedQueryDocumentNode;
  const GetIntegrationInfo: TypedQueryDocumentNode;

  export {
    IntegrationInfoFragment,
    IntegrationReleaseInfoFragment,
    GetLatestRelease,
    GetIntegrationInfo,
  };
}
