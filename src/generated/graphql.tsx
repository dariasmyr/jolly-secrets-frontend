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
  isNotificationsEnabled: Scalars['Boolean']['output'];
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
  accountId: Scalars['Int']['input'];
  eventId: Scalars['Int']['input'];
  preferences: Array<CreatePreferenceInput>;
};

export type CreateEventInput = {
  description: Scalars['String']['input'];
  endsAt: Scalars['DateTime']['input'];
  groupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
  startsAt: Scalars['DateTime']['input'];
};

export type CreateMessageInput = {
  accountId: Scalars['Float']['input'];
  chatId: Scalars['Float']['input'];
  text: Scalars['String']['input'];
};

export type CreateOrUpdateGroupInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
  type: GroupType;
};

export type CreatePreferenceInput = {
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
  group: Group;
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pictureUrl?: Maybe<Scalars['String']['output']>;
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
  eventApplicationFirstId: Scalars['Int']['output'];
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
  pictureUrl?: Maybe<Scalars['String']['output']>;
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
  createGroupInvite: GroupInvite;
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
  setEventApplicationStatus: EventApplication;
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


export type MutationCreateGroupInviteArgs = {
  groupId: Scalars['Int']['input'];
};


export type MutationCreateGroupMemberArgs = {
  code: Scalars['String']['input'];
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePreferenceArgs = {
  id: Scalars['Float']['input'];
};


export type MutationEchoArgs = {
  text: Scalars['String']['input'];
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
  eventApplicationId: Scalars['Int']['input'];
  status: EventApplicationStatus;
};


export type MutationSetNotificationAsReadArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateAccountArgs = {
  username: Scalars['String']['input'];
};


export type MutationUpdateGroupArgs = {
  id: Scalars['Int']['input'];
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
  applicationPair: EventApplicationPair;
  applicationPairs: Array<EventApplicationPair>;
  chat: Array<Chat>;
  chatMembers: Array<ChatMember>;
  currentSession: AccountSession;
  debug: Scalars['JSON']['output'];
  echo: Scalars['String']['output'];
  event: Event;
  events: Array<Event>;
  generateTelegramBotLink: Scalars['String']['output'];
  generateUrlGoogle: Scalars['String']['output'];
  getAccountCount: Scalars['Int']['output'];
  getEventApplicationPairByEventAndAccount?: Maybe<EventApplicationPair>;
  getGroupByEventId: Group;
  group: Group;
  groupInvite: Array<GroupInvite>;
  groupMember: Array<GroupMember>;
  isGroupNameAvailable: Scalars['Boolean']['output'];
  messages: Array<Message>;
  notification: Notification;
  notifications: Array<Notification>;
  privateGroups: Array<Group>;
  publicGroups: Array<Group>;
  testTranslation: Scalars['String']['output'];
  whoami: Account;
};


export type QueryApplicationPairArgs = {
  id: Scalars['Int']['input'];
};


export type QueryApplicationPairsArgs = {
  eventId: Scalars['Float']['input'];
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
  id: Scalars['Int']['input'];
};


export type QueryEventsArgs = {
  groupId: Scalars['Int']['input'];
};


export type QueryGenerateUrlGoogleArgs = {
  state?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetEventApplicationPairByEventAndAccountArgs = {
  eventId: Scalars['Int']['input'];
};


export type QueryGetGroupByEventIdArgs = {
  eventId: Scalars['Int']['input'];
};


export type QueryGroupArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGroupInviteArgs = {
  groupId: Scalars['Float']['input'];
};


export type QueryGroupMemberArgs = {
  groupId: Scalars['Float']['input'];
};


export type QueryIsGroupNameAvailableArgs = {
  name: Scalars['String']['input'];
};


export type QueryMessagesArgs = {
  chatId: Scalars['Float']['input'];
};


export type QueryNotificationArgs = {
  id: Scalars['Float']['input'];
};


export type QueryNotificationsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryPrivateGroupsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryPublicGroupsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryTestTranslationArgs = {
  username: Scalars['String']['input'];
};

export type CreateEventApplicationMutationVariables = Exact<{
  accountId: Scalars['Int']['input'];
  eventId: Scalars['Int']['input'];
  preferences: Array<CreatePreferenceInput> | CreatePreferenceInput;
}>;


export type CreateEventApplicationMutation = { __typename?: 'Mutation', createEventApplication: { __typename?: 'Event', id: number, applicationPairs?: Array<{ __typename?: 'EventApplicationPair', id: number, createdAt: any, updatedAt: any, eventId: number, eventApplicationFirstId: number, eventApplicationSecondId?: number | null, chatId?: number | null, event: { __typename?: 'Event', id: number }, applicationFirst: { __typename?: 'EventApplication', id: number, createdAt: any, updatedAt: any, accountId: number, status: EventApplicationStatus, account: { __typename?: 'Account', id: number }, preferences?: Array<{ __typename?: 'Preference', id: number, createdAt: any, updatedAt: any, priceRange: PriceRange, likes: string, dislikes: string, comment: string, applicationId?: number | null, application?: { __typename?: 'EventApplication', id: number } | null, eventApplication: { __typename?: 'EventApplication', id: number } }> | null } }> | null } };

export type CreateEventMutationVariables = Exact<{
  groupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  startsAt: Scalars['DateTime']['input'];
  endsAt: Scalars['DateTime']['input'];
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: number, createdAt: any, pictureUrl?: string | null, name: string, description: string, status: EventStatus, startsAt: any, endsAt: any, group: { __typename?: 'Group', id: number }, applicationPairs?: Array<{ __typename?: 'EventApplicationPair', id: number }> | null } };

export type CreateGroupInviteMutationVariables = Exact<{
  groupId: Scalars['Int']['input'];
}>;


export type CreateGroupInviteMutation = { __typename?: 'Mutation', createGroupInvite: { __typename?: 'GroupInvite', id: number, createdAt: any, updatedAt: any, groupId: number, code: string } };

export type CreateGroupMemberMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type CreateGroupMemberMutation = { __typename?: 'Mutation', createGroupMember: { __typename?: 'GroupMember', id: number, createdAt: any, updatedAt: any, groupId: number, accountId: number, role: GroupMemberRole, group: { __typename?: 'Group', id: number, type: GroupType }, account: { __typename?: 'Account', id: number, roles?: Array<AccountRole> | null } } };

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  type: GroupType;
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: number, createdAt: any, pictureUrl?: string | null, name: string, description: string, type: GroupType, status: GroupStatus, events?: Array<{ __typename?: 'Event', status: EventStatus }> | null, members?: Array<{ __typename?: 'GroupMember', id: number, role: GroupMemberRole }> | null } };

