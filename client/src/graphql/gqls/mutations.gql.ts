import { gql } from '@apollo/client'

// Create a board
gql`
  mutation CreateBoard($boardInput: BoardInput!) {
    createBoard(boardInput: $boardInput) {
      _id
      title
    }
  }
`

// Update board information
gql`
  mutation UpdateBoard($boardId: String!, $boardInput: UpdateBoardInput!) {
    updateBoard(boardId: $boardId, boardInput: $boardInput)
  }
`

// Add a group to a board
gql`
  mutation AddBoardGroup($boardId: String!, $groupInput: GroupInput!) {
    addBoardGroup(boardId: $boardId, groupInput: $groupInput)
  }
`

// Delete a group from a board
gql`
  mutation DeleteBoardGroup($boardId: String!, $groupId: String!) {
    deleteBoardGroup(boardId: $boardId, groupId: $groupId)
  }
`

// Edit a group on a board
gql`
  mutation EditBoardGroup($boardId: String!, $groupInput: UpdateGroupInput!) {
    editBoardGroup(boardId: $boardId, groupInput: $groupInput)
  }
`

// Add a field to a board
gql`
  mutation AddBoardField($boardId: String!, $fieldInput: FieldInput!) {
    addBoardField(boardId: $boardId, fieldInput: $fieldInput)
  }
`

// Delete a field from a board
gql`
  mutation DeleteBoardField($boardId: String!, $fieldId: String!) {
    deleteBoardField(boardId: $boardId, fieldId: $fieldId)
  }
`

// Edit a field on a board
gql`
  mutation EditBoardField($boardId: String!, $fieldInput: UpdateFieldInput!) {
    editBoardField(boardId: $boardId, fieldInput: $fieldInput)
  }
`

// Create a card
gql`
  mutation CreateCard($cardInput: CreateCardInput!, $columnId: String!) {
    createCard(cardInput: $cardInput, columnId: $columnId)
  }
`

// Update card information
gql`
  mutation UpdateCard($cardId: String!, $cardInput: UpdateCardInput!) {
    updateCard(cardId: $cardId, cardInput: $cardInput) {
      _id
      title
    }
  }
`

// Update card position
gql`
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

// Create a checklist
gql`
  mutation CreateChecklist(
    $boardId: String!
    $cardId: String!
    $input: ChecklistInput!
  ) {
    createChecklist(boardId: $boardId, cardId: $cardId, input: $input)
  }
`

// Update checklist information
gql`
  mutation UpdateChecklist(
    $checklistId: String!
    $input: UpdateChecklistInput!
  ) {
    updateChecklist(checklistId: $checklistId, input: $input)
  }
`

// Create a checklist item
gql`
  mutation CreateChecklistItem(
    $checklistId: String!
    $item: ChecklistItemInput!
  ) {
    createChecklistItem(checklistId: $checklistId, item: $item)
  }
`

// Update checklist items
gql`
  mutation UpdateChecklistItems(
    $checklistId: String!
    $items: [UpdateChecklistItemInput!]!
  ) {
    updateChecklistItems(checklistId: $checklistId, items: $items)
  }
`

// Create a column
gql`
  mutation CreateColumn($boardId: String!, $columnInput: CreateColumnInput!) {
    createColumn(boardId: $boardId, columnInput: $columnInput)
  }
`

// Update column information
gql`
  mutation UpdateColumn($columnId: String!, $columnInput: UpdateColumnInput!) {
    updateColumn(columnId: $columnId, columnInput: $columnInput)
  }
`

// Update column position
gql`
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

// Create a comment
gql`
  mutation CreateComment($input: CommentInput!, $parentId: String!) {
    createComment(input: $input, parentId: $parentId)
  }
`

// Update comment information
gql`
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input)
  }
`

// Create a message
gql`
  mutation CreateMessage($input: MessageInput!, $parentId: String!) {
    createMessage(input: $input, parentId: $parentId)
  }
`

// Update message information
gql`
  mutation UpdateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input)
  }
`

// Delete a message
gql`
  mutation DeleteMessage($messageId: String!) {
    deleteMessage(messageId: $messageId)
  }
`

// Create a message reference
gql`
  mutation CreateMessageReference(
    $messageReferenceInput: CreateMessageReferenceInput!
  ) {
    createMessageReference(messageReferenceInput: $messageReferenceInput) {
      _id
      title
    }
  }
`

// Update message reference information
gql`
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

// Add members to a message reference
gql`
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

// Delete members from a message reference
gql`
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

// Create a team
gql`
  mutation CreateTeam($teamInput: CreateTeamInput!) {
    createTeam(teamInput: $teamInput) {
      _id
      title
    }
  }
`

// Update team information
gql`
  mutation UpdateTeam($teamId: String!, $teamInput: UpdateTeamInput!) {
    updateTeam(teamId: $teamId, teamInput: $teamInput) {
      _id
      title
    }
  }
`

// Add members to a team
gql`
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

// Delete members from a team
gql`
  mutation DeleteTeamMembers($membersId: [String!]!, $teamId: String!) {
    deleteTeamMembers(membersId: $membersId, teamId: $teamId) {
      _id
      title
    }
  }
`

// Update team members
gql`
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

// Delete a team
gql`
  mutation DeleteTeam($teamId: String!) {
    deleteTeam(teamId: $teamId) {
      _id
      title
    }
  }
`

// Create a user
gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      userName
    }
  }
`

// Update user information
gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      userName
    }
  }
`

// Login user
gql`
  mutation LoginUser($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      _id
      access_token
      userName
    }
  }
`
