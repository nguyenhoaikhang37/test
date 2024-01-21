import { HideField, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
@ObjectType()
export class User {
  _id: string

  @Prop({ unique: true, required: true })
  userName: string

  @Prop({ unique: true, required: true })
  email: string

  @Prop()
  nickname: string

  @Prop()
  avatar: string

  @HideField()
  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)

@ObjectType()
export class LoggedUserOutput extends User {
  access_token: string
}
