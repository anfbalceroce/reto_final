import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'option' })
  public answer: string

  @column({ serializeAs: null })
  public isCorrect: boolean

  @column({ serializeAs: null })
  public questionId: number

  @column({ serializeAs: null })
  public state: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Form)
  public forms: HasMany<typeof Form>
}
