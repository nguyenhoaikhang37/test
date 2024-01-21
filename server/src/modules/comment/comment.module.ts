import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSubModule } from 'src/modules/pubsub/pubsub.module'
import { BoardModule } from '../board/board.module'
import { CardModule } from '../card/card.module'
import { Card, CardSchema } from '../card/card.schema'
import { UserModule } from '../user/user.module'
import { CommentResolver } from './comment.resolver'
import { Comment, CommentSchema } from './comment.schema'
import { CommentService } from './comment.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Card.name, schema: CardSchema }
    ]),
    PubSubModule,

    forwardRef(() => BoardModule),
    forwardRef(() => UserModule),
    forwardRef(() => CardModule)
  ],
  providers: [CommentResolver, CommentService],
  exports: [CommentService]
})
export class CommentModule {}
