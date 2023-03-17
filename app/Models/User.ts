import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'
import DocumentType from './DocumentType'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: 'firstName' })
  public firstName: string

  @column({ serializeAs: 'secondName' })
  public secondName: string

  @column()
  public surname: string

  @column({ serializeAs: 'secondSurName' })
  public secondSurname: string

  @column({ serializeAs: 'typeDocument' })
  public documentTypeId: number

  @column({ serializeAs: 'documentNumber' })
  public documentNumber: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public roleId: number

  @column()
  public phone: string

  @column({ serializeAs: null })
  public state: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => DocumentType)
  public documentType: BelongsTo<typeof DocumentType>

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @hasMany(() => Form)
  public forms: HasMany<typeof Form>
}
