import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'urls';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('userId');
        });
    }
}
//# sourceMappingURL=1745344196915_create_removes_table.js.map