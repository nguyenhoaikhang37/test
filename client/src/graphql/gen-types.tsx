import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  JSON: any
  Timestamp: any
}

export type Board = {
  __typename?: 'Board'
  _id: Scalars['String']
  columnsId: Array<Scalars['String']>
  createdAt: Scalars['Timestamp']
  createdById: Scalars['String']
  description?: Maybe<Scalars['String']>
  groupPermission?: Maybe<Array<GroupPermission>>
  isAvailable: Scalars['Boolean']
  isPublicTemplate?: Maybe<Scalars['Boolean']>
  isTemplate?: Maybe<Scalars['Boolean']>
  modifiedById?: Maybe<Scalars['String']>
  owners: Array<User>
  ownersId: Array<Scalars['String']>
  properties: Array<FieldProperty>
  teamId?: Maybe<Scalars['String']>
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['Timestamp']>
}

export enum BoardAction {
  CreateCard = 'CreateCard',
  CreateComment = 'CreateComment',
  DeleteCard = 'DeleteCard',
  DeleteComment = 'DeleteComment',
  EditBoard = 'EditBoard',
  EditCard = 'EditCard',
  EditComment = 'EditComment',
  EditGroup = 'EditGroup',
  EditProperty = 'EditProperty'
}

export type BoardDataBlockUnion = Board | Card | Checklist | Column | Comment

export type BoardInput = {
  teamId?: InputMaybe<Scalars['String']>
  title: Scalars['String']
}

export type Card = {
  __typename?: 'Card'
  _id: Scalars['String']
  ancestorPath: Scalars['String']
  checklists: Array<Checklist>
  comments: Array<Comment>
  createdAt: Scalars['Timestamp']
  createdById: Scalars['String']
  description?: Maybe<Scalars['String']>
  fieldsData?: Maybe<Scalars['JSON']>
  isAvailable: Scalars['Boolean']
  modifiedById?: Maybe<Scalars['String']>
  parentId: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['Timestamp']>
}

export type Checklist = {
  __typename?: 'Checklist'
  _id: Scalars['String']
  ancestorPath: Scalars['String']
  boardId: Scalars['String']
  createdAt: Scalars['Timestamp']
  createdById: Scalars['String']
  isAvailable: Scalars['Boolean']
  isCheck: Scalars['Boolean']
  items: Array<ChecklistItem>
  modifiedById?: Maybe<Scalars['String']>
  parentId: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['Timestamp']>
}

export type ChecklistInput = {
  title: Scalars['String']
}

export type ChecklistItem = {
  __typename?: 'ChecklistItem'
  _id: Scalars['String']
  isCheck: Scalars['Boolean']
  title: Scalars['String']
}

export type ChecklistItemInput = {
  isCheck?: InputMaybe<Scalars['Boolean']>
  title: Scalars['String']
}

export type Column = {
  __typename?: 'Column'
  _id: Scalars['String']
  ancestorPath: Scalars['String']
  cards: Array<Card>
  cardsId: Array<Scalars['String']>
  createdAt: Scalars['Timestamp']
  createdById: Scalars['String']
  isAvailable: Scalars['Boolean']
  modifiedById?: Maybe<Scalars['String']>
  parentId: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['Timestamp']>
}

export type Comment = {
  __typename?: 'Comment'
  _id: Scalars['String']
  ancestorPath: Scalars['String']
  commentTo: CommentTo
  comments: Array<Comment>
  content: Scalars['String']
  createdAt: Scalars['Timestamp']
  createdBy: User
  createdById: Scalars['String']
  isAvailable: Scalars['Boolean']
  modifiedById?: Maybe<Scalars['String']>
  parentId: Scalars['String']
  updatedAt?: Maybe<Scalars['Timestamp']>
}

export type CommentInput = {
  commentTo?: InputMaybe<CommentTo>
  content: Scalars['String']
}

export enum CommentTo {
  Card = 'Card',
  Comment = 'Comment'
}

export type CreateCardInput = {
  title: Scalars['String']
}

export type CreateColumnInput = {
  title: Scalars['String']
}

export type CreateMessageReferenceInput = {
  description?: InputMaybe<Scalars['String']>
  members?: InputMaybe<Array<CreateMessageReferenceMemberInput>>
  messageReferenceType: MessageReferenceType
  teamId?: InputMaybe<Scalars['String']>
  title: Scalars['String']
}

export type CreateMessageReferenceMemberInput = {
  role?: InputMaybe<MessageReferenceMemberRole>
  userId: Scalars['String']
}

export type CreateTeamInput = {
  description?: InputMaybe<Scalars['String']>
  title: Scalars['String']
}

export type CreateTeamMemberInput = {
  role?: InputMaybe<TeamMemberRole>
  userId: Scalars['String']
}

export type CreateUserInput = {
  avatar: Scalars['String']
  email: Scalars['String']
  nickname: Scalars['String']
  password: Scalars['String']
  userName: Scalars['String']
}

export type FieldInput = {
  fieldOption?: InputMaybe<Array<FieldOptionInput>>
  fieldType: FieldType
  title: Scalars['String']
}

export type FieldOptionInput = {
  _id?: InputMaybe<Scalars['String']>
  color?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type FieldProperty = {
  __typename?: 'FieldProperty'
  _id: Scalars['String']
  fieldOption?: Maybe<Array<Option>>
  fieldType: FieldType
  title: Scalars['String']
}

export enum FieldType {
  Date = 'Date',
  Link = 'Link',
  MultiPeople = 'MultiPeople',
  MultiSelect = 'MultiSelect',
  Number = 'Number',
  Select = 'Select',
  String = 'String'
}

export type GroupInput = {
  boardActions: Array<BoardAction>
  title: Scalars['String']
  usersId: Array<Scalars['String']>
}

export type GroupPermission = {
  __typename?: 'GroupPermission'
  _id: Scalars['String']
  boardActions: Array<BoardAction>
  title: Scalars['String']
  users: Array<User>
  usersId: Array<Scalars['String']>
}

export type LoggedUserOutput = {
  __typename?: 'LoggedUserOutput'
  _id: Scalars['String']
  access_token: Scalars['String']
  avatar: Scalars['String']
  email: Scalars['String']
  nickname: Scalars['String']
  userName: Scalars['String']
}

export type LoginUserInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Message = {
  __typename?: 'Message'
  _id: Scalars['String']
  ancestorPath: Scalars['String']
  attachments?: Maybe<Array<Scalars['String']>>
  content: Scalars['String']
  createdAt: Scalars['Timestamp']
  createdBy: User
  createdById: Scalars['String']
  isAvailable: Scalars['Boolean']
  messageReferenceId: Scalars['String']
  messages: Array<Message>
  modifiedById?: Maybe<Scalars['String']>
  replyToMessageId?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['Timestamp']>
}

export type MessageInput = {
  attachments?: InputMaybe<Array<Scalars['String']>>
  content: Scalars['String']
}

export type MessageReference = {
  __typename?: 'MessageReference'
  _id: Scalars['String']
  createdAt: Scalars['Timestamp']
  createdById: Scalars['String']
  description?: Maybe<Scalars['String']>
  isAvailable: Scalars['Boolean']
  isPublic?: Maybe<Scalars['Boolean']>
  members: Array<MessageReferenceMember>
  messageReferenceType: MessageReferenceType
  modifiedById?: Maybe<Scalars['String']>
  pinId?: Maybe<Scalars['String']>
  teamId?: Maybe<Scalars['String']>
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['Timestamp']>
}

export type MessageReferenceMember = {
  __typename?: 'MessageReferenceMember'
  _id: Scalars['String']
  role: MessageReferenceMemberRole
  userId: Scalars['String']
}

export enum MessageReferenceMemberRole {
  Admin = 'Admin',
  Member = 'Member'
}

export enum MessageReferenceType {
  Channel = 'Channel',
  Group = 'Group',
  Personal = 'Personal'
}

export type Mutation = {
  __typename?: 'Mutation'
  addBoardField: Scalars['Boolean']
  addBoardGroup: Scalars['Boolean']
  addMessageReferenceMembers: MessageReference
  addTeamMembers: Team
  createBoard: Board
  createCard: Scalars['Boolean']
  createChecklist: Scalars['Boolean']
  createChecklistItem: Scalars['Boolean']
  createColumn: Scalars['Boolean']
  createComment: Scalars['Boolean']
  createMessage: Scalars['Boolean']
  createMessageReference: MessageReference
  createTeam: Team
  createUser: User
  deleteBoardField: Scalars['Boolean']
  deleteBoardGroup: Scalars['Boolean']
  deleteChecklist: Scalars['Boolean']
  deleteChecklistItems: Scalars['Boolean']
  deleteComment: Scalars['Boolean']
  deleteMessage: Scalars['Boolean']
  deleteMessageReference: MessageReference
  deleteMessageReferenceMembers: MessageReference
  deleteTeam: Team
  deleteTeamMembers: Team
  editBoardField: Scalars['Boolean']
  editBoardGroup: Scalars['Boolean']
  loginUser: LoggedUserOutput
  updateBoard: Scalars['Boolean']
  updateCard: Card
  updateCardPosition: Scalars['Boolean']
  updateChecklist: Scalars['Boolean']
  updateChecklistItems: Scalars['Boolean']
  updateColumn: Scalars['Boolean']
  updateColumnPosition: Scalars['Boolean']
  updateComment: Scalars['Boolean']
  updateMessage: Scalars['Boolean']
  updateMessageReference: MessageReference
  updateMessageReferenceMembers: MessageReference
  updateTeam: Team
  updateTeamMembers: Team
  updateUser: User
}

export type MutationAddBoardFieldArgs = {
  boardId: Scalars['String']
  fieldInput: FieldInput
}

export type MutationAddBoardGroupArgs = {
  boardId: Scalars['String']
  groupInput: GroupInput
}

export type MutationAddMessageReferenceMembersArgs = {
  members: Array<CreateMessageReferenceMemberInput>
  messageReferenceId: Scalars['String']
}

export type MutationAddTeamMembersArgs = {
  members: Array<CreateTeamMemberInput>
  teamId: Scalars['String']
}

export type MutationCreateBoardArgs = {
  boardInput: BoardInput
}

export type MutationCreateCardArgs = {
  cardInput: CreateCardInput
  columnId: Scalars['String']
}

export type MutationCreateChecklistArgs = {
  boardId: Scalars['String']
  cardId: Scalars['String']
  input: ChecklistInput
}

export type MutationCreateChecklistItemArgs = {
  checklistId: Scalars['String']
  item: ChecklistItemInput
}

export type MutationCreateColumnArgs = {
  boardId: Scalars['String']
  columnInput: CreateColumnInput
}

export type MutationCreateCommentArgs = {
  input: CommentInput
  parentId: Scalars['String']
}

export type MutationCreateMessageArgs = {
  input: MessageInput
  parentId: Scalars['String']
}

export type MutationCreateMessageReferenceArgs = {
  messageReferenceInput: CreateMessageReferenceInput
}

export type MutationCreateTeamArgs = {
  teamInput: CreateTeamInput
}

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput
}

