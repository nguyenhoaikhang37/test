import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSubModule } from 'src/modules/pubsub/pubsub.module'
import { BoardModule } from '../board/board.module'
import { Board, BoardSchema } from '../board/schemas/board.schema'
import { ChecklistModule } from '../checklist/checklist.module'
import { Column, ColumnSchema } from '../column/column.schema'
import { CommentModule } from '../comment/comment.module'
import { UserModule } from '../user/user.module'
import { TeamResolver } from './team.resolver'
import { Team, TeamSchema } from './team.schema'
import { TeamService } from './team.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Team.name, schema: TeamSchema }
    ]),
    PubSubModule,

    forwardRef(() => BoardModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ChecklistModule),
    forwardRef(() => UserModule)
  ],
  providers: [TeamResolver, TeamService],
  exports: [TeamService]
})
export class TeamModule {}
