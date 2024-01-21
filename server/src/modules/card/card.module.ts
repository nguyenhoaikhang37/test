import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSubModule } from 'src/modules/pubsub/pubsub.module'
import { BoardModule } from '../board/board.module'
import { Board, BoardSchema } from '../board/schemas/board.schema'
import { ChecklistModule } from '../checklist/checklist.module'
import { Column, ColumnSchema } from '../column/column.schema'
import { CommentModule } from '../comment/comment.module'
import { UserModule } from '../user/user.module'
import { CardResolver } from './card.resolver'
import { Card, CardSchema } from './card.schema'
import { CardService } from './card.service'
import { ColumnModule } from '../column/column.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Card.name, schema: CardSchema }
    ]),
    PubSubModule,

    forwardRef(() => BoardModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ChecklistModule),
    forwardRef(() => UserModule),
    forwardRef(() => ColumnModule)
  ],
  providers: [CardResolver, CardService],
  exports: [CardService]
})
export class CardModule {}
