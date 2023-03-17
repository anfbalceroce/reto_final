import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 50).notNullable()
      table.string('second_name', 50).notNullable()
      table.string('surname', 50).notNullable()
      table.string('second_surname', 50).notNullable()
      table.integer('document_type').unsigned().references('document_types.id').onDelete('CASCADE')
      table.integer('document_number').unsigned().notNullable()
      table.string('email', 256).notNullable()
      table.string('password', 256).notNullable()
      table.integer('role_id').unsigned().references('roles.id').onDelete('CASCADE')
      table.string('phone', 20).notNullable()
      table.boolean('state')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