export type MutationDeleteBoardFieldArgs = {
  boardId: Scalars['String']
  fieldId: Scalars['String']
}

export type MutationDeleteBoardGroupArgs = {
  boardId: Scalars['String']
  groupId: Scalars['String']
}

export type MutationDeleteChecklistArgs = {
  checklistId: Scalars['String']
}

export type MutationDeleteChecklistItemsArgs = {
  checklistId: Scalars['String']
  itemsId: Array<Scalars['String']>
}

export type MutationDeleteCommentArgs = {
  commentId: Scalars['String']
}

export type MutationDeleteMessageArgs = {
  messageId: Scalars['String']
}

export type MutationDeleteMessageReferenceArgs = {
  messageReferenceId: Scalars['String']
}

export type MutationDeleteMessageReferenceMembersArgs = {
  membersId: Array<Scalars['String']>
  messageReferenceId: Scalars['String']
}

export type MutationDeleteTeamArgs = {
  teamId: Scalars['String']
}

export type MutationDeleteTeamMembersArgs = {
  membersId: Array<Scalars['String']>
  teamId: Scalars['String']
}

export type MutationEditBoardFieldArgs = {
  boardId: Scalars['String']
  fieldInput: UpdateFieldInput
}

export type MutationEditBoardGroupArgs = {
  boardId: Scalars['String']
  groupInput: UpdateGroupInput
}

export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput
}

export type MutationUpdateBoardArgs = {
  boardId: Scalars['String']
  boardInput: UpdateBoardInput
}

export type MutationUpdateCardArgs = {
  cardId: Scalars['String']
  cardInput: UpdateCardInput
}

export type MutationUpdateCardPositionArgs = {
  cardId: Scalars['String']
  fromColumnId: Scalars['String']
  toColumnId: Scalars['String']
  toPosition: Scalars['Float']
}

export type MutationUpdateChecklistArgs = {
  checklistId: Scalars['String']
  input: UpdateChecklistInput
}

export type MutationUpdateChecklistItemsArgs = {
  checklistId: Scalars['String']
  items: Array<UpdateChecklistItemInput>
}

export type MutationUpdateColumnArgs = {
  columnId: Scalars['String']
  columnInput: UpdateColumnInput
}

export type MutationUpdateColumnPositionArgs = {
  boardId: Scalars['String']
  columnId: Scalars['String']
  toPosition: Scalars['Float']
}

export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput
}

export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput
}

export type MutationUpdateMessageReferenceArgs = {
  messageReferenceId: Scalars['String']
  messageReferenceInput: UpdateMessageReferenceInput
}

export type MutationUpdateMessageReferenceMembersArgs = {
  members: Array<UpdateMessageReferenceMemberInput>
  messageReferenceId: Scalars['String']
}

export type MutationUpdateTeamArgs = {
  teamId: Scalars['String']
  teamInput: UpdateTeamInput
}

export type MutationUpdateTeamMembersArgs = {
  members: Array<UpdateTeamMemberInput>
  teamId: Scalars['String']
}

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput
}

export type Option = {
  __typename?: 'Option'
  _id: Scalars['String']
  color: Scalars['String']
  title: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  boards: Array<Board>
  flatBoard: Array<BoardDataBlockUnion>
  getMyProfileInfo: User
  getUserData: Array<WorkspaceInfoBlockUnion>
  teams: Array<Team>
  user: User
}

export type QueryFlatBoardArgs = {
  boardId: Scalars['String']
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  boardDatablocksUpdated: Array<BoardDataBlockUnion>
  workspaceInfoBlocksUpdated: Array<WorkspaceInfoBlockUnion>
}

export type SubscriptionBoardDatablocksUpdatedArgs = {
  rootId: Scalars['String']
}

export type Team = {
  __typename?: 'Team'
  _id: Scalars['String']
  avatar?: Maybe<Scalars['String']>
  createdAt: Scalars['Timestamp']
  createdById: Scalars['String']
  description?: Maybe<Scalars['String']>
  isAvailable: Scalars['Boolean']
  members?: Maybe<Array<TeamMember>>
  modifiedById?: Maybe<Scalars['String']>
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['Timestamp']>
}

export type TeamMember = {
  __typename?: 'TeamMember'
  _id: Scalars['String']
  role: TeamMemberRole
  userId: Scalars['String']
}

export enum TeamMemberRole {
  Admin = 'Admin',
  Member = 'Member'
}