export type DebugQueryVariables = Exact<{ [key: string]: never; }>;


export type DebugQuery = { __typename?: 'Query', debug: any };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, email?: string | null, roles?: Array<AccountRole> | null, status: AccountStatus, avatarUrl?: string | null, username: string, sessions?: Array<{ __typename?: 'AccountSession', id: number, accountId: number, ipAddr: string, userAgent?: string | null, expiresAt: any }> | null } };

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: number, createdAt: any, pictureUrl?: string | null, name: string, description: string, type: GroupType, status: GroupStatus, events?: Array<{ __typename?: 'Event', status: EventStatus }> | null, members?: Array<{ __typename?: 'GroupMember', id: number, role: GroupMemberRole }> | null } };

export type DisableNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type DisableNotificationsMutation = { __typename?: 'Mutation', disableNotifications: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, email?: string | null, isNotificationsEnabled: boolean, roles?: Array<AccountRole> | null, status: AccountStatus, avatarUrl?: string | null, username: string } };

export type EnableNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type EnableNotificationsMutation = { __typename?: 'Mutation', enableNotifications: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, email?: string | null, isNotificationsEnabled: boolean, roles?: Array<AccountRole> | null, status: AccountStatus, avatarUrl?: string | null, username: string } };

export type GetEventApplicationPairByEventAndAccountQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type GetEventApplicationPairByEventAndAccountQuery = { __typename?: 'Query', getEventApplicationPairByEventAndAccount?: { __typename?: 'EventApplicationPair', id: number, createdAt: any, updatedAt: any, eventId: number, eventApplicationFirstId: number, eventApplicationSecondId?: number | null, chatId?: number | null, event: { __typename?: 'Event', id: number }, applicationFirst: { __typename?: 'EventApplication', id: number, createdAt: any, updatedAt: any, accountId: number, status: EventApplicationStatus, preferences?: Array<{ __typename?: 'Preference', id: number, createdAt: any, updatedAt: any, priceRange: PriceRange, likes: string, dislikes: string, comment: string, applicationId?: number | null }> | null }, applicationSecond?: { __typename?: 'EventApplication', id: number, createdAt: any, updatedAt: any, accountId: number, status: EventApplicationStatus, preferences?: Array<{ __typename?: 'Preference', id: number, createdAt: any, updatedAt: any, priceRange: PriceRange, likes: string, dislikes: string, comment: string, applicationId?: number | null }> | null } | null } | null };

export type EventQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'Event', id: number, createdAt: any, pictureUrl?: string | null, name: string, description: string, status: EventStatus, startsAt: any, endsAt: any, group: { __typename?: 'Group', id: number }, applicationPairs?: Array<{ __typename?: 'EventApplicationPair', id: number }> | null } };

