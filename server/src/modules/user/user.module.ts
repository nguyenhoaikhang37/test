import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSubModule } from 'src/modules/pubsub/pubsub.module'
import { AuthModule } from '../auth/auth.module'
import { BoardModule } from '../board/board.module'
import { Board, BoardSchema } from '../board/schemas/board.schema'
import { MessageReferenceModule } from '../messageReference/messageReference.module'
import { TeamModule } from '../team/team.module'
import { User, UserSchema } from './schemas/user.schema'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: User.name, schema: UserSchema }
    ]),
    PubSubModule,
    forwardRef(() => AuthModule),
    forwardRef(() => TeamModule),
    forwardRef(() => MessageReferenceModule),
    forwardRef(() => BoardModule)
  ],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