export type UpdateBoardInput = {
  avatar?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateCardInput = {
  description?: InputMaybe<Scalars['String']>
  fieldsData?: InputMaybe<Scalars['JSON']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateChecklistInput = {
  title?: InputMaybe<Scalars['String']>
}

export type UpdateChecklistItemInput = {
  _id: Scalars['String']
  isCheck?: InputMaybe<Scalars['Boolean']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateColumnInput = {
  title?: InputMaybe<Scalars['String']>
}

export type UpdateCommentInput = {
  content?: InputMaybe<Scalars['String']>
}

export type UpdateFieldInput = {
  _id: Scalars['String']
  fieldOption?: InputMaybe<Array<FieldOptionInput>>
  fieldType?: InputMaybe<FieldType>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateGroupInput = {
  _id: Scalars['String']
  boardActions?: InputMaybe<Array<BoardAction>>
  title?: InputMaybe<Scalars['String']>
  usersId?: InputMaybe<Array<Scalars['String']>>
}

export type UpdateMessageInput = {
  attachments?: InputMaybe<Array<Scalars['String']>>
  content?: InputMaybe<Scalars['String']>
}

export type UpdateMessageReferenceInput = {
  description?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateMessageReferenceMemberInput = {
  _id: Scalars['String']
  role: MessageReferenceMemberRole
}

export type UpdateTeamInput = {
  description?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateTeamMemberInput = {
  _id: Scalars['String']
  role: TeamMemberRole
}

export type UpdateUserInput = {
  _id: Scalars['String']
  avatar?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  nickname?: InputMaybe<Scalars['String']>
  userName?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  _id: Scalars['String']
  avatar: Scalars['String']
  email: Scalars['String']
  nickname: Scalars['String']
  userName: Scalars['String']
}

export type WorkspaceInfoBlockUnion = Board | MessageReference | Team

export type CreateBoardMutationVariables = Exact<{
  boardInput: BoardInput
}>

export type CreateBoardMutation = {
  __typename?: 'Mutation'
  createBoard: { __typename?: 'Board'; _id: string; title: string }
}

export type UpdateBoardMutationVariables = Exact<{
  boardId: Scalars['String']
  boardInput: UpdateBoardInput
}>

export type UpdateBoardMutation = {
  __typename?: 'Mutation'
  updateBoard: boolean
}

export type AddBoardGroupMutationVariables = Exact<{
  boardId: Scalars['String']
  groupInput: GroupInput
}>

export type AddBoardGroupMutation = {
  __typename?: 'Mutation'
  addBoardGroup: boolean
}

export type DeleteBoardGroupMutationVariables = Exact<{
  boardId: Scalars['String']
  groupId: Scalars['String']
}>

export type DeleteBoardGroupMutation = {
  __typename?: 'Mutation'
  deleteBoardGroup: boolean
}

export type EditBoardGroupMutationVariables = Exact<{
  boardId: Scalars['String']
  groupInput: UpdateGroupInput
}>

export type EditBoardGroupMutation = {
  __typename?: 'Mutation'
  editBoardGroup: boolean
}

export type AddBoardFieldMutationVariables = Exact<{
  boardId: Scalars['String']
  fieldInput: FieldInput
}>

export type AddBoardFieldMutation = {
  __typename?: 'Mutation'
  addBoardField: boolean
}

export type DeleteBoardFieldMutationVariables = Exact<{
  boardId: Scalars['String']
  fieldId: Scalars['String']
}>

export type DeleteBoardFieldMutation = {
  __typename?: 'Mutation'
  deleteBoardField: boolean
}

export type EditBoardFieldMutationVariables = Exact<{
  boardId: Scalars['String']
  fieldInput: UpdateFieldInput
}>

export type EditBoardFieldMutation = {
  __typename?: 'Mutation'
  editBoardField: boolean
}

export type CreateCardMutationVariables = Exact<{
  cardInput: CreateCardInput
  columnId: Scalars['String']
}>

export type CreateCardMutation = {
  __typename?: 'Mutation'
  createCard: boolean
}

export type UpdateCardMutationVariables = Exact<{
  cardId: Scalars['String']
  cardInput: UpdateCardInput
}>

export type UpdateCardMutation = {
  __typename?: 'Mutation'
  updateCard: { __typename?: 'Card'; _id: string; title: string }
}

export type UpdateCardPositionMutationVariables = Exact<{
  cardId: Scalars['String']
  fromColumnId: Scalars['String']
  toColumnId: Scalars['String']
  toPosition: Scalars['Float']
}>

export type UpdateCardPositionMutation = {
  __typename?: 'Mutation'
  updateCardPosition: boolean
}

export type CreateChecklistMutationVariables = Exact<{
  boardId: Scalars['String']
  cardId: Scalars['String']
  input: ChecklistInput
}>

export type CreateChecklistMutation = {
  __typename?: 'Mutation'
  createChecklist: boolean
}

export type UpdateChecklistMutationVariables = Exact<{
  checklistId: Scalars['String']
  input: UpdateChecklistInput
}>

export type UpdateChecklistMutation = {
  __typename?: 'Mutation'
  updateChecklist: boolean
}

export type CreateChecklistItemMutationVariables = Exact<{
  checklistId: Scalars['String']
  item: ChecklistItemInput
}>

export type CreateChecklistItemMutation = {
  __typename?: 'Mutation'
  createChecklistItem: boolean
}

export type UpdateChecklistItemsMutationVariables = Exact<{
  checklistId: Scalars['String']
  items: Array<UpdateChecklistItemInput> | UpdateChecklistItemInput
}>

export type UpdateChecklistItemsMutation = {
  __typename?: 'Mutation'
  updateChecklistItems: boolean
}

export type CreateColumnMutationVariables = Exact<{
  boardId: Scalars['String']
  columnInput: CreateColumnInput
}>

export type CreateColumnMutation = {
  __typename?: 'Mutation'
  createColumn: boolean
}

export type UpdateColumnMutationVariables = Exact<{
  columnId: Scalars['String']
  columnInput: UpdateColumnInput
}>

export type UpdateColumnMutation = {
  __typename?: 'Mutation'
  updateColumn: boolean
}

export type UpdateColumnPositionMutationVariables = Exact<{
  boardId: Scalars['String']
  columnId: Scalars['String']
  toPosition: Scalars['Float']
}>

export type UpdateColumnPositionMutation = {
  __typename?: 'Mutation'
  updateColumnPosition: boolean
}

export type CreateCommentMutationVariables = Exact<{
  input: CommentInput
  parentId: Scalars['String']
}>

export type CreateCommentMutation = {
  __typename?: 'Mutation'
  createComment: boolean
}

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput
}>

export type UpdateCommentMutation = {
  __typename?: 'Mutation'
  updateComment: boolean
}

export type CreateMessageMutationVariables = Exact<{
  input: MessageInput
  parentId: Scalars['String']
}>

export type CreateMessageMutation = {
  __typename?: 'Mutation'
  createMessage: boolean
}

export type UpdateMessageMutationVariables = Exact<{
  input: UpdateMessageInput
}>

export type UpdateMessageMutation = {
  __typename?: 'Mutation'
  updateMessage: boolean
}

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['String']
}>

export type DeleteMessageMutation = {
  __typename?: 'Mutation'
  deleteMessage: boolean
}

export type CreateMessageReferenceMutationVariables = Exact<{
  messageReferenceInput: CreateMessageReferenceInput
}>

export type CreateMessageReferenceMutation = {
  __typename?: 'Mutation'
  createMessageReference: {
    __typename?: 'MessageReference'
    _id: string
    title: string
  }
}

export type UpdateMessageReferenceMutationVariables = Exact<{
  messageReferenceId: Scalars['String']
  messageReferenceInput: UpdateMessageReferenceInput
}>

export type UpdateMessageReferenceMutation = {
  __typename?: 'Mutation'
  updateMessageReference: {
    __typename?: 'MessageReference'
    _id: string
    title: string
  }
}

export type AddMessageReferenceMembersMutationVariables = Exact<{
  members:
    | Array<CreateMessageReferenceMemberInput>
    | CreateMessageReferenceMemberInput
  messageReferenceId: Scalars['String']
}>

export type AddMessageReferenceMembersMutation = {
  __typename?: 'Mutation'
  addMessageReferenceMembers: {
    __typename?: 'MessageReference'
    _id: string
    title: string
  }
}

export type DeleteMessageReferenceMembersMutationVariables = Exact<{
  membersId: Array<Scalars['String']> | Scalars['String']
  messageReferenceId: Scalars['String']
}>

export type DeleteMessageReferenceMembersMutation = {
  __typename?: 'Mutation'
  deleteMessageReferenceMembers: {
    __typename?: 'MessageReference'
    _id: string
    title: string
  }
}

export type CreateTeamMutationVariables = Exact<{
  teamInput: CreateTeamInput
}>

export type CreateTeamMutation = {
  __typename?: 'Mutation'
  createTeam: { __typename?: 'Team'; _id: string; title: string }
}

export type UpdateTeamMutationVariables = Exact<{
  teamId: Scalars['String']
  teamInput: UpdateTeamInput
}>

export type UpdateTeamMutation = {
  __typename?: 'Mutation'
  updateTeam: { __typename?: 'Team'; _id: string; title: string }
}

export type AddTeamMembersMutationVariables = Exact<{
  members: Array<CreateTeamMemberInput> | CreateTeamMemberInput
  teamId: Scalars['String']
}>

export type AddTeamMembersMutation = {
  __typename?: 'Mutation'
  addTeamMembers: { __typename?: 'Team'; _id: string; title: string }
}

export type DeleteTeamMembersMutationVariables = Exact<{
  membersId: Array<Scalars['String']> | Scalars['String']
  teamId: Scalars['String']
}>

export type DeleteTeamMembersMutation = {
  __typename?: 'Mutation'
  deleteTeamMembers: { __typename?: 'Team'; _id: string; title: string }
}

export type UpdateTeamMembersMutationVariables = Exact<{
  members: Array<UpdateTeamMemberInput> | UpdateTeamMemberInput
  teamId: Scalars['String']
}>

export type UpdateTeamMembersMutation = {
  __typename?: 'Mutation'
  updateTeamMembers: { __typename?: 'Team'; _id: string; title: string }
}

export type DeleteTeamMutationVariables = Exact<{
  teamId: Scalars['String']
}>

export type DeleteTeamMutation = {
  __typename?: 'Mutation'
  deleteTeam: { __typename?: 'Team'; _id: string; title: string }
}

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: { __typename?: 'User'; _id: string; userName: string }
}

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: { __typename?: 'User'; _id: string; userName: string }
}

export type LoginUserMutationVariables = Exact<{
  loginUserInput: LoginUserInput
}>

export type LoginUserMutation = {
  __typename?: 'Mutation'
  loginUser: {
    __typename?: 'LoggedUserOutput'
    _id: string
    access_token: string
    userName: string
  }
}

export type GetBoardsQueryVariables = Exact<{ [key: string]: never }>

export type GetBoardsQuery = {
  __typename?: 'Query'
  boards: Array<{
    __typename?: 'Board'
    _id: string
    title: string
    createdAt: any
    updatedAt?: any | null
  }>
}

export type GetTeamsQueryVariables = Exact<{ [key: string]: never }>

export type GetTeamsQuery = {
  __typename?: 'Query'
  teams: Array<{
    __typename?: 'Team'
    _id: string
    createdAt: any
    createdById: string
    description?: string | null
    isAvailable: boolean
    modifiedById?: string | null
    title: string
    updatedAt?: any | null
    members?: Array<{
      __typename?: 'TeamMember'
      _id: string
      role: TeamMemberRole
      userId: string
    }> | null
  }>
}

export type GetFlatBoardQueryVariables = Exact<{
  boardId: Scalars['String']
}>

export type GetFlatBoardQuery = {
  __typename?: 'Query'
  flatBoard: Array<
    | {
        __typename: 'Board'
        _id: string
        title: string
        createdAt: any
        createdById: string
        description?: string | null
        columnsId: Array<string>
        isAvailable: boolean
        isPublicTemplate?: boolean | null
        isTemplate?: boolean | null
        modifiedById?: string | null
        ownersId: Array<string>
        teamId?: string | null
        updatedAt?: any | null
        groupPermission?: Array<{
          __typename?: 'GroupPermission'
          _id: string
          boardActions: Array<BoardAction>
          title: string
          usersId: Array<string>
          users: Array<{
            __typename?: 'User'
            _id: string
            avatar: string
            email: string
            nickname: string
            userName: string
          }>
        }> | null
        owners: Array<{
          __typename?: 'User'
          _id: string
          avatar: string
          email: string
          nickname: string
          userName: string
        }>
        properties: Array<{
          __typename?: 'FieldProperty'
          _id: string
          fieldType: FieldType
          title: string
          fieldOption?: Array<{
            __typename?: 'Option'
            _id: string
            color: string
            title: string
          }> | null
        }>
      }
    | {
        __typename: 'Card'
        _id: string
        title: string
        createdAt: any
        createdById: string
        ancestorPath: string
        description?: string | null
        fieldsData?: any | null
        isAvailable: boolean
        modifiedById?: string | null
        parentId: string
        updatedAt?: any | null
      }
    | {
        __typename: 'Checklist'
        _id: string
        ancestorPath: string
        createdAt: any
        createdById: string
        isAvailable: boolean
        modifiedById?: string | null
        parentId: string
        title: string
        updatedAt?: any | null
        items: Array<{
          __typename?: 'ChecklistItem'
          _id: string
          isCheck: boolean
          title: string
        }>
      }
    | {
        __typename: 'Column'
        _id: string
        ancestorPath: string
        cardsId: Array<string>
        createdAt: any
        createdById: string
        isAvailable: boolean
        modifiedById?: string | null
        parentId: string
        title: string
        updatedAt?: any | null
      }
    | {
        __typename: 'Comment'
        _id: string
        ancestorPath: string
        commentTo: CommentTo
        content: string
        createdAt: any
        createdById: string
        isAvailable: boolean
        modifiedById?: string | null
        parentId: string
        updatedAt?: any | null
        createdBy: {
          __typename?: 'User'
          _id: string
          avatar: string
          email: string
          nickname: string
          userName: string
        }
      }
  >
}

export type GetMyProfileInfoQueryVariables = Exact<{ [key: string]: never }>

export type GetMyProfileInfoQuery = {
  __typename?: 'Query'
  getMyProfileInfo: {
    __typename?: 'User'
    _id: string
    email: string
    nickname: string
    userName: string
  }
}

export type GetUserQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetUserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    _id: string
    email: string
    nickname: string
    userName: string
  }
}

export type GetUserDataQueryVariables = Exact<{ [key: string]: never }>

