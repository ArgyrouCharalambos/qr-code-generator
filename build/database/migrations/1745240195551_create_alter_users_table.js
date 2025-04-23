import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'users';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('role');
        });
    }
}
//# sourceMappingURL=1745240195551_create_alter_users_table.js.map