import { Inject } from '@nestjs/common'
import { Args, Context, Resolver, Subscription } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { PubSub } from 'graphql-subscriptions'
import { variblesConfig } from 'src/config'
import {
  BoardDataBlockUnion,
  WorkspaceInfoBlock,
  WorkspaceInfoBlockUnion
} from '../common'

export const decodeToken = (authorization: string) => {
  const jwtService = new JwtService({
    secret: variblesConfig.JWT_SECRET
  })

  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    try {
      return jwtService.verifyAsync(token)
    } catch (error) {
      console.log(error)
    }
  }
}

const getUserFormContext = async (context: any) => {
  const token = context?.req?.connectionParams?.headers?.authorization
  if (token) {
    const user = await decodeToken(token)
    return {
      userId: user?.sub,
      userName: user?.userName
    }
  }
}

@Resolver(() => Boolean)
export class PubSubResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

  //subscription
  @Subscription(() => [BoardDataBlockUnion])
  boardDatablocksUpdated(@Args('rootId') rootId: string) {
    const asyncIterator = this.pubSub.asyncIterator('boardDatablocksUpdated')
    return {
      async next() {
        const { value, done } = await asyncIterator.next()

        if (!done) {
          return {
            value: {
              boardDatablocksUpdated: value?.boardDatablocksUpdated?.filter(
                block =>
                  block?._id?.toString() == rootId ||
                  block?.ancestorPath?.includes(rootId)
              )
            },
            done: false
          }
        }

        return { done: true }
      },
      async return() {
        return await asyncIterator.return()
      },
      [Symbol.asyncIterator]() {
        return this
      }
    }
  }

  @Subscription(() => [WorkspaceInfoBlockUnion])
  workspaceInfoBlocksUpdated(@Context() context) {
    const asyncIterator = this.pubSub.asyncIterator(
      'workspaceInfoBlocksUpdated'
    )

    return {
      async next() {
        const { value, done } = await asyncIterator.next()
        const { sub: userId } = context?.req?.extra?.user
        if (!done) {
          const filteredBlocks = (
            value?.workspaceInfoBlocksUpdated as WorkspaceInfoBlock[]
          )?.filter(block => block?._usersId?.includes(userId))

          console.log(value?.workspaceInfoBlocksUpdated)

          console.log(userId)
          console.log(filteredBlocks)

          return {
            value: {
              workspaceInfoBlocksUpdated: filteredBlocks || []
            },
            done: false
          }
        }

        return { done: true }
      },
      async return() {
        return await asyncIterator.return()
      },
      [Symbol.asyncIterator]() {
        return this
      }
    }
  }
}
