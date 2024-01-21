import { InputType } from '@nestjs/graphql'
import { FieldType } from '../schemas/field.schema'

@InputType()
export class FieldOptionInput {
  _id?: string
  title?: string
  color?: string
}

@InputType()
export class FieldInput {
  title: string
  fieldType: FieldType
  fieldOption?: FieldOptionInput[]
}

@InputType()
export class UpdateFieldInput {
  _id: string
  title?: string
  fieldType?: FieldType
  fieldOption?: FieldOptionInput[]
}
