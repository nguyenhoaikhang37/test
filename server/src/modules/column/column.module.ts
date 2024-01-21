import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSubModule } from 'src/modules/pubsub/pubsub.module'
import { BoardModule } from '../board/board.module'
import { Board, BoardSchema } from '../board/schemas/board.schema'
import { CardModule } from '../card/card.module'
import { ColumnResolver } from './column.resolver'
import { ColumnService } from './column.service'
import { Column, ColumnSchema } from './column.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema }
    ]),
    PubSubModule,

    forwardRef(() => BoardModule),
    forwardRef(() => CardModule)
  ],

  providers: [ColumnResolver, ColumnService],
  exports: [ColumnService]
})
export class ColumnModule {}
