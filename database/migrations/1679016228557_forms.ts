import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forms extends BaseSchema {
  protected tableName = 'forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('answer_id').unsigned().references('answers.id').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
