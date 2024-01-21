import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { PubSubService } from './pubsub.service'
import { PubSubResolver } from './pubsub.resolver'

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub()
    },
    PubSubService,
    PubSubResolver
  ],
  exports: ['PUB_SUB', PubSubService]
})
export class PubSubModule {}
