import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      
      table.enum('role', ['admin', 'user']).notNullable().defaultTo('user')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}