export type EventsQueryVariables = Exact<{
  groupId: Scalars['Int']['input'];
}>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, createdAt: any, pictureUrl?: string | null, name: string, description: string, status: EventStatus, startsAt: any, endsAt: any, group: { __typename?: 'Group', id: number }, applicationPairs?: Array<{ __typename?: 'EventApplicationPair', id: number }> | null }> };

export type GetAccountCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountCountQuery = { __typename?: 'Query', getAccountCount: number };

export type GetGroupByEventIdQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type GetGroupByEventIdQuery = { __typename?: 'Query', getGroupByEventId: { __typename?: 'Group', id: number, createdAt: any, updatedAt: any, pictureUrl?: string | null, name: string, description: string, type: GroupType, status: GroupStatus, members?: Array<{ __typename?: 'GroupMember', id: number, createdAt: any, updatedAt: any, groupId: number, accountId: number, role: GroupMemberRole }> | null, events?: Array<{ __typename?: 'Event', id: number, createdAt: any, updatedAt: any, pictureUrl?: string | null, status: EventStatus, groupId: number, name: string, description: string, startsAt: any, endsAt: any }> | null, groupInvites?: Array<{ __typename?: 'GroupInvite', id: number, createdAt: any, updatedAt: any, groupId: number, code: string }> | null } };

export type GroupQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GroupQuery = { __typename?: 'Query', group: { __typename?: 'Group', id: number, createdAt: any, updatedAt: any, pictureUrl?: string | null, name: string, description: string, type: GroupType, status: GroupStatus, members?: Array<{ __typename?: 'GroupMember', id: number, createdAt: any, updatedAt: any, groupId: number, accountId: number, role: GroupMemberRole }> | null, events?: Array<{ __typename?: 'Event', id: number, createdAt: any, updatedAt: any, pictureUrl?: string | null, status: EventStatus, groupId: number, name: string, description: string, startsAt: any, endsAt: any }> | null, groupInvites?: Array<{ __typename?: 'GroupInvite', id: number, createdAt: any, updatedAt: any, groupId: number, code: string }> | null } };

export type IsGroupNameAvailvableQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type IsGroupNameAvailvableQuery = { __typename?: 'Query', isGroupNameAvailable: boolean };

export type GenerateUrlGoogleQueryVariables = Exact<{
  state: Scalars['String']['input'];
}>;


export type GenerateUrlGoogleQuery = { __typename?: 'Query', generateUrlGoogle: string };

export type LoginWithGoogleMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type LoginWithGoogleMutation = { __typename?: 'Mutation', loginWithGoogle: { __typename?: 'AuthResponse', token: string, account: { __typename?: 'Account', id: number, email?: string | null, roles?: Array<AccountRole> | null, status: AccountStatus, username: string, avatarUrl?: string | null } } };

export type GenerateTelegramBotLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTelegramBotLinkQuery = { __typename?: 'Query', generateTelegramBotLink: string };

export type LoginWithTelegramMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type LoginWithTelegramMutation = { __typename?: 'Mutation', loginWithTelegram: { __typename?: 'AuthResponse', token: string, account: { __typename?: 'Account', id: number, email?: string | null, roles?: Array<AccountRole> | null, status: AccountStatus, username: string, avatarUrl?: string | null } } };

export type NotificationsQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notification', id: number, createdAt: any, updatedAt: any, accountId: number, title: string, message: string, read: boolean }> };

export type PrivateGroupsQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PrivateGroupsQuery = { __typename?: 'Query', privateGroups: Array<{ __typename?: 'Group', id: number, createdAt: any, pictureUrl?: string | null, name: string, description: string, type: GroupType, status: GroupStatus, events?: Array<{ __typename?: 'Event', status: EventStatus }> | null, members?: Array<{ __typename?: 'GroupMember', id: number, role: GroupMemberRole, accountId: number }> | null }> };

export type PublicGroupsQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PublicGroupsQuery = { __typename?: 'Query', publicGroups: Array<{ __typename?: 'Group', id: number, createdAt: any, pictureUrl?: string | null, name: string, description: string, type: GroupType, status: GroupStatus, events?: Array<{ __typename?: 'Event', status: EventStatus }> | null, members?: Array<{ __typename?: 'GroupMember', id: number, role: GroupMemberRole, accountId: number }> | null }> };

export type SetEventApplicationStatusMutationVariables = Exact<{
  eventApplicationId: Scalars['Int']['input'];
  status: EventApplicationStatus;
}>;


export type SetEventApplicationStatusMutation = { __typename?: 'Mutation', setEventApplicationStatus: { __typename?: 'EventApplication', id: number, status: EventApplicationStatus } };

export type UpdateAccountMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, email?: string | null, roles?: Array<AccountRole> | null, status: AccountStatus, avatarUrl?: string | null, username: string } };

