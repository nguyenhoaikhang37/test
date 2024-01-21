import { gql } from '@apollo/client'

gql`
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

gql`
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