export type GetUserDataQuery = {
  __typename?: 'Query'
  getUserData: Array<
    | {
        __typename: 'Board'
        _id: string
        title: string
        createdAt: any
        updatedAt?: any | null
        columnsId: Array<string>
        createdById: string
        description?: string | null
        isAvailable: boolean
        isPublicTemplate?: boolean | null
        isTemplate?: boolean | null
        modifiedById?: string | null
        ownersId: Array<string>
        teamId?: string | null
        owners: Array<{ __typename?: 'User'; _id: string; nickname: string }>
      }
    | {
        __typename: 'MessageReference'
        _id: string
        title: string
        createdAt: any
        updatedAt?: any | null
        description?: string | null
        isAvailable: boolean
        isPublic?: boolean | null
        messageReferenceType: MessageReferenceType
        modifiedById?: string | null
        pinId?: string | null
        teamId?: string | null
        messageMembers: Array<{
          __typename?: 'MessageReferenceMember'
          _id: string
          role: MessageReferenceMemberRole
          userId: string
        }>
      }
    | {
        __typename: 'Team'
        _id: string
        title: string
        createdAt: any
        updatedAt?: any | null
        avatar?: string | null
        description?: string | null
        isAvailable: boolean
        modifiedById?: string | null
        teamMembers?: Array<{
          __typename?: 'TeamMember'
          _id: string
          role: TeamMemberRole
          userId: string
        }> | null
      }
  >
}

export type BlocksUpdatedSubscriptionVariables = Exact<{
  rootId: Scalars['String']
}>

export type BlocksUpdatedSubscription = {
  __typename?: 'Subscription'
  boardDatablocksUpdated: Array<
    | {
        __typename: 'Board'
        _id: string
        title: string
        createdAt: any
        createdById: string
        description?: string | null
        columnsId: Array<string>
        isAvailable: boolean
        isPublicTemplate?: boolean | null
        isTemplate?: boolean | null
        modifiedById?: string | null
        ownersId: Array<string>
        teamId?: string | null
        updatedAt?: any | null
        groupPermission?: Array<{
          __typename?: 'GroupPermission'
          _id: string
          boardActions: Array<BoardAction>
          title: string
          usersId: Array<string>
          users: Array<{
            __typename?: 'User'
            _id: string
            avatar: string
            email: string
            nickname: string
            userName: string
          }>
        }> | null
        owners: Array<{
          __typename?: 'User'
          _id: string
          avatar: string
          email: string
          nickname: string
          userName: string
        }>
        properties: Array<{
          __typename?: 'FieldProperty'
          _id: string
          fieldType: FieldType
          title: string
          fieldOption?: Array<{
            __typename?: 'Option'
            _id: string
            color: string
            title: string
          }> | null
        }>
      }
    | {
        __typename: 'Card'
        _id: string
        title: string
        createdAt: any
        createdById: string
        ancestorPath: string
        description?: string | null
        fieldsData?: any | null
        isAvailable: boolean
        modifiedById?: string | null
        parentId: string
        updatedAt?: any | null
      }
    | {
        __typename: 'Checklist'
        _id: string
        ancestorPath: string
        createdAt: any
        createdById: string
        isAvailable: boolean
        modifiedById?: string | null
        parentId: string
        title: string
        updatedAt?: any | null
        items: Array<{
          __typename?: 'ChecklistItem'
          _id: string
          isCheck: boolean
          title: string
        }>
      }
    | {
        __typename: 'Column'
        _id: string
        ancestorPath: string
        cardsId: Array<string>
        createdAt: any
        createdById: string
        isAvailable: boolean
        modifiedById?: string | null
        parentId: string
        title: string
        updatedAt?: any | null
      }
    | {
        __typename: 'Comment'
        _id: string
        ancestorPath: string
        commentTo: CommentTo
        content: string
        createdAt: any
        createdById: string
        isAvailable: boolean
        modifiedById?: string | null
        parentId: string
        updatedAt?: any | null
        createdBy: {
          __typename?: 'User'
          _id: string
          avatar: string
          email: string
          nickname: string
          userName: string
        }
      }
  >
}

export type WorkspaceInfoBlocksUpdatedSubscriptionVariables = Exact<{
  [key: string]: never
}>

export type WorkspaceInfoBlocksUpdatedSubscription = {
  __typename?: 'Subscription'
  workspaceInfoBlocksUpdated: Array<
    | {
        __typename?: 'Board'
        _id: string
        columnsId: Array<string>
        createdAt: any
        createdById: string
        description?: string | null
        isAvailable: boolean
        isPublicTemplate?: boolean | null
        isTemplate?: boolean | null
        modifiedById?: string | null
        ownersId: Array<string>
        teamId?: string | null
        title: string
        updatedAt?: any | null
        groupPermission?: Array<{
          __typename?: 'GroupPermission'
          _id: string
          boardActions: Array<BoardAction>
          title: string
          usersId: Array<string>
        }> | null
        owners: Array<{
          __typename?: 'User'
          _id: string
          avatar: string
          email: string
          nickname: string
          userName: string
        }>
        properties: Array<{
          __typename?: 'FieldProperty'
          _id: string
          fieldType: FieldType
          title: string
          fieldOption?: Array<{
            __typename?: 'Option'
            _id: string
            color: string
            title: string
          }> | null
        }>
      }
    | {
        __typename?: 'MessageReference'
        _id: string
        createdAt: any
        createdById: string
        description?: string | null
        isAvailable: boolean
        isPublic?: boolean | null
        messageReferenceType: MessageReferenceType
        modifiedById?: string | null
        pinId?: string | null
        teamId?: string | null
        title: string
        updatedAt?: any | null
        messageMembers: Array<{
          __typename?: 'MessageReferenceMember'
          _id: string
          role: MessageReferenceMemberRole
          userId: string
        }>
      }
    | {
        __typename?: 'Team'
        _id: string
        avatar?: string | null
        createdAt: any
        createdById: string
        description?: string | null
        isAvailable: boolean
        modifiedById?: string | null
        title: string
        updatedAt?: any | null
        teamMembers?: Array<{
          __typename?: 'TeamMember'
          _id: string
          role: TeamMemberRole
          userId: string
        }> | null
      }
  >
}

export const CreateBoardDocument = gql`
  mutation CreateBoard($boardInput: BoardInput!) {
    createBoard(boardInput: $boardInput) {
      _id
      title
    }
  }
`
export type CreateBoardMutationFn = Apollo.MutationFunction<
  CreateBoardMutation,
  CreateBoardMutationVariables
>

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      boardInput: // value for 'boardInput'
 *   },
 * });
 */
export function useCreateBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
    CreateBoardDocument,
    options
  )
}
export type CreateBoardMutationHookResult = ReturnType<
  typeof useCreateBoardMutation
>
export type CreateBoardMutationResult =
  Apollo.MutationResult<CreateBoardMutation>
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<
  CreateBoardMutation,
  CreateBoardMutationVariables
>
export const UpdateBoardDocument = gql`
  mutation UpdateBoard($boardId: String!, $boardInput: UpdateBoardInput!) {
    updateBoard(boardId: $boardId, boardInput: $boardInput)
  }
`
export type UpdateBoardMutationFn = Apollo.MutationFunction<
  UpdateBoardMutation,
  UpdateBoardMutationVariables
>

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      boardInput: // value for 'boardInput'
 *   },
 * });
 */
export function useUpdateBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBoardMutation,
    UpdateBoardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(
    UpdateBoardDocument,
    options
  )
}
export type UpdateBoardMutationHookResult = ReturnType<
  typeof useUpdateBoardMutation
>
export type UpdateBoardMutationResult =
  Apollo.MutationResult<UpdateBoardMutation>
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<
  UpdateBoardMutation,
  UpdateBoardMutationVariables
>
export const AddBoardGroupDocument = gql`
  mutation AddBoardGroup($boardId: String!, $groupInput: GroupInput!) {
    addBoardGroup(boardId: $boardId, groupInput: $groupInput)
  }
`
export type AddBoardGroupMutationFn = Apollo.MutationFunction<
  AddBoardGroupMutation,
  AddBoardGroupMutationVariables
>

/**
 * __useAddBoardGroupMutation__
 *
 * To run a mutation, you first call `useAddBoardGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBoardGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBoardGroupMutation, { data, loading, error }] = useAddBoardGroupMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      groupInput: // value for 'groupInput'
 *   },
 * });
 */
export function useAddBoardGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddBoardGroupMutation,
    AddBoardGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddBoardGroupMutation,
    AddBoardGroupMutationVariables
  >(AddBoardGroupDocument, options)
}
export type AddBoardGroupMutationHookResult = ReturnType<
  typeof useAddBoardGroupMutation
>
export type AddBoardGroupMutationResult =
  Apollo.MutationResult<AddBoardGroupMutation>
export type AddBoardGroupMutationOptions = Apollo.BaseMutationOptions<
  AddBoardGroupMutation,
  AddBoardGroupMutationVariables
>
export const DeleteBoardGroupDocument = gql`
  mutation DeleteBoardGroup($boardId: String!, $groupId: String!) {
    deleteBoardGroup(boardId: $boardId, groupId: $groupId)
  }
`
export type DeleteBoardGroupMutationFn = Apollo.MutationFunction<
  DeleteBoardGroupMutation,
  DeleteBoardGroupMutationVariables
>

/**
 * __useDeleteBoardGroupMutation__
 *
 * To run a mutation, you first call `useDeleteBoardGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardGroupMutation, { data, loading, error }] = useDeleteBoardGroupMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useDeleteBoardGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBoardGroupMutation,
    DeleteBoardGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteBoardGroupMutation,
    DeleteBoardGroupMutationVariables
  >(DeleteBoardGroupDocument, options)
}
export type DeleteBoardGroupMutationHookResult = ReturnType<
  typeof useDeleteBoardGroupMutation
>
export type DeleteBoardGroupMutationResult =
  Apollo.MutationResult<DeleteBoardGroupMutation>
export type DeleteBoardGroupMutationOptions = Apollo.BaseMutationOptions<
  DeleteBoardGroupMutation,
  DeleteBoardGroupMutationVariables
>
export const EditBoardGroupDocument = gql`
  mutation EditBoardGroup($boardId: String!, $groupInput: UpdateGroupInput!) {
    editBoardGroup(boardId: $boardId, groupInput: $groupInput)
  }
`
export type EditBoardGroupMutationFn = Apollo.MutationFunction<
  EditBoardGroupMutation,
  EditBoardGroupMutationVariables
>

/**
 * __useEditBoardGroupMutation__
 *
 * To run a mutation, you first call `useEditBoardGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBoardGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBoardGroupMutation, { data, loading, error }] = useEditBoardGroupMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      groupInput: // value for 'groupInput'
 *   },
 * });
 */
export function useEditBoardGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditBoardGroupMutation,
    EditBoardGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    EditBoardGroupMutation,
    EditBoardGroupMutationVariables
  >(EditBoardGroupDocument, options)
}
export type EditBoardGroupMutationHookResult = ReturnType<
  typeof useEditBoardGroupMutation