export type UpdateGroupMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  type: GroupType;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: number, createdAt: any, pictureUrl?: string | null, name: string, description: string, type: GroupType, status: GroupStatus, events?: Array<{ __typename?: 'Event', status: EventStatus }> | null, members?: Array<{ __typename?: 'GroupMember', id: number, role: GroupMemberRole }> | null } };

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { __typename?: 'Query', whoami: { __typename?: 'Account', id: number, createdAt: any, email?: string | null, isNotificationsEnabled: boolean, roles?: Array<AccountRole> | null, status: AccountStatus, avatarUrl?: string | null, username: string, externalProfiles?: Array<{ __typename?: 'ExternalProfile', provider: ExternalProfileProvider, externalId: string }> | null } };


export const CreateEventApplicationDocument = gql`
    mutation createEventApplication($accountId: Int!, $eventId: Int!, $preferences: [CreatePreferenceInput!]!) {
  createEventApplication(
    input: {accountId: $accountId, eventId: $eventId, preferences: $preferences}
  ) {
    id
    applicationPairs {
      id
      createdAt
      updatedAt
      eventId
      eventApplicationFirstId
      eventApplicationSecondId
      chatId
      event {
        id
      }
      applicationFirst {
        id
        createdAt
        updatedAt
        accountId
        status
        account {
          id
        }
        preferences {
          id
          createdAt
          updatedAt
          priceRange
          likes
          dislikes
          comment
          applicationId
          application {
            id
          }
          eventApplication {
            id
          }
        }
      }
    }
  }
}
    `;
export type CreateEventApplicationMutationFn = Apollo.MutationFunction<CreateEventApplicationMutation, CreateEventApplicationMutationVariables>;

/**
 * __useCreateEventApplicationMutation__
 *
 * To run a mutation, you first call `useCreateEventApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventApplicationMutation, { data, loading, error }] = useCreateEventApplicationMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      eventId: // value for 'eventId'
 *      preferences: // value for 'preferences'
 *   },
 * });
 */
export function useCreateEventApplicationMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventApplicationMutation, CreateEventApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventApplicationMutation, CreateEventApplicationMutationVariables>(CreateEventApplicationDocument, options);
      }
export type CreateEventApplicationMutationHookResult = ReturnType<typeof useCreateEventApplicationMutation>;
export type CreateEventApplicationMutationResult = Apollo.MutationResult<CreateEventApplicationMutation>;
export type CreateEventApplicationMutationOptions = Apollo.BaseMutationOptions<CreateEventApplicationMutation, CreateEventApplicationMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($groupId: Int!, $name: String!, $description: String!, $startsAt: DateTime!, $endsAt: DateTime!, $pictureUrl: String) {
  createEvent(
    input: {groupId: $groupId, name: $name, description: $description, startsAt: $startsAt, endsAt: $endsAt, pictureUrl: $pictureUrl}
  ) {
    id
    createdAt
    pictureUrl
    name
    description
    status
    startsAt
    endsAt
    group {
      id
    }
    applicationPairs {
      id
    }
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      startsAt: // value for 'startsAt'
 *      endsAt: // value for 'endsAt'
 *      pictureUrl: // value for 'pictureUrl'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const CreateGroupInviteDocument = gql`
    mutation CreateGroupInvite($groupId: Int!) {
  createGroupInvite(groupId: $groupId) {
    id
    createdAt
    updatedAt
    groupId
    code
  }
}
    `;
export type CreateGroupInviteMutationFn = Apollo.MutationFunction<CreateGroupInviteMutation, CreateGroupInviteMutationVariables>;

/**
 * __useCreateGroupInviteMutation__
 *
 * To run a mutation, you first call `useCreateGroupInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupInviteMutation, { data, loading, error }] = useCreateGroupInviteMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreateGroupInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupInviteMutation, CreateGroupInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupInviteMutation, CreateGroupInviteMutationVariables>(CreateGroupInviteDocument, options);
      }
export type CreateGroupInviteMutationHookResult = ReturnType<typeof useCreateGroupInviteMutation>;
export type CreateGroupInviteMutationResult = Apollo.MutationResult<CreateGroupInviteMutation>;
export type CreateGroupInviteMutationOptions = Apollo.BaseMutationOptions<CreateGroupInviteMutation, CreateGroupInviteMutationVariables>;
export const CreateGroupMemberDocument = gql`
    mutation CreateGroupMember($code: String!) {
  createGroupMember(code: $code) {
    id
    createdAt
    updatedAt
    groupId
    accountId
    role
    group {
      id
      type
    }
    account {
      id
      roles
    }
  }
}
    `;
export type CreateGroupMemberMutationFn = Apollo.MutationFunction<CreateGroupMemberMutation, CreateGroupMemberMutationVariables>;

