import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'urls';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('userid');
        });
    }
}
//# sourceMappingURL=1745344398713_create_add_user_ids_table.js.map