>
export type EditBoardGroupMutationResult =
  Apollo.MutationResult<EditBoardGroupMutation>
export type EditBoardGroupMutationOptions = Apollo.BaseMutationOptions<
  EditBoardGroupMutation,
  EditBoardGroupMutationVariables
>
export const AddBoardFieldDocument = gql`
  mutation AddBoardField($boardId: String!, $fieldInput: FieldInput!) {
    addBoardField(boardId: $boardId, fieldInput: $fieldInput)
  }
`
export type AddBoardFieldMutationFn = Apollo.MutationFunction<
  AddBoardFieldMutation,
  AddBoardFieldMutationVariables
>

/**
 * __useAddBoardFieldMutation__
 *
 * To run a mutation, you first call `useAddBoardFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBoardFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBoardFieldMutation, { data, loading, error }] = useAddBoardFieldMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      fieldInput: // value for 'fieldInput'
 *   },
 * });
 */
export function useAddBoardFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddBoardFieldMutation,
    AddBoardFieldMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddBoardFieldMutation,
    AddBoardFieldMutationVariables
  >(AddBoardFieldDocument, options)
}
export type AddBoardFieldMutationHookResult = ReturnType<
  typeof useAddBoardFieldMutation
>
export type AddBoardFieldMutationResult =
  Apollo.MutationResult<AddBoardFieldMutation>
export type AddBoardFieldMutationOptions = Apollo.BaseMutationOptions<
  AddBoardFieldMutation,
  AddBoardFieldMutationVariables
>
export const DeleteBoardFieldDocument = gql`
  mutation DeleteBoardField($boardId: String!, $fieldId: String!) {
    deleteBoardField(boardId: $boardId, fieldId: $fieldId)
  }
`
export type DeleteBoardFieldMutationFn = Apollo.MutationFunction<
  DeleteBoardFieldMutation,
  DeleteBoardFieldMutationVariables
>

/**
 * __useDeleteBoardFieldMutation__
 *
 * To run a mutation, you first call `useDeleteBoardFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardFieldMutation, { data, loading, error }] = useDeleteBoardFieldMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      fieldId: // value for 'fieldId'
 *   },
 * });
 */
export function useDeleteBoardFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBoardFieldMutation,
    DeleteBoardFieldMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteBoardFieldMutation,
    DeleteBoardFieldMutationVariables
  >(DeleteBoardFieldDocument, options)
}
export type DeleteBoardFieldMutationHookResult = ReturnType<
  typeof useDeleteBoardFieldMutation
>
export type DeleteBoardFieldMutationResult =
  Apollo.MutationResult<DeleteBoardFieldMutation>
export type DeleteBoardFieldMutationOptions = Apollo.BaseMutationOptions<
  DeleteBoardFieldMutation,
  DeleteBoardFieldMutationVariables
>
export const EditBoardFieldDocument = gql`
  mutation EditBoardField($boardId: String!, $fieldInput: UpdateFieldInput!) {
    editBoardField(boardId: $boardId, fieldInput: $fieldInput)
  }
`
export type EditBoardFieldMutationFn = Apollo.MutationFunction<
  EditBoardFieldMutation,
  EditBoardFieldMutationVariables
>

/**
 * __useEditBoardFieldMutation__
 *
 * To run a mutation, you first call `useEditBoardFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBoardFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBoardFieldMutation, { data, loading, error }] = useEditBoardFieldMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      fieldInput: // value for 'fieldInput'
 *   },
 * });
 */
export function useEditBoardFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditBoardFieldMutation,
    EditBoardFieldMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    EditBoardFieldMutation,
    EditBoardFieldMutationVariables
  >(EditBoardFieldDocument, options)
}
export type EditBoardFieldMutationHookResult = ReturnType<
  typeof useEditBoardFieldMutation
>
export type EditBoardFieldMutationResult =
  Apollo.MutationResult<EditBoardFieldMutation>
export type EditBoardFieldMutationOptions = Apollo.BaseMutationOptions<
  EditBoardFieldMutation,
  EditBoardFieldMutationVariables
>
export const CreateCardDocument = gql`
  mutation CreateCard($cardInput: CreateCardInput!, $columnId: String!) {
    createCard(cardInput: $cardInput, columnId: $columnId)
  }
`
export type CreateCardMutationFn = Apollo.MutationFunction<
  CreateCardMutation,
  CreateCardMutationVariables
>

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      cardInput: // value for 'cardInput'
 *      columnId: // value for 'columnId'
 *   },
 * });
 */
export function useCreateCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCardMutation,
    CreateCardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(
    CreateCardDocument,
    options
  )
}
export type CreateCardMutationHookResult = ReturnType<
  typeof useCreateCardMutation
>
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<
  CreateCardMutation,
  CreateCardMutationVariables
>
export const UpdateCardDocument = gql`
  mutation UpdateCard($cardId: String!, $cardInput: UpdateCardInput!) {
    updateCard(cardId: $cardId, cardInput: $cardInput) {
      _id
      title
    }
  }
`
export type UpdateCardMutationFn = Apollo.MutationFunction<
  UpdateCardMutation,
  UpdateCardMutationVariables
>

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      cardInput: // value for 'cardInput'
 *   },
 * });
 */
export function useUpdateCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCardMutation,
    UpdateCardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(
    UpdateCardDocument,
    options
  )
}
export type UpdateCardMutationHookResult = ReturnType<
  typeof useUpdateCardMutation
>
export type UpdateCardMutationResult = Apollo.MutationResult<UpdateCardMutation>
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<
  UpdateCardMutation,
  UpdateCardMutationVariables
>
export const UpdateCardPositionDocument = gql`
  mutation UpdateCardPosition(
    $cardId: String!
    $fromColumnId: String!
    $toColumnId: String!
    $toPosition: Float!
  ) {
    updateCardPosition(
      cardId: $cardId
      fromColumnId: $fromColumnId
      toColumnId: $toColumnId
      toPosition: $toPosition
    )
  }
`
export type UpdateCardPositionMutationFn = Apollo.MutationFunction<
  UpdateCardPositionMutation,
  UpdateCardPositionMutationVariables
>

/**
 * __useUpdateCardPositionMutation__
 *
 * To run a mutation, you first call `useUpdateCardPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardPositionMutation, { data, loading, error }] = useUpdateCardPositionMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      fromColumnId: // value for 'fromColumnId'
 *      toColumnId: // value for 'toColumnId'
 *      toPosition: // value for 'toPosition'
 *   },
 * });
 */
export function useUpdateCardPositionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCardPositionMutation,
    UpdateCardPositionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateCardPositionMutation,
    UpdateCardPositionMutationVariables
  >(UpdateCardPositionDocument, options)
}
export type UpdateCardPositionMutationHookResult = ReturnType<
  typeof useUpdateCardPositionMutation
>
export type UpdateCardPositionMutationResult =
  Apollo.MutationResult<UpdateCardPositionMutation>
export type UpdateCardPositionMutationOptions = Apollo.BaseMutationOptions<
  UpdateCardPositionMutation,
  UpdateCardPositionMutationVariables
>
export const CreateChecklistDocument = gql`
  mutation CreateChecklist(
    $boardId: String!
    $cardId: String!
    $input: ChecklistInput!
  ) {
    createChecklist(boardId: $boardId, cardId: $cardId, input: $input)
  }
`
export type CreateChecklistMutationFn = Apollo.MutationFunction<
  CreateChecklistMutation,
  CreateChecklistMutationVariables
>

/**
 * __useCreateChecklistMutation__
 *
 * To run a mutation, you first call `useCreateChecklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChecklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChecklistMutation, { data, loading, error }] = useCreateChecklistMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      cardId: // value for 'cardId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChecklistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChecklistMutation,
    CreateChecklistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateChecklistMutation,
    CreateChecklistMutationVariables
  >(CreateChecklistDocument, options)
}
export type CreateChecklistMutationHookResult = ReturnType<
  typeof useCreateChecklistMutation
>
export type CreateChecklistMutationResult =
  Apollo.MutationResult<CreateChecklistMutation>
export type CreateChecklistMutationOptions = Apollo.BaseMutationOptions<
  CreateChecklistMutation,
  CreateChecklistMutationVariables
>
export const UpdateChecklistDocument = gql`
  mutation UpdateChecklist(
    $checklistId: String!
    $input: UpdateChecklistInput!
  ) {
    updateChecklist(checklistId: $checklistId, input: $input)
  }
`
export type UpdateChecklistMutationFn = Apollo.MutationFunction<
  UpdateChecklistMutation,
  UpdateChecklistMutationVariables
>

/**
 * __useUpdateChecklistMutation__
 *
 * To run a mutation, you first call `useUpdateChecklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChecklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChecklistMutation, { data, loading, error }] = useUpdateChecklistMutation({
 *   variables: {
 *      checklistId: // value for 'checklistId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChecklistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateChecklistMutation,
    UpdateChecklistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateChecklistMutation,
    UpdateChecklistMutationVariables
  >(UpdateChecklistDocument, options)
}
export type UpdateChecklistMutationHookResult = ReturnType<
  typeof useUpdateChecklistMutation
>
export type UpdateChecklistMutationResult =
  Apollo.MutationResult<UpdateChecklistMutation>
export type UpdateChecklistMutationOptions = Apollo.BaseMutationOptions<
  UpdateChecklistMutation,
  UpdateChecklistMutationVariables
>
export const CreateChecklistItemDocument = gql`
  mutation CreateChecklistItem(
    $checklistId: String!
    $item: ChecklistItemInput!
  ) {
    createChecklistItem(checklistId: $checklistId, item: $item)
  }
`
export type CreateChecklistItemMutationFn = Apollo.MutationFunction<
  CreateChecklistItemMutation,
  CreateChecklistItemMutationVariables
>

/**
 * __useCreateChecklistItemMutation__
 *
 * To run a mutation, you first call `useCreateChecklistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChecklistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChecklistItemMutation, { data, loading, error }] = useCreateChecklistItemMutation({
 *   variables: {
 *      checklistId: // value for 'checklistId'
 *      item: // value for 'item'
 *   },
 * });
 */
