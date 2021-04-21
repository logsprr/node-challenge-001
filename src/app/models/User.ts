import { Model } from 'objection';
import database from './index';

class User extends Model {
  id!: number;
  email!: string;
  password!: string;
  static get tableName() {
    return 'users';
  }
  $formatJson(json: any) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}

async function createSchema() {
  if (await database.schema.hasTable('users')) {
    return;
  }
  await database.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email');
    table.string('password');
  });
}

createSchema()
  .then(() => console.log('Schema User created!'))
  .catch((err) => {
    console.log('Schema User failed to create!', err);
    return database.destroy();
  });

export default User;
