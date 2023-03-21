import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
  protected tableName = 'answers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('answer', 512).notNullable()
      table.boolean('is_correct').notNullable()
      table.integer('question_id').unsigned().references('questions.id').onDelete('CASCADE')
      table.boolean('state').defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