export function useCreateChecklistItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChecklistItemMutation,
    CreateChecklistItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateChecklistItemMutation,
    CreateChecklistItemMutationVariables
  >(CreateChecklistItemDocument, options)
}
export type CreateChecklistItemMutationHookResult = ReturnType<
  typeof useCreateChecklistItemMutation
>
export type CreateChecklistItemMutationResult =
  Apollo.MutationResult<CreateChecklistItemMutation>
export type CreateChecklistItemMutationOptions = Apollo.BaseMutationOptions<
  CreateChecklistItemMutation,
  CreateChecklistItemMutationVariables
>
export const UpdateChecklistItemsDocument = gql`
  mutation UpdateChecklistItems(
    $checklistId: String!
    $items: [UpdateChecklistItemInput!]!
  ) {
    updateChecklistItems(checklistId: $checklistId, items: $items)
  }
`
export type UpdateChecklistItemsMutationFn = Apollo.MutationFunction<
  UpdateChecklistItemsMutation,
  UpdateChecklistItemsMutationVariables
>

/**
 * __useUpdateChecklistItemsMutation__
 *
 * To run a mutation, you first call `useUpdateChecklistItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChecklistItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChecklistItemsMutation, { data, loading, error }] = useUpdateChecklistItemsMutation({
 *   variables: {
 *      checklistId: // value for 'checklistId'
 *      items: // value for 'items'
 *   },
 * });
 */
export function useUpdateChecklistItemsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateChecklistItemsMutation,
    UpdateChecklistItemsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateChecklistItemsMutation,
    UpdateChecklistItemsMutationVariables
  >(UpdateChecklistItemsDocument, options)
}
export type UpdateChecklistItemsMutationHookResult = ReturnType<
  typeof useUpdateChecklistItemsMutation
>
export type UpdateChecklistItemsMutationResult =
  Apollo.MutationResult<UpdateChecklistItemsMutation>
export type UpdateChecklistItemsMutationOptions = Apollo.BaseMutationOptions<
  UpdateChecklistItemsMutation,
  UpdateChecklistItemsMutationVariables
>
export const CreateColumnDocument = gql`
  mutation CreateColumn($boardId: String!, $columnInput: CreateColumnInput!) {
    createColumn(boardId: $boardId, columnInput: $columnInput)
  }
`
export type CreateColumnMutationFn = Apollo.MutationFunction<
  CreateColumnMutation,
  CreateColumnMutationVariables
>

/**
 * __useCreateColumnMutation__
 *
 * To run a mutation, you first call `useCreateColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createColumnMutation, { data, loading, error }] = useCreateColumnMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      columnInput: // value for 'columnInput'
 *   },
 * });
 */
export function useCreateColumnMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateColumnMutation,
    CreateColumnMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateColumnMutation,
    CreateColumnMutationVariables
  >(CreateColumnDocument, options)
}
export type CreateColumnMutationHookResult = ReturnType<
  typeof useCreateColumnMutation
>
export type CreateColumnMutationResult =
  Apollo.MutationResult<CreateColumnMutation>
export type CreateColumnMutationOptions = Apollo.BaseMutationOptions<
  CreateColumnMutation,
  CreateColumnMutationVariables
>
export const UpdateColumnDocument = gql`
  mutation UpdateColumn($columnId: String!, $columnInput: UpdateColumnInput!) {
    updateColumn(columnId: $columnId, columnInput: $columnInput)
  }
`
export type UpdateColumnMutationFn = Apollo.MutationFunction<
  UpdateColumnMutation,
  UpdateColumnMutationVariables
>

/**
 * __useUpdateColumnMutation__
 *
 * To run a mutation, you first call `useUpdateColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnMutation, { data, loading, error }] = useUpdateColumnMutation({
 *   variables: {
 *      columnId: // value for 'columnId'
 *      columnInput: // value for 'columnInput'
 *   },
 * });
 */
export function useUpdateColumnMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateColumnMutation,
    UpdateColumnMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateColumnMutation,
    UpdateColumnMutationVariables
  >(UpdateColumnDocument, options)
}
export type UpdateColumnMutationHookResult = ReturnType<
  typeof useUpdateColumnMutation
>
export type UpdateColumnMutationResult =
  Apollo.MutationResult<UpdateColumnMutation>
export type UpdateColumnMutationOptions = Apollo.BaseMutationOptions<
  UpdateColumnMutation,
  UpdateColumnMutationVariables
>
export const UpdateColumnPositionDocument = gql`
  mutation UpdateColumnPosition(
    $boardId: String!
    $columnId: String!
    $toPosition: Float!
  ) {
    updateColumnPosition(
      boardId: $boardId
      columnId: $columnId
      toPosition: $toPosition
    )
  }
`
export type UpdateColumnPositionMutationFn = Apollo.MutationFunction<
  UpdateColumnPositionMutation,
  UpdateColumnPositionMutationVariables
>

/**
 * __useUpdateColumnPositionMutation__
 *
 * To run a mutation, you first call `useUpdateColumnPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnPositionMutation, { data, loading, error }] = useUpdateColumnPositionMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      columnId: // value for 'columnId'
 *      toPosition: // value for 'toPosition'
 *   },
 * });
 */
export function useUpdateColumnPositionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateColumnPositionMutation,
    UpdateColumnPositionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateColumnPositionMutation,
    UpdateColumnPositionMutationVariables
  >(UpdateColumnPositionDocument, options)
}
export type UpdateColumnPositionMutationHookResult = ReturnType<
  typeof useUpdateColumnPositionMutation
>
export type UpdateColumnPositionMutationResult =
  Apollo.MutationResult<UpdateColumnPositionMutation>
export type UpdateColumnPositionMutationOptions = Apollo.BaseMutationOptions<
  UpdateColumnPositionMutation,
  UpdateColumnPositionMutationVariables
>
export const CreateCommentDocument = gql`
  mutation CreateComment($input: CommentInput!, $parentId: String!) {
    createComment(input: $input, parentId: $parentId)
  }
`
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options)
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>
export type CreateCommentMutationResult =
  Apollo.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>
export const UpdateCommentDocument = gql`
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input)
  }
`
export type UpdateCommentMutationFn = Apollo.MutationFunction<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >(UpdateCommentDocument, options)
}
export type UpdateCommentMutationHookResult = ReturnType<
  typeof useUpdateCommentMutation
>
export type UpdateCommentMutationResult =
  Apollo.MutationResult<UpdateCommentMutation>
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>
export const CreateMessageDocument = gql`
  mutation CreateMessage($input: MessageInput!, $parentId: String!) {
    createMessage(input: $input, parentId: $parentId)
  }
`
export type CreateMessageMutationFn = Apollo.MutationFunction<
  CreateMessageMutation,
  CreateMessageMutationVariables
>

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CreateMessageDocument, options)
}
export type CreateMessageMutationHookResult = ReturnType<
  typeof useCreateMessageMutation
>
export type CreateMessageMutationResult =
  Apollo.MutationResult<CreateMessageMutation>
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<
  CreateMessageMutation,
  CreateMessageMutationVariables
>
export const UpdateMessageDocument = gql`
  mutation UpdateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input)
  }
`
export type UpdateMessageMutationFn = Apollo.MutationFunction<
  UpdateMessageMutation,
  UpdateMessageMutationVariables
>

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
  >(UpdateMessageDocument, options)
}
export type UpdateMessageMutationHookResult = ReturnType<
  typeof useUpdateMessageMutation
>
export type UpdateMessageMutationResult =
  Apollo.MutationResult<UpdateMessageMutation>
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<
  UpdateMessageMutation,
  UpdateMessageMutationVariables
>
export const DeleteMessageDocument = gql`
  mutation DeleteMessage($messageId: String!) {
    deleteMessage(messageId: $messageId)
  }
`
export type DeleteMessageMutationFn = Apollo.MutationFunction<
  DeleteMessageMutation,
  DeleteMessageMutationVariables
>

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >(DeleteMessageDocument, options)
}
export type DeleteMessageMutationHookResult = ReturnType<
  typeof useDeleteMessageMutation
>
export type DeleteMessageMutationResult =
  Apollo.MutationResult<DeleteMessageMutation>
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<
  DeleteMessageMutation,
  DeleteMessageMutationVariables
>
export const CreateMessageReferenceDocument = gql`
  mutation CreateMessageReference(
    $messageReferenceInput: CreateMessageReferenceInput!
  ) {
    createMessageReference(messageReferenceInput: $messageReferenceInput) {
      _id
      title
    }
  }
`
export type CreateMessageReferenceMutationFn = Apollo.MutationFunction<
  CreateMessageReferenceMutation,
  CreateMessageReferenceMutationVariables
>

/**
 * __useCreateMessageReferenceMutation__
 *
 * To run a mutation, you first call `useCreateMessageReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageReferenceMutation, { data, loading, error }] = useCreateMessageReferenceMutation({
 *   variables: {
 *      messageReferenceInput: // value for 'messageReferenceInput'
 *   },
 * });
 */
export function useCreateMessageReferenceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMessageReferenceMutation,
    CreateMessageReferenceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateMessageReferenceMutation,
    CreateMessageReferenceMutationVariables
  >(CreateMessageReferenceDocument, options)
}
export type CreateMessageReferenceMutationHookResult = ReturnType<
  typeof useCreateMessageReferenceMutation
>
export type CreateMessageReferenceMutationResult =
  Apollo.MutationResult<CreateMessageReferenceMutation>
export type CreateMessageReferenceMutationOptions = Apollo.BaseMutationOptions<
  CreateMessageReferenceMutation,
  CreateMessageReferenceMutationVariables
>
export const UpdateMessageReferenceDocument = gql`
  mutation UpdateMessageReference(
    $messageReferenceId: String!
    $messageReferenceInput: UpdateMessageReferenceInput!
  ) {
    updateMessageReference(
      messageReferenceId: $messageReferenceId
      messageReferenceInput: $messageReferenceInput
    ) {
      _id
      title
    }
  }
`
export type UpdateMessageReferenceMutationFn = Apollo.MutationFunction<
  UpdateMessageReferenceMutation,
  UpdateMessageReferenceMutationVariables
>

