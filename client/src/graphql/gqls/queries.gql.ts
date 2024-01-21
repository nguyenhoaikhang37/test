import { gql } from '@apollo/client'

// Get all boards
gql`
  query GetBoards {
    boards {
      _id
      title
      createdAt
      updatedAt
    }
  }
`

// Get all teams
gql`
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

// Get flat board by ID
gql`
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

// Get user's profile information
gql`
  query GetMyProfileInfo {
    getMyProfileInfo {
      _id
      email
      nickname
      userName
    }
  }
`

// Get user by ID
gql`
  query GetUser($id: String!) {
    user(id: $id) {
      _id
      email
      nickname
      userName
    }
  }
`

gql`
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
