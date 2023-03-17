import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public answer: string

  @column()
  public isCorrect: boolean

  @column()
  public questionId: number

  @column()
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Form)
  public forms: HasMany<typeof Form>
}
