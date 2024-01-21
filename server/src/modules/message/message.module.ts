import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSubModule } from 'src/modules/pubsub/pubsub.module'
import { BoardModule } from '../board/board.module'
import { CardModule } from '../card/card.module'
import { Card, CardSchema } from '../card/card.schema'
import { UserModule } from '../user/user.module'
import { MessageResolver } from './message.resolver'
import { Message, MessageSchema } from './message.schema'
import { MessageService } from './message.service'
import { MessageReferenceModule } from '../messageReference/messageReference.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Card.name, schema: CardSchema }
    ]),
    PubSubModule,

    forwardRef(() => BoardModule),
    forwardRef(() => UserModule),
    forwardRef(() => CardModule),
    forwardRef(() => MessageReferenceModule)
  ],
  providers: [MessageResolver, MessageService],
  exports: [MessageService]
})
export class MessageModule {}