/**
 * __useCreateGroupMemberMutation__
 *
 * To run a mutation, you first call `useCreateGroupMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMemberMutation, { data, loading, error }] = useCreateGroupMemberMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useCreateGroupMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMemberMutation, CreateGroupMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMemberMutation, CreateGroupMemberMutationVariables>(CreateGroupMemberDocument, options);
      }
export type CreateGroupMemberMutationHookResult = ReturnType<typeof useCreateGroupMemberMutation>;
export type CreateGroupMemberMutationResult = Apollo.MutationResult<CreateGroupMemberMutation>;
export type CreateGroupMemberMutationOptions = Apollo.BaseMutationOptions<CreateGroupMemberMutation, CreateGroupMemberMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($name: String!, $description: String!, $type: GroupType!, $pictureUrl: String) {
  createGroup(
    input: {name: $name, description: $description, type: $type, pictureUrl: $pictureUrl}
  ) {
    id
    createdAt
    pictureUrl
    name
    description
    type
    status
    events {
      status
    }
    members {
      id
      role
    }
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      pictureUrl: // value for 'pictureUrl'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
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
export const DeleteAccountDocument = gql`
    mutation deleteAccount {
  deleteAccount {
    id
    createdAt
    updatedAt
    email
    roles
    status
    avatarUrl
    username
    sessions {
      id
      accountId
      ipAddr
      userAgent
      expiresAt
    }
  }
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($id: Int!) {
  deleteGroup(id: $id) {
    id
    createdAt
    pictureUrl
    name
    description
    type
    status
    events {
      status
    }
    members {
      id
      role
    }
  }
}
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const DisableNotificationsDocument = gql`
    mutation disableNotifications {
  disableNotifications {
    id
    createdAt
    updatedAt
    email
    isNotificationsEnabled
    roles
    status
    avatarUrl
    username
  }
}
    `;
export type DisableNotificationsMutationFn = Apollo.MutationFunction<DisableNotificationsMutation, DisableNotificationsMutationVariables>;

/**
 * __useDisableNotificationsMutation__
 *
 * To run a mutation, you first call `useDisableNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableNotificationsMutation, { data, loading, error }] = useDisableNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisableNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<DisableNotificationsMutation, DisableNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableNotificationsMutation, DisableNotificationsMutationVariables>(DisableNotificationsDocument, options);
      }
export type DisableNotificationsMutationHookResult = ReturnType<typeof useDisableNotificationsMutation>;
export type DisableNotificationsMutationResult = Apollo.MutationResult<DisableNotificationsMutation>;
export type DisableNotificationsMutationOptions = Apollo.BaseMutationOptions<DisableNotificationsMutation, DisableNotificationsMutationVariables>;
export const EnableNotificationsDocument = gql`
    mutation enableNotifications {
  enableNotifications {
    id
    createdAt
    updatedAt
    email
    isNotificationsEnabled
    roles
    status
    avatarUrl
    username
  }
}
    `;
export type EnableNotificationsMutationFn = Apollo.MutationFunction<EnableNotificationsMutation, EnableNotificationsMutationVariables>;

/**
 * __useEnableNotificationsMutation__
 *
 * To run a mutation, you first call `useEnableNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableNotificationsMutation, { data, loading, error }] = useEnableNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useEnableNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<EnableNotificationsMutation, EnableNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableNotificationsMutation, EnableNotificationsMutationVariables>(EnableNotificationsDocument, options);
      }
export type EnableNotificationsMutationHookResult = ReturnType<typeof useEnableNotificationsMutation>;
export type EnableNotificationsMutationResult = Apollo.MutationResult<EnableNotificationsMutation>;
export type EnableNotificationsMutationOptions = Apollo.BaseMutationOptions<EnableNotificationsMutation, EnableNotificationsMutationVariables>;
export const GetEventApplicationPairByEventAndAccountDocument = gql`
    query getEventApplicationPairByEventAndAccount($eventId: Int!) {
  getEventApplicationPairByEventAndAccount(eventId: $eventId) {
    id
    createdAt
    updatedAt
    eventId
    eventApplicationFirstId
    eventApplicationSecondId
    chatId
    event {
      id
    }
    applicationFirst {
      id
      createdAt
      updatedAt
      accountId
      status
      preferences {
        id
        createdAt
        updatedAt
        priceRange
        likes
        dislikes
        comment
        applicationId
      }
    }
    applicationSecond {
      id
      createdAt
      updatedAt
      accountId
      status
      preferences {
        id
        createdAt
        updatedAt
        priceRange
        likes
        dislikes
        comment
        applicationId
      }
    }
  }
}
    `;

/**
 * __useGetEventApplicationPairByEventAndAccountQuery__
 *
 * To run a query within a React component, call `useGetEventApplicationPairByEventAndAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventApplicationPairByEventAndAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventApplicationPairByEventAndAccountQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventApplicationPairByEventAndAccountQuery(baseOptions: Apollo.QueryHookOptions<GetEventApplicationPairByEventAndAccountQuery, GetEventApplicationPairByEventAndAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventApplicationPairByEventAndAccountQuery, GetEventApplicationPairByEventAndAccountQueryVariables>(GetEventApplicationPairByEventAndAccountDocument, options);
      }
export function useGetEventApplicationPairByEventAndAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventApplicationPairByEventAndAccountQuery, GetEventApplicationPairByEventAndAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventApplicationPairByEventAndAccountQuery, GetEventApplicationPairByEventAndAccountQueryVariables>(GetEventApplicationPairByEventAndAccountDocument, options);
        }
export type GetEventApplicationPairByEventAndAccountQueryHookResult = ReturnType<typeof useGetEventApplicationPairByEventAndAccountQuery>;
export type GetEventApplicationPairByEventAndAccountLazyQueryHookResult = ReturnType<typeof useGetEventApplicationPairByEventAndAccountLazyQuery>;
export type GetEventApplicationPairByEventAndAccountQueryResult = Apollo.QueryResult<GetEventApplicationPairByEventAndAccountQuery, GetEventApplicationPairByEventAndAccountQueryVariables>;
export const EventDocument = gql`
    query event($id: Int!) {
  event(id: $id) {
    id
    createdAt
    pictureUrl
    name
    description
    status
    startsAt
    endsAt
    group {
      id
    }
    applicationPairs {
      id
    }
  }
}
    `;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const EventsDocument = gql`
    query events($groupId: Int!) {
  events(groupId: $groupId) {
    id
    createdAt
    pictureUrl
    name
    description
    status
    startsAt
    endsAt
    group {
      id
    }
    applicationPairs {
      id
    }
  }
}
    `;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useEventsQuery(baseOptions: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const GetAccountCountDocument = gql`
    query getAccountCount {
  getAccountCount
}
    `;

/**
 * __useGetAccountCountQuery__
 *
 * To run a query within a React component, call `useGetAccountCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountCountQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountCountQuery, GetAccountCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountCountQuery, GetAccountCountQueryVariables>(GetAccountCountDocument, options);
      }
export function useGetAccountCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountCountQuery, GetAccountCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountCountQuery, GetAccountCountQueryVariables>(GetAccountCountDocument, options);
        }
export type GetAccountCountQueryHookResult = ReturnType<typeof useGetAccountCountQuery>;
export type GetAccountCountLazyQueryHookResult = ReturnType<typeof useGetAccountCountLazyQuery>;
export type GetAccountCountQueryResult = Apollo.QueryResult<GetAccountCountQuery, GetAccountCountQueryVariables>;
export const GetGroupByEventIdDocument = gql`
    query getGroupByEventId($eventId: Int!) {
  getGroupByEventId(eventId: $eventId) {
    id
    createdAt
    updatedAt
    pictureUrl
    name
    description
    type
    status
    members {
      id
      createdAt
      updatedAt
      groupId
      accountId
      role
    }
    events {
      id
      createdAt
      updatedAt
      pictureUrl
      status
      groupId
      name
      description
      startsAt
      endsAt
    }
    groupInvites {
      id
      createdAt
      updatedAt
      groupId
      code
    }
  }
}
    `;

/**
 * __useGetGroupByEventIdQuery__
 *
 * To run a query within a React component, call `useGetGroupByEventIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByEventIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByEventIdQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetGroupByEventIdQuery(baseOptions: Apollo.QueryHookOptions<GetGroupByEventIdQuery, GetGroupByEventIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByEventIdQuery, GetGroupByEventIdQueryVariables>(GetGroupByEventIdDocument, options);
      }
export function useGetGroupByEventIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByEventIdQuery, GetGroupByEventIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByEventIdQuery, GetGroupByEventIdQueryVariables>(GetGroupByEventIdDocument, options);
        }
export type GetGroupByEventIdQueryHookResult = ReturnType<typeof useGetGroupByEventIdQuery>;
export type GetGroupByEventIdLazyQueryHookResult = ReturnType<typeof useGetGroupByEventIdLazyQuery>;
export type GetGroupByEventIdQueryResult = Apollo.QueryResult<GetGroupByEventIdQuery, GetGroupByEventIdQueryVariables>;
export const GroupDocument = gql`
    query Group($id: Int!) {
  group(id: $id) {
    id
    createdAt
    updatedAt
    pictureUrl
    name
    description
    type
    status
    members {
      id
      createdAt
      updatedAt
      groupId
      accountId
      role
    }
    events {
      id
      createdAt
      updatedAt
      pictureUrl
      status
      groupId
      name
      description
      startsAt
      endsAt
    }
    groupInvites {
      id
      createdAt
      updatedAt
      groupId
      code
    }
  }
}
    `;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupQuery(baseOptions: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
      }
export function useGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<GroupQuery, GroupQueryVariables>;
export const IsGroupNameAvailvableDocument = gql`
    query IsGroupNameAvailvable($name: String!) {
  isGroupNameAvailable(name: $name)
}
    `;

/**
 * __useIsGroupNameAvailvableQuery__
 *
 * To run a query within a React component, call `useIsGroupNameAvailvableQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsGroupNameAvailvableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsGroupNameAvailvableQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useIsGroupNameAvailvableQuery(baseOptions: Apollo.QueryHookOptions<IsGroupNameAvailvableQuery, IsGroupNameAvailvableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsGroupNameAvailvableQuery, IsGroupNameAvailvableQueryVariables>(IsGroupNameAvailvableDocument, options);
      }
export function useIsGroupNameAvailvableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsGroupNameAvailvableQuery, IsGroupNameAvailvableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsGroupNameAvailvableQuery, IsGroupNameAvailvableQueryVariables>(IsGroupNameAvailvableDocument, options);
        }
export type IsGroupNameAvailvableQueryHookResult = ReturnType<typeof useIsGroupNameAvailvableQuery>;
export type IsGroupNameAvailvableLazyQueryHookResult = ReturnType<typeof useIsGroupNameAvailvableLazyQuery>;
export type IsGroupNameAvailvableQueryResult = Apollo.QueryResult<IsGroupNameAvailvableQuery, IsGroupNameAvailvableQueryVariables>;
export const GenerateUrlGoogleDocument = gql`
    query generateUrlGoogle($state: String!) {
  generateUrlGoogle(state: $state)
}
    `;

/**
 * __useGenerateUrlGoogleQuery__
 *
 * To run a query within a React component, call `useGenerateUrlGoogleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateUrlGoogleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateUrlGoogleQuery({
 *   variables: {
 *      state: // value for 'state'
 *   },
 * });
 */
