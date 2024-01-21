import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import GraphQLJSON from 'graphql-type-json'
import { Context } from 'graphql-ws'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { variblesConfig } from './config'
import { AWSModule } from './modules/aws/aws.module'
import { BoardModule } from './modules/board/board.module'
import { CardModule } from './modules/card/card.module'
import { ChecklistModule } from './modules/checklist/checklist.module'
import { ColumnModule } from './modules/column/column.module'
import { CommentModule } from './modules/comment/comment.module'
import { MessageModule } from './modules/message/message.module'
import { MessageReferenceModule } from './modules/messageReference/messageReference.module'
import { TeamModule } from './modules/team/team.module'
import { UserModule } from './modules/user/user.module'

const decodeToken = async (authorization: string) => {
  const jwtService = new JwtService({
    secret: variblesConfig.JWT_SECRET
  })

  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    try {
      return jwtService.verifyAsync(token)
    } catch (error) {
      console.log(error)
    }
  }
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql'
        },
        'graphql-ws': {
          path: '/graphql',
          // onClose(ctx) {},
          onConnect: async (context: Context<any>) => {
            const { connectionParams, extra } = context as any
            const token = connectionParams?.headers?.authorization
            if (token) {
              const user = await decodeToken(token)
              extra.user = user
            }
          }
          // onDisconnect(ctx) {},
          // onNext(ctx) {},
          // onSubscribe(ctx) {}
        }
      },
      resolvers: { JSON: GraphQLJSON },
      buildSchemaOptions: { dateScalarMode: 'timestamp' }
    }),

    MongooseModule.forRoot(variblesConfig.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),

    AWSModule,
    BoardModule,
    CardModule,
    ColumnModule,
    UserModule,
    ChecklistModule,
    CommentModule,
    TeamModule,
    MessageReferenceModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
