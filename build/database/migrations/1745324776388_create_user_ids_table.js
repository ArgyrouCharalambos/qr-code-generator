import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'urls';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('userId');
        });
    }
}
//# sourceMappingURL=1745324776388_create_user_ids_table.js.map