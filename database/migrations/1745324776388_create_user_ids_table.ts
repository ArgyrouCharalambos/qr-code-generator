import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'urls'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
        table.integer('userId')
    })
  }

}