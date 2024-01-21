import { Inject, Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { BoardDataBlock, WorkspaceInfoBlock } from '../common'

@Injectable()
export class PubSubService {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

  async boardDatablocksUpdated(boardDatablocksUpdated: BoardDataBlock[]) {
    await this.pubSub.publish('boardDatablocksUpdated', { boardDatablocksUpdated })
  }

  async workspaceInfoBlocksUpdated(workspaceInfoBlocksUpdated: WorkspaceInfoBlock[]) {
    await this.pubSub.publish('workspaceInfoBlocksUpdated', {
      workspaceInfoBlocksUpdated
    })
  }
}
