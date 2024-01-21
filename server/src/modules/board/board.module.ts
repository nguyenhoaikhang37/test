import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSubModule } from 'src/modules/pubsub/pubsub.module'
import { CardModule } from '../card/card.module'
import { ChecklistModule } from '../checklist/checklist.module'
import { ColumnModule } from '../column/column.module'
import { CommentModule } from '../comment/comment.module'
import { UserModule } from '../user/user.module'
import { BoardService } from './board.service'
import { BoardResolver } from './resolvers/board.resolver'
import { GroupPermissionResolver } from './resolvers/groupPermission.resolver'
import { Board, BoardSchema } from './schemas/board.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    PubSubModule,

    forwardRef(() => ColumnModule),
    forwardRef(() => UserModule),
    forwardRef(() => CardModule),
    forwardRef(() => ChecklistModule),
    forwardRef(() => CommentModule)
  ],
  providers: [BoardResolver, GroupPermissionResolver, BoardService],
  exports: [BoardService]
})
export class BoardModule {}