/**
 * __useUpdateMessageReferenceMutation__
 *
 * To run a mutation, you first call `useUpdateMessageReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageReferenceMutation, { data, loading, error }] = useUpdateMessageReferenceMutation({
 *   variables: {
 *      messageReferenceId: // value for 'messageReferenceId'
 *      messageReferenceInput: // value for 'messageReferenceInput'
 *   },
 * });
 */
export function useUpdateMessageReferenceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMessageReferenceMutation,
    UpdateMessageReferenceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateMessageReferenceMutation,
    UpdateMessageReferenceMutationVariables
  >(UpdateMessageReferenceDocument, options)
}
export type UpdateMessageReferenceMutationHookResult = ReturnType<
  typeof useUpdateMessageReferenceMutation
>
export type UpdateMessageReferenceMutationResult =
  Apollo.MutationResult<UpdateMessageReferenceMutation>
export type UpdateMessageReferenceMutationOptions = Apollo.BaseMutationOptions<
  UpdateMessageReferenceMutation,
  UpdateMessageReferenceMutationVariables
>
export const AddMessageReferenceMembersDocument = gql`
  mutation AddMessageReferenceMembers(
    $members: [CreateMessageReferenceMemberInput!]!
    $messageReferenceId: String!
  ) {
    addMessageReferenceMembers(
      members: $members
      messageReferenceId: $messageReferenceId
    ) {
      _id
      title
    }
  }
`
export type AddMessageReferenceMembersMutationFn = Apollo.MutationFunction<
  AddMessageReferenceMembersMutation,
  AddMessageReferenceMembersMutationVariables
>

/**
 * __useAddMessageReferenceMembersMutation__
 *
 * To run a mutation, you first call `useAddMessageReferenceMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageReferenceMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageReferenceMembersMutation, { data, loading, error }] = useAddMessageReferenceMembersMutation({
 *   variables: {
 *      members: // value for 'members'
 *      messageReferenceId: // value for 'messageReferenceId'
 *   },
 * });
 */
export function useAddMessageReferenceMembersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddMessageReferenceMembersMutation,
    AddMessageReferenceMembersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddMessageReferenceMembersMutation,
    AddMessageReferenceMembersMutationVariables
  >(AddMessageReferenceMembersDocument, options)
}
export type AddMessageReferenceMembersMutationHookResult = ReturnType<
  typeof useAddMessageReferenceMembersMutation
>
export type AddMessageReferenceMembersMutationResult =
  Apollo.MutationResult<AddMessageReferenceMembersMutation>
export type AddMessageReferenceMembersMutationOptions =
  Apollo.BaseMutationOptions<
    AddMessageReferenceMembersMutation,
    AddMessageReferenceMembersMutationVariables
  >
export const DeleteMessageReferenceMembersDocument = gql`
  mutation DeleteMessageReferenceMembers(
    $membersId: [String!]!
    $messageReferenceId: String!
  ) {
    deleteMessageReferenceMembers(
      membersId: $membersId
      messageReferenceId: $messageReferenceId
    ) {
      _id
      title
    }
  }
`
export type DeleteMessageReferenceMembersMutationFn = Apollo.MutationFunction<
  DeleteMessageReferenceMembersMutation,
  DeleteMessageReferenceMembersMutationVariables
>

/**
 * __useDeleteMessageReferenceMembersMutation__
 *
 * To run a mutation, you first call `useDeleteMessageReferenceMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageReferenceMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageReferenceMembersMutation, { data, loading, error }] = useDeleteMessageReferenceMembersMutation({
 *   variables: {
 *      membersId: // value for 'membersId'
 *      messageReferenceId: // value for 'messageReferenceId'
 *   },
 * });
 */
export function useDeleteMessageReferenceMembersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteMessageReferenceMembersMutation,
    DeleteMessageReferenceMembersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteMessageReferenceMembersMutation,
    DeleteMessageReferenceMembersMutationVariables
  >(DeleteMessageReferenceMembersDocument, options)
}
export type DeleteMessageReferenceMembersMutationHookResult = ReturnType<
  typeof useDeleteMessageReferenceMembersMutation
>
export type DeleteMessageReferenceMembersMutationResult =
  Apollo.MutationResult<DeleteMessageReferenceMembersMutation>
export type DeleteMessageReferenceMembersMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteMessageReferenceMembersMutation,
    DeleteMessageReferenceMembersMutationVariables
  >
export const CreateTeamDocument = gql`
  mutation CreateTeam($teamInput: CreateTeamInput!) {
    createTeam(teamInput: $teamInput) {
      _id
      title
    }
  }
`
export type CreateTeamMutationFn = Apollo.MutationFunction<
  CreateTeamMutation,
  CreateTeamMutationVariables
>

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      teamInput: // value for 'teamInput'
 *   },
 * });
 */
export function useCreateTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(
    CreateTeamDocument,
    options
  )
}
export type CreateTeamMutationHookResult = ReturnType<
  typeof useCreateTeamMutation
>
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<
  CreateTeamMutation,
  CreateTeamMutationVariables
>
export const UpdateTeamDocument = gql`
  mutation UpdateTeam($teamId: String!, $teamInput: UpdateTeamInput!) {
    updateTeam(teamId: $teamId, teamInput: $teamInput) {
      _id
      title
    }
  }
`
export type UpdateTeamMutationFn = Apollo.MutationFunction<
  UpdateTeamMutation,
  UpdateTeamMutationVariables
>

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      teamInput: // value for 'teamInput'
 *   },
 * });
 */
export function useUpdateTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTeamMutation,
    UpdateTeamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(
    UpdateTeamDocument,
    options
  )
}
export type UpdateTeamMutationHookResult = ReturnType<
  typeof useUpdateTeamMutation
>
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<
  UpdateTeamMutation,
  UpdateTeamMutationVariables
>
export const AddTeamMembersDocument = gql`
  mutation AddTeamMembers(
    $members: [CreateTeamMemberInput!]!
    $teamId: String!
  ) {
    addTeamMembers(members: $members, teamId: $teamId) {
      _id
      title
    }
  }
`
export type AddTeamMembersMutationFn = Apollo.MutationFunction<
  AddTeamMembersMutation,
  AddTeamMembersMutationVariables
>

