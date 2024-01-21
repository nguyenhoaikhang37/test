import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSubModule } from 'src/modules/pubsub/pubsub.module'
import { BoardModule } from '../board/board.module'
import { Board, BoardSchema } from '../board/schemas/board.schema'
import { ChecklistModule } from '../checklist/checklist.module'
import { Column, ColumnSchema } from '../column/column.schema'
import { CommentModule } from '../comment/comment.module'
import { UserModule } from '../user/user.module'
import { MessageReferenceResolver } from './messageReference.resolver'
import {
  MessageReference,
  MessageReferenceSchema
} from './messageReference.schema'
import { MessageReferenceService } from './messageReference.service'
import { TeamModule } from '../team/team.module'
import { MessageModule } from '../message/message.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: MessageReference.name, schema: MessageReferenceSchema }
    ]),
    PubSubModule,

    forwardRef(() => BoardModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ChecklistModule),
    forwardRef(() => UserModule),
    forwardRef(() => TeamModule),
    forwardRef(() => MessageModule)
  ],
  providers: [MessageReferenceResolver, MessageReferenceService],
  exports: [MessageReferenceService]
})
export class MessageReferenceModule {}
