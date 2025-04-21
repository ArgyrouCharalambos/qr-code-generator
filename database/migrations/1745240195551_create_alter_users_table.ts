import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Vérifiez si la colonne existe avant de la supprimer
        table.dropColumn('role')
    })
  }

}