/**
 * __useAddTeamMembersMutation__
 *
 * To run a mutation, you first call `useAddTeamMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMembersMutation, { data, loading, error }] = useAddTeamMembersMutation({
 *   variables: {
 *      members: // value for 'members'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useAddTeamMembersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTeamMembersMutation,
    AddTeamMembersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddTeamMembersMutation,
    AddTeamMembersMutationVariables
  >(AddTeamMembersDocument, options)
}
export type AddTeamMembersMutationHookResult = ReturnType<
  typeof useAddTeamMembersMutation
>
export type AddTeamMembersMutationResult =
  Apollo.MutationResult<AddTeamMembersMutation>
export type AddTeamMembersMutationOptions = Apollo.BaseMutationOptions<
  AddTeamMembersMutation,
  AddTeamMembersMutationVariables
>
export const DeleteTeamMembersDocument = gql`
  mutation DeleteTeamMembers($membersId: [String!]!, $teamId: String!) {
    deleteTeamMembers(membersId: $membersId, teamId: $teamId) {
      _id
      title
    }
  }
`
export type DeleteTeamMembersMutationFn = Apollo.MutationFunction<
  DeleteTeamMembersMutation,
  DeleteTeamMembersMutationVariables
>

/**
 * __useDeleteTeamMembersMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMembersMutation, { data, loading, error }] = useDeleteTeamMembersMutation({
 *   variables: {
 *      membersId: // value for 'membersId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useDeleteTeamMembersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTeamMembersMutation,
    DeleteTeamMembersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteTeamMembersMutation,
    DeleteTeamMembersMutationVariables
  >(DeleteTeamMembersDocument, options)
}
export type DeleteTeamMembersMutationHookResult = ReturnType<
  typeof useDeleteTeamMembersMutation
>
export type DeleteTeamMembersMutationResult =
  Apollo.MutationResult<DeleteTeamMembersMutation>
export type DeleteTeamMembersMutationOptions = Apollo.BaseMutationOptions<
  DeleteTeamMembersMutation,
  DeleteTeamMembersMutationVariables
>
export const UpdateTeamMembersDocument = gql`
  mutation UpdateTeamMembers(
    $members: [UpdateTeamMemberInput!]!
    $teamId: String!
  ) {
    updateTeamMembers(members: $members, teamId: $teamId) {
      _id
      title
    }
  }
`
export type UpdateTeamMembersMutationFn = Apollo.MutationFunction<
  UpdateTeamMembersMutation,
  UpdateTeamMembersMutationVariables
>

/**
 * __useUpdateTeamMembersMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMembersMutation, { data, loading, error }] = useUpdateTeamMembersMutation({
 *   variables: {
 *      members: // value for 'members'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useUpdateTeamMembersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTeamMembersMutation,
    UpdateTeamMembersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateTeamMembersMutation,
    UpdateTeamMembersMutationVariables
  >(UpdateTeamMembersDocument, options)
}
export type UpdateTeamMembersMutationHookResult = ReturnType<
  typeof useUpdateTeamMembersMutation
>
export type UpdateTeamMembersMutationResult =
  Apollo.MutationResult<UpdateTeamMembersMutation>
export type UpdateTeamMembersMutationOptions = Apollo.BaseMutationOptions<
  UpdateTeamMembersMutation,
  UpdateTeamMembersMutationVariables
>
export const DeleteTeamDocument = gql`
  mutation DeleteTeam($teamId: String!) {
    deleteTeam(teamId: $teamId) {
      _id
      title
    }
  }
`
export type DeleteTeamMutationFn = Apollo.MutationFunction<
  DeleteTeamMutation,
  DeleteTeamMutationVariables
>

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useDeleteTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTeamMutation,
    DeleteTeamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(
    DeleteTeamDocument,
    options
  )
}
export type DeleteTeamMutationHookResult = ReturnType<
  typeof useDeleteTeamMutation
>
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<
  DeleteTeamMutation,
  DeleteTeamMutationVariables
>
export const CreateUserDocument = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      userName
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  )
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      userName
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const LoginUserDocument = gql`
  mutation LoginUser($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      _id
      access_token
      userName
    }
  }
`
export type LoginUserMutationFn = Apollo.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      loginUserInput: // value for 'loginUserInput'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginUserMutation,
    LoginUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    options
  )
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>
export const GetBoardsDocument = gql`
  query GetBoards {
    boards {
      _id
      title
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBoardsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(
    GetBoardsDocument,
    options
  )
}
export function useGetBoardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBoardsQuery,
    GetBoardsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(
    GetBoardsDocument,
    options
  )
}
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>
export type GetBoardsLazyQueryHookResult = ReturnType<
  typeof useGetBoardsLazyQuery
>
export type GetBoardsQueryResult = Apollo.QueryResult<
  GetBoardsQuery,
  GetBoardsQueryVariables
>
export const GetTeamsDocument = gql`
  query GetTeams {
    teams {
      _id
      createdAt
      createdById
      description
      isAvailable
      members {
        _id
        role
        userId
      }
      modifiedById
      title
      updatedAt
    }
  }
`

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(
    GetTeamsDocument,
    options
  )
}
export function useGetTeamsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTeamsQuery,
    GetTeamsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(
    GetTeamsDocument,
    options
  )
}
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>
export type GetTeamsLazyQueryHookResult = ReturnType<
  typeof useGetTeamsLazyQuery
>
export type GetTeamsQueryResult = Apollo.QueryResult<
  GetTeamsQuery,
  GetTeamsQueryVariables
>
export const GetFlatBoardDocument = gql`
  query GetFlatBoard($boardId: String!) {
    flatBoard(boardId: $boardId) {
      __typename
      ... on Board {
        _id
        title
        createdAt
        createdById
        description
        columnsId
        groupPermission {
          _id
          boardActions
          title
          users {
            _id
            avatar
            email
            nickname
            userName
          }
          usersId
        }
        isAvailable
        isPublicTemplate
        isTemplate
        modifiedById
        owners {
          _id
          avatar
          email
          nickname
          userName
        }
        ownersId
        properties {
          _id
          fieldOption {
            _id
            color
            title
          }
          fieldType
          title
        }
        teamId
        updatedAt
      }
      ... on Card {
        _id
        title
        createdAt
        createdById
        ancestorPath
        description
        fieldsData
        isAvailable
        modifiedById
        parentId
        updatedAt
      }
      ... on Checklist {
        _id
        ancestorPath
        items {
          _id
          isCheck
          title
        }
        createdAt
        createdById
        isAvailable
        modifiedById
        parentId
        title
        updatedAt
      }
      ... on Column {
        _id
        ancestorPath
        cardsId
        createdAt
        createdById
        isAvailable
        modifiedById
        parentId
        title
        updatedAt
      }
      ... on Comment {
        _id
        ancestorPath
        commentTo
        content
        createdAt
        createdBy {
          _id
          avatar
          email
          nickname
          userName
        }
        createdById
        isAvailable
        modifiedById
        parentId
        updatedAt
      }
    }
  }
`

/**
 * __useGetFlatBoardQuery__
 *
 * To run a query within a React component, call `useGetFlatBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFlatBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFlatBoardQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetFlatBoardQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFlatBoardQuery,
    GetFlatBoardQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFlatBoardQuery, GetFlatBoardQueryVariables>(
    GetFlatBoardDocument,
    options
  )
}
export function useGetFlatBoardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFlatBoardQuery,
    GetFlatBoardQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFlatBoardQuery, GetFlatBoardQueryVariables>(
    GetFlatBoardDocument,
    options
  )
}
export type GetFlatBoardQueryHookResult = ReturnType<
  typeof useGetFlatBoardQuery
>
export type GetFlatBoardLazyQueryHookResult = ReturnType<
  typeof useGetFlatBoardLazyQuery
>
export type GetFlatBoardQueryResult = Apollo.QueryResult<
  GetFlatBoardQuery,
  GetFlatBoardQueryVariables
>
export const GetMyProfileInfoDocument = gql`
  query GetMyProfileInfo {
    getMyProfileInfo {
      _id
      email
      nickname
      userName
    }
  }
`

/**
 * __useGetMyProfileInfoQuery__
 *
 * To run a query within a React component, call `useGetMyProfileInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyProfileInfoQuery,
    GetMyProfileInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyProfileInfoQuery, GetMyProfileInfoQueryVariables>(
    GetMyProfileInfoDocument,
    options
  )
}
export function useGetMyProfileInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyProfileInfoQuery,
    GetMyProfileInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetMyProfileInfoQuery,
    GetMyProfileInfoQueryVariables
  >(GetMyProfileInfoDocument, options)
}
export type GetMyProfileInfoQueryHookResult = ReturnType<
  typeof useGetMyProfileInfoQuery
>
export type GetMyProfileInfoLazyQueryHookResult = ReturnType<
  typeof useGetMyProfileInfoLazyQuery
>
export type GetMyProfileInfoQueryResult = Apollo.QueryResult<
  GetMyProfileInfoQuery,
  GetMyProfileInfoQueryVariables
>
export const GetUserDocument = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      _id
      email
      nickname
      userName
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>
export const GetUserDataDocument = gql`
  query GetUserData {
    getUserData {
      __typename
      ... on Board {
        _id
        title
        createdAt
        updatedAt
        columnsId
        createdById
        description
        isAvailable
        isPublicTemplate
        isTemplate
        modifiedById
        owners {
          _id
          nickname
        }
        ownersId
        teamId
      }
      ... on MessageReference {
        _id
        title
        createdAt
        updatedAt
        description
        isAvailable
        isPublic
        messageMembers: members {
          _id
          role
          userId
        }
        messageReferenceType
        modifiedById
        pinId
        teamId
      }
      ... on Team {
        _id
        title
        createdAt
        updatedAt
        avatar
        description
        isAvailable
        teamMembers: members {
          _id
          role
          userId
        }
        modifiedById
      }
    }
  }
`

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserDataQuery,
    GetUserDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(
    GetUserDataDocument,
    options
  )
}
export function useGetUserDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserDataQuery,
    GetUserDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(
    GetUserDataDocument,
    options
  )
}
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>
export type GetUserDataLazyQueryHookResult = ReturnType<
  typeof useGetUserDataLazyQuery
>
export type GetUserDataQueryResult = Apollo.QueryResult<
  GetUserDataQuery,
  GetUserDataQueryVariables
>
export const BlocksUpdatedDocument = gql`
  subscription BlocksUpdated($rootId: String!) {
    boardDatablocksUpdated(rootId: $rootId) {
      __typename
      ... on Board {
        _id
        title
        createdAt
        createdById
        description
        columnsId
        groupPermission {
          _id
          boardActions
          title
          users {
            _id
            avatar
            email
            nickname
            userName
          }
          usersId
        }
        isAvailable
        isPublicTemplate
        isTemplate
        modifiedById
        owners {
          _id
          avatar
          email
          nickname
          userName
        }
        ownersId
        properties {
          _id
          fieldOption {
            _id
            color
            title
          }
          fieldType
          title
        }
        teamId
        updatedAt
      }
      ... on Card {
        _id
        title
        createdAt
        createdById
        ancestorPath
        description
        fieldsData
        isAvailable
        modifiedById
        parentId
        updatedAt
      }
      ... on Checklist {
        _id
        ancestorPath
        items {
          _id
          isCheck
          title
        }
        createdAt
        createdById
        isAvailable
        modifiedById
        parentId
        title
        updatedAt
      }
      ... on Column {
        _id
        ancestorPath
        cardsId
        createdAt
        createdById
        isAvailable
        modifiedById
        parentId
        title
        updatedAt
      }
      ... on Comment {
        _id
        ancestorPath
        commentTo
        content
        createdAt
        createdBy {
          _id
          avatar
          email
          nickname
          userName
        }
        createdById
        isAvailable
        modifiedById
        parentId
        updatedAt
      }
    }
  }
`

/**
 * __useBlocksUpdatedSubscription__
 *
 * To run a query within a React component, call `useBlocksUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBlocksUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlocksUpdatedSubscription({
 *   variables: {
 *      rootId: // value for 'rootId'
 *   },
 * });
 */
export function useBlocksUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    BlocksUpdatedSubscription,
    BlocksUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    BlocksUpdatedSubscription,
    BlocksUpdatedSubscriptionVariables
  >(BlocksUpdatedDocument, options)
}
export type BlocksUpdatedSubscriptionHookResult = ReturnType<
  typeof useBlocksUpdatedSubscription
>
export type BlocksUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<BlocksUpdatedSubscription>
export const WorkspaceInfoBlocksUpdatedDocument = gql`
  subscription WorkspaceInfoBlocksUpdated {
    workspaceInfoBlocksUpdated {
      ... on Board {
        _id
        columnsId
        createdAt
        createdById
        description
        groupPermission {
          _id
          boardActions
          title
          usersId
        }
        isAvailable
        isPublicTemplate
        isTemplate
        modifiedById
        owners {
          _id
          avatar
          email
          nickname
          userName
        }
        ownersId
        properties {
          _id
          fieldOption {
            _id
            color
            title
          }
          fieldType
          title
        }
        teamId
        title
        updatedAt
      }
      ... on MessageReference {
        _id
        createdAt
        createdById
        description
        isAvailable
        isPublic
        messageMembers: members {
          _id
          role
          userId
        }
        messageReferenceType
        modifiedById
        pinId
        teamId
        title
        updatedAt
      }
      ... on Team {
        _id
        avatar
        createdAt
        createdById
        description
        isAvailable
        teamMembers: members {
          _id
          role
          userId
        }
        modifiedById
        title
        updatedAt
      }
    }
  }
`

/**
 * __useWorkspaceInfoBlocksUpdatedSubscription__
 *
 * To run a query within a React component, call `useWorkspaceInfoBlocksUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWorkspaceInfoBlocksUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkspaceInfoBlocksUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useWorkspaceInfoBlocksUpdatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    WorkspaceInfoBlocksUpdatedSubscription,
    WorkspaceInfoBlocksUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    WorkspaceInfoBlocksUpdatedSubscription,
    WorkspaceInfoBlocksUpdatedSubscriptionVariables
  >(WorkspaceInfoBlocksUpdatedDocument, options)
}
export type WorkspaceInfoBlocksUpdatedSubscriptionHookResult = ReturnType<
  typeof useWorkspaceInfoBlocksUpdatedSubscription
>
export type WorkspaceInfoBlocksUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<WorkspaceInfoBlocksUpdatedSubscription>
