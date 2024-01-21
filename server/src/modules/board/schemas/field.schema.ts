import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum FieldType {
  Date = 'Date',
  Number = 'Number',
  String = 'String',
  MultiPeople = 'MultiPeople',
  Select = 'Select',
  MultiSelect = 'MultiSelect',
  Link = 'Link'
}

registerEnumType(FieldType, {
  name: 'FieldType'
})

@ObjectType()
@Schema()
export class Option {
  _id: string

  @Prop()
  title: string

  @Prop()
  color: string
}

export const OptionSchema = SchemaFactory.createForClass(Option)

@ObjectType()
@Schema()
export class FieldProperty {
  _id: string

  @Prop()
  title: string

  @Prop()
  fieldType: FieldType

  @Field(() => [Option], { nullable: true })
  @Prop({ type: [OptionSchema] })
  fieldOption?: Option[]
}

export const FieldPropertySchema = SchemaFactory.createForClass(FieldProperty)
