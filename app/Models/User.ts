import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public secondName: string

  @column()
  public surname: string

  @column()
  public secondSurname: string

  @column()
  public documentType: number

  @column()
  public documentNumber: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public roleId: number

  @column()
  public phone: string

  @column()
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Form)
  public forms: HasMany<typeof Form>
}
