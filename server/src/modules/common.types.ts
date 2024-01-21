export type Ids = {
  boardId: string
  userId: string
  columnId: string
  cardId: string
  attachmentId: string
  memberId: string
  labelId: string
  checklistId: string
  itemId: string
  draftId: string
  commentId: string
  groupId: string
  parentId: string
  createdById: string
  modifiedById: string
  fieldId: string
  teamId: string
  messageReferenceId: string
  messageId: string
}

export type TypeIds<T extends keyof Ids> = {
  [P in T]: Ids[P]
}
