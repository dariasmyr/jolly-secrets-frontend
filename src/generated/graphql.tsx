/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  _count: AccountCount;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  chatMembers?: Maybe<Array<ChatMember>>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  eventApplications?: Maybe<Array<EventApplication>>;
  externalProfiles?: Maybe<Array<ExternalProfile>>;
  groupMembers?: Maybe<Array<GroupMember>>;
  id: Scalars['Int']['output'];
  messages?: Maybe<Array<Message>>;
  notifications?: Maybe<Array<Notification>>;
  roles?: Maybe<Array<AccountRole>>;
  sessions?: Maybe<Array<AccountSession>>;
  status: AccountStatus;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type AccountCount = {
  __typename?: 'AccountCount';
  chatMembers: Scalars['Int']['output'];
  eventApplications: Scalars['Int']['output'];
  externalProfiles: Scalars['Int']['output'];
  groupMembers: Scalars['Int']['output'];
  messages: Scalars['Int']['output'];
  notifications: Scalars['Int']['output'];
  sessions: Scalars['Int']['output'];
};

export enum AccountRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type AccountSession = {
  __typename?: 'AccountSession';
  account: Account;
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  ipAddr: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userAgent?: Maybe<Scalars['String']['output']>;
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Inactive = 'INACTIVE'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  account: Account;
  token: Scalars['String']['output'];
};

export type Chat = {
  __typename?: 'Chat';
  _count: ChatCount;
  chatMembers: Array<ChatMember>;
  createdAt: Scalars['DateTime']['output'];
  eventApplicationPair?: Maybe<Array<EventApplicationPair>>;
  id: Scalars['Int']['output'];
  members?: Maybe<Array<ChatMember>>;
  messages?: Maybe<Array<Message>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChatCount = {
  __typename?: 'ChatCount';
  eventApplicationPair: Scalars['Int']['output'];
  members: Scalars['Int']['output'];
  messages: Scalars['Int']['output'];
};

export type ChatMember = {
  __typename?: 'ChatMember';
  account: Account;
  accountId: Scalars['Int']['output'];
  chat?: Maybe<Chat>;
  chatId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  role: ChatMemberRole;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ChatMemberRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type CreateChatMemberInput = {
  accountId: Scalars['Float']['input'];
  chatId: Scalars['Float']['input'];
  role: Scalars['String']['input'];
};

export type CreateEventApplicationInput = {
  accountId: Scalars['Float']['input'];
  eventId: Scalars['Float']['input'];
  preferences: Array<CreatePreferenceInput>;
};

export type CreateEventInput = {
  description: Scalars['String']['input'];
  endsAt: Scalars['DateTime']['input'];
  groupId: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  startsAt: Scalars['DateTime']['input'];
};

export type CreateGroupMemberInput = {
  accountId: Scalars['Float']['input'];
  link: Scalars['String']['input'];
};

export type CreateMessageInput = {
  accountId: Scalars['Float']['input'];
  chatId: Scalars['Float']['input'];
  text: Scalars['String']['input'];
};

export type CreateOrUpdateGroupInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreatePreferenceInput = {
  applicationId: Scalars['Float']['input'];
  comment: Scalars['String']['input'];
  dislikes: Scalars['String']['input'];
  likes: Scalars['String']['input'];
  priceRange: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  _count: EventCount;
  applicationPairs?: Maybe<Array<EventApplicationPair>>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  endsAt: Scalars['DateTime']['output'];
  eventApplicationPairs: Array<EventApplicationPair>;
  group: Group;
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pictureUrl: Scalars['String']['output'];
  startsAt: Scalars['DateTime']['output'];
  status: EventStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type EventApplication = {
  __typename?: 'EventApplication';
  _count: EventApplicationCount;
  account: Account;
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  eventApplicationFirstPairs?: Maybe<Array<EventApplicationPair>>;
  eventApplicationSecondPairs?: Maybe<Array<EventApplicationPair>>;
  id: Scalars['Int']['output'];
  preferences?: Maybe<Array<Preference>>;
  status: EventApplicationStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type EventApplicationCount = {
  __typename?: 'EventApplicationCount';
  eventApplicationFirstPairs: Scalars['Int']['output'];
  eventApplicationSecondPairs: Scalars['Int']['output'];
  preferences: Scalars['Int']['output'];
};

export type EventApplicationPair = {
  __typename?: 'EventApplicationPair';
  applicationFirst: EventApplication;
  applicationSecond?: Maybe<EventApplication>;
  chat?: Maybe<Chat>;
  chatId?: Maybe<Scalars['Int']['output']>;
  chats: Array<Chat>;
  createdAt: Scalars['DateTime']['output'];
  event: Event;
  eventApplicationFirst: EventApplication;
  eventApplicationFirstId: Scalars['Int']['output'];
  eventApplicationSecond: EventApplication;
  eventApplicationSecondId?: Maybe<Scalars['Int']['output']>;
  eventId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum EventApplicationStatus {
  GiftNotReceived = 'GIFT_NOT_RECEIVED',
  GiftReceived = 'GIFT_RECEIVED',
  GiftSent = 'GIFT_SENT',
  LookingForPair = 'LOOKING_FOR_PAIR',
  Paired = 'PAIRED'
}

export type EventCount = {
  __typename?: 'EventCount';
  applicationPairs: Scalars['Int']['output'];
};

export enum EventStatus {
  Closed = 'CLOSED',
  Expired = 'EXPIRED',
  Open = 'OPEN'
}

export type ExternalProfile = {
  __typename?: 'ExternalProfile';
  account: Account;
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  externalId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  provider: ExternalProfileProvider;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ExternalProfileProvider {
  Google = 'GOOGLE',
  Telegram = 'TELEGRAM'
}

export type Group = {
  __typename?: 'Group';
  _count: GroupCount;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  events?: Maybe<Array<Event>>;
  groupInvites?: Maybe<Array<GroupInvite>>;
  id: Scalars['Int']['output'];
  members?: Maybe<Array<GroupMember>>;
  name: Scalars['String']['output'];
  pictureUrl: Scalars['String']['output'];
  status: GroupStatus;
  type: GroupType;
  updatedAt: Scalars['DateTime']['output'];
};

export type GroupCount = {
  __typename?: 'GroupCount';
  events: Scalars['Int']['output'];
  groupInvites: Scalars['Int']['output'];
  members: Scalars['Int']['output'];
};

export type GroupInvite = {
  __typename?: 'GroupInvite';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  group: Group;
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GroupMember = {
  __typename?: 'GroupMember';
  account: Account;
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  group: Group;
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  role: GroupMemberRole;
  updatedAt: Scalars['DateTime']['output'];
};

export enum GroupMemberRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export enum GroupStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export enum GroupType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Message = {
  __typename?: 'Message';
  account: Account;
  accountId: Scalars['Int']['output'];
  chat?: Maybe<Chat>;
  chatId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChatMember: ChatMember;
  createEvent: Event;
  createEventApplication: Event;
  createGroup: Group;
  createGroupMember: GroupMember;
  createMessage: Message;
  deleteAccount: Account;
  deleteEvent: Scalars['Boolean']['output'];
  deleteGroup: Group;
  deletePreference: Preference;
  disableNotifications: Account;
  echo: Scalars['String']['output'];
  enableNotifications: Account;
  loginWithGoogle: AuthResponse;
  loginWithTelegram: AuthResponse;
  logout: Scalars['Boolean']['output'];
  mergeProfileToAccount: Account;
  setEventApplicationStatus: Event;
  setNotificationAsRead: Notification;
  updateAccount: Account;
  updateGroup: Group;
};


export type MutationCreateChatMemberArgs = {
  input: CreateChatMemberInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateEventApplicationArgs = {
  input: CreateEventApplicationInput;
};


export type MutationCreateGroupArgs = {
  input: CreateOrUpdateGroupInput;
};


export type MutationCreateGroupMemberArgs = {
  input: CreateGroupMemberInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeletePreferenceArgs = {
  id: Scalars['Float']['input'];
};


export type MutationEchoArgs = {
  text: Scalars['String']['input'];
};


export type MutationEnableNotificationsArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginWithGoogleArgs = {
  code: Scalars['String']['input'];
};


export type MutationLoginWithTelegramArgs = {
  token: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  sessionIds: Array<Scalars['Float']['input']>;
};


export type MutationMergeProfileToAccountArgs = {
  accountIdToLeave: Scalars['Float']['input'];
  accountIdToRemove: Scalars['Float']['input'];
  externalId: Scalars['String']['input'];
  provider: Scalars['String']['input'];
};


export type MutationSetEventApplicationStatusArgs = {
  eventApplicationId: Scalars['Float']['input'];
  status: Scalars['String']['input'];
};


export type MutationSetNotificationAsReadArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdateGroupArgs = {
  id: Scalars['Float']['input'];
  input: CreateOrUpdateGroupInput;
};

export type Notification = {
  __typename?: 'Notification';
  account: Account;
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Preference = {
  __typename?: 'Preference';
  application?: Maybe<EventApplication>;
  applicationId?: Maybe<Scalars['Int']['output']>;
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  dislikes: Scalars['String']['output'];
  eventApplication: EventApplication;
  id: Scalars['Int']['output'];
  likes: Scalars['String']['output'];
  priceRange: PriceRange;
  updatedAt: Scalars['DateTime']['output'];
};

export enum PriceRange {
  Min_0Max_10 = 'MIN_0_MAX_10',
  Min_10Max_20 = 'MIN_10_MAX_20',
  Min_20Max_30 = 'MIN_20_MAX_30',
  NoMatter = 'NO_MATTER'
}

export type Query = {
  __typename?: 'Query';
  chat: Array<Chat>;
  chatMembers: Array<ChatMember>;
  currentSession: AccountSession;
  debug: Scalars['JSON']['output'];
  echo: Scalars['String']['output'];
  event: Event;
  eventApplicationPair: EventApplicationPair;
  eventApplicationPairs: Array<EventApplicationPair>;
  events: Array<Event>;
  generateTelegramBotLink: Scalars['String']['output'];
  generateUrlGoogle: Scalars['String']['output'];
  group: Group;
  groupInvite: Array<GroupInvite>;
  groupMember: Array<GroupMember>;
  messages: Array<Message>;
  notification: Notification;
  notifications: Array<Notification>;
  privateGroups: Array<Group>;
  publicGroups: Array<Group>;
  testTranslation: Scalars['String']['output'];
  whoami: Account;
};


export type QueryChatArgs = {
  id: Scalars['Float']['input'];
};


export type QueryChatMembersArgs = {
  chatId: Scalars['Float']['input'];
};


export type QueryEchoArgs = {
  text: Scalars['String']['input'];
};


export type QueryEventArgs = {
  id: Scalars['Float']['input'];
};


export type QueryEventApplicationPairArgs = {
  id: Scalars['Float']['input'];
};


export type QueryEventApplicationPairsArgs = {
  eventId: Scalars['Float']['input'];
};


export type QueryEventsArgs = {
  groupId: Scalars['Float']['input'];
};


export type QueryGenerateUrlGoogleArgs = {
  state?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGroupArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGroupInviteArgs = {
  groupId: Scalars['Float']['input'];
};


export type QueryGroupMemberArgs = {
  groupId: Scalars['Float']['input'];
};


export type QueryMessagesArgs = {
  chatId: Scalars['Float']['input'];
};


export type QueryNotificationArgs = {
  id: Scalars['Float']['input'];
};


export type QueryNotificationsArgs = {
  limit: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
};


export type QueryPrivateGroupsArgs = {
  limit: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
};


export type QueryPublicGroupsArgs = {
  limit: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
};


export type QueryTestTranslationArgs = {
  username: Scalars['String']['input'];
};

export type UpdateAccountInput = {
  username: Scalars['String']['input'];
};

export type DebugQueryVariables = Exact<{ [key: string]: never; }>;


export type DebugQuery = { __typename?: 'Query', debug: any };

export type GenerateTelegramBotLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTelegramBotLinkQuery = { __typename?: 'Query', generateTelegramBotLink: string };

export type LoginWithTelegramMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type LoginWithTelegramMutation = { __typename?: 'Mutation', loginWithTelegram: { __typename?: 'AuthResponse', token: string, account: { __typename?: 'Account', id: number, email?: string | null, roles?: Array<AccountRole> | null, status: AccountStatus, username: string } } };


export const DebugDocument = gql`
    query Debug {
  debug
}
    `;

/**
 * __useDebugQuery__
 *
 * To run a query within a React component, call `useDebugQuery` and pass it any options that fit your needs.
 * When your component renders, `useDebugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDebugQuery({
 *   variables: {
 *   },
 * });
 */
export function useDebugQuery(baseOptions?: Apollo.QueryHookOptions<DebugQuery, DebugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DebugQuery, DebugQueryVariables>(DebugDocument, options);
      }
export function useDebugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DebugQuery, DebugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DebugQuery, DebugQueryVariables>(DebugDocument, options);
        }
export type DebugQueryHookResult = ReturnType<typeof useDebugQuery>;
export type DebugLazyQueryHookResult = ReturnType<typeof useDebugLazyQuery>;
export type DebugQueryResult = Apollo.QueryResult<DebugQuery, DebugQueryVariables>;
export const GenerateTelegramBotLinkDocument = gql`
    query GenerateTelegramBotLink {
  generateTelegramBotLink
}
    `;

/**
 * __useGenerateTelegramBotLinkQuery__
 *
 * To run a query within a React component, call `useGenerateTelegramBotLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateTelegramBotLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateTelegramBotLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTelegramBotLinkQuery(baseOptions?: Apollo.QueryHookOptions<GenerateTelegramBotLinkQuery, GenerateTelegramBotLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateTelegramBotLinkQuery, GenerateTelegramBotLinkQueryVariables>(GenerateTelegramBotLinkDocument, options);
      }
export function useGenerateTelegramBotLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateTelegramBotLinkQuery, GenerateTelegramBotLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateTelegramBotLinkQuery, GenerateTelegramBotLinkQueryVariables>(GenerateTelegramBotLinkDocument, options);
        }
export type GenerateTelegramBotLinkQueryHookResult = ReturnType<typeof useGenerateTelegramBotLinkQuery>;
export type GenerateTelegramBotLinkLazyQueryHookResult = ReturnType<typeof useGenerateTelegramBotLinkLazyQuery>;
export type GenerateTelegramBotLinkQueryResult = Apollo.QueryResult<GenerateTelegramBotLinkQuery, GenerateTelegramBotLinkQueryVariables>;
export const LoginWithTelegramDocument = gql`
    mutation LoginWithTelegram($token: String!) {
  loginWithTelegram(token: $token) {
    token
    account {
      id
      email
      roles
      status
      username
    }
  }
}
    `;
export type LoginWithTelegramMutationFn = Apollo.MutationFunction<LoginWithTelegramMutation, LoginWithTelegramMutationVariables>;

/**
 * __useLoginWithTelegramMutation__
 *
 * To run a mutation, you first call `useLoginWithTelegramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithTelegramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithTelegramMutation, { data, loading, error }] = useLoginWithTelegramMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLoginWithTelegramMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithTelegramMutation, LoginWithTelegramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithTelegramMutation, LoginWithTelegramMutationVariables>(LoginWithTelegramDocument, options);
      }
export type LoginWithTelegramMutationHookResult = ReturnType<typeof useLoginWithTelegramMutation>;
export type LoginWithTelegramMutationResult = Apollo.MutationResult<LoginWithTelegramMutation>;
export type LoginWithTelegramMutationOptions = Apollo.BaseMutationOptions<LoginWithTelegramMutation, LoginWithTelegramMutationVariables>;