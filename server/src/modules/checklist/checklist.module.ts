import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSubModule } from 'src/modules/pubsub/pubsub.module'
import { BoardModule } from '../board/board.module'
import { CardModule } from '../card/card.module'

import { UserModule } from '../user/user.module'
import { ChecklistResolver } from './checklist.resolver'
import { Checklist, ChecklistSchema } from './schemas/checklist.schema'
import { ChecklistService } from './checklist.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checklist.name, schema: ChecklistSchema }
    ]),
    PubSubModule,
    forwardRef(() => BoardModule),
    forwardRef(() => UserModule),
    forwardRef(() => CardModule)
  ],

  providers: [ChecklistResolver, ChecklistService],
  exports: [ChecklistService]
})
export class ChecklistModule {}