export function useGenerateUrlGoogleQuery(baseOptions: Apollo.QueryHookOptions<GenerateUrlGoogleQuery, GenerateUrlGoogleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateUrlGoogleQuery, GenerateUrlGoogleQueryVariables>(GenerateUrlGoogleDocument, options);
      }
export function useGenerateUrlGoogleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateUrlGoogleQuery, GenerateUrlGoogleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateUrlGoogleQuery, GenerateUrlGoogleQueryVariables>(GenerateUrlGoogleDocument, options);
        }
export type GenerateUrlGoogleQueryHookResult = ReturnType<typeof useGenerateUrlGoogleQuery>;
export type GenerateUrlGoogleLazyQueryHookResult = ReturnType<typeof useGenerateUrlGoogleLazyQuery>;
export type GenerateUrlGoogleQueryResult = Apollo.QueryResult<GenerateUrlGoogleQuery, GenerateUrlGoogleQueryVariables>;
export const LoginWithGoogleDocument = gql`
    mutation loginWithGoogle($code: String!) {
  loginWithGoogle(code: $code) {
    token
    account {
      id
      email
      roles
      status
      username
      avatarUrl
    }
  }
}
    `;
export type LoginWithGoogleMutationFn = Apollo.MutationFunction<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>;

/**
 * __useLoginWithGoogleMutation__
 *
 * To run a mutation, you first call `useLoginWithGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithGoogleMutation, { data, loading, error }] = useLoginWithGoogleMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useLoginWithGoogleMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>(LoginWithGoogleDocument, options);
      }
export type LoginWithGoogleMutationHookResult = ReturnType<typeof useLoginWithGoogleMutation>;
export type LoginWithGoogleMutationResult = Apollo.MutationResult<LoginWithGoogleMutation>;
export type LoginWithGoogleMutationOptions = Apollo.BaseMutationOptions<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>;
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
      avatarUrl
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
export const NotificationsDocument = gql`
    query notifications($offset: Int!, $limit: Int!) {
  notifications(offset: $offset, limit: $limit) {
    id
    createdAt
    updatedAt
    accountId
    accountId
    title
    message
    read
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const PrivateGroupsDocument = gql`
    query PrivateGroups($offset: Int!, $limit: Int!) {
  privateGroups(offset: $offset, limit: $limit) {
    id
    createdAt
    pictureUrl
    name
    description
    type
    status
    events {
      status
    }
    members {
      id
      role
      accountId
    }
  }
}
    `;

/**
 * __usePrivateGroupsQuery__
 *
 * To run a query within a React component, call `usePrivateGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrivateGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrivateGroupsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePrivateGroupsQuery(baseOptions: Apollo.QueryHookOptions<PrivateGroupsQuery, PrivateGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrivateGroupsQuery, PrivateGroupsQueryVariables>(PrivateGroupsDocument, options);
      }
export function usePrivateGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrivateGroupsQuery, PrivateGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrivateGroupsQuery, PrivateGroupsQueryVariables>(PrivateGroupsDocument, options);
        }
export type PrivateGroupsQueryHookResult = ReturnType<typeof usePrivateGroupsQuery>;
export type PrivateGroupsLazyQueryHookResult = ReturnType<typeof usePrivateGroupsLazyQuery>;
export type PrivateGroupsQueryResult = Apollo.QueryResult<PrivateGroupsQuery, PrivateGroupsQueryVariables>;
export const PublicGroupsDocument = gql`
    query PublicGroups($offset: Int!, $limit: Int!) {
  publicGroups(offset: $offset, limit: $limit) {
    id
    createdAt
    pictureUrl
    name
    description
    type
    status
    events {
      status
    }
    members {
      id
      role
      accountId
    }
  }
}
    `;

/**
 * __usePublicGroupsQuery__
 *
 * To run a query within a React component, call `usePublicGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicGroupsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePublicGroupsQuery(baseOptions: Apollo.QueryHookOptions<PublicGroupsQuery, PublicGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicGroupsQuery, PublicGroupsQueryVariables>(PublicGroupsDocument, options);
      }
export function usePublicGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicGroupsQuery, PublicGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicGroupsQuery, PublicGroupsQueryVariables>(PublicGroupsDocument, options);
        }
export type PublicGroupsQueryHookResult = ReturnType<typeof usePublicGroupsQuery>;
export type PublicGroupsLazyQueryHookResult = ReturnType<typeof usePublicGroupsLazyQuery>;
export type PublicGroupsQueryResult = Apollo.QueryResult<PublicGroupsQuery, PublicGroupsQueryVariables>;
export const SetEventApplicationStatusDocument = gql`
    mutation setEventApplicationStatus($eventApplicationId: Int!, $status: EventApplicationStatus!) {
  setEventApplicationStatus(
    eventApplicationId: $eventApplicationId
    status: $status
  ) {
    id
    status
  }
}
    `;
export type SetEventApplicationStatusMutationFn = Apollo.MutationFunction<SetEventApplicationStatusMutation, SetEventApplicationStatusMutationVariables>;

/**
 * __useSetEventApplicationStatusMutation__
 *
 * To run a mutation, you first call `useSetEventApplicationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetEventApplicationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setEventApplicationStatusMutation, { data, loading, error }] = useSetEventApplicationStatusMutation({
 *   variables: {
 *      eventApplicationId: // value for 'eventApplicationId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSetEventApplicationStatusMutation(baseOptions?: Apollo.MutationHookOptions<SetEventApplicationStatusMutation, SetEventApplicationStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetEventApplicationStatusMutation, SetEventApplicationStatusMutationVariables>(SetEventApplicationStatusDocument, options);
      }
export type SetEventApplicationStatusMutationHookResult = ReturnType<typeof useSetEventApplicationStatusMutation>;
export type SetEventApplicationStatusMutationResult = Apollo.MutationResult<SetEventApplicationStatusMutation>;
export type SetEventApplicationStatusMutationOptions = Apollo.BaseMutationOptions<SetEventApplicationStatusMutation, SetEventApplicationStatusMutationVariables>;
export const UpdateAccountDocument = gql`
    mutation updateAccount($username: String!) {
  updateAccount(username: $username) {
    id
    createdAt
    updatedAt
    email
    roles
    status
    avatarUrl
    username
  }
}
    `;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, options);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation UpdateGroup($id: Int!, $name: String!, $description: String!, $type: GroupType!) {
  updateGroup(
    id: $id
    input: {name: $name, description: $description, type: $type}
  ) {
    id
    createdAt
    pictureUrl
    name
    description
    type
    status
    events {
      status
    }
    members {
      id
      role
    }
  }
}
    `;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const WhoamiDocument = gql`
    query whoami {
  whoami {
    id
    createdAt
    email
    isNotificationsEnabled
    roles
    status
    avatarUrl
    username
    externalProfiles {
      provider
      externalId
    }
  }
}
    `;

/**
 * __useWhoamiQuery__
 *
 * To run a query within a React component, call `useWhoamiQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoamiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoamiQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoamiQuery(baseOptions?: Apollo.QueryHookOptions<WhoamiQuery, WhoamiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoamiQuery, WhoamiQueryVariables>(WhoamiDocument, options);
      }
export function useWhoamiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoamiQuery, WhoamiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoamiQuery, WhoamiQueryVariables>(WhoamiDocument, options);
        }
export type WhoamiQueryHookResult = ReturnType<typeof useWhoamiQuery>;
export type WhoamiLazyQueryHookResult = ReturnType<typeof useWhoamiLazyQuery>;
export type WhoamiQueryResult = Apollo.QueryResult<WhoamiQuery, WhoamiQueryVariables>;