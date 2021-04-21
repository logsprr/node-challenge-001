import { Model } from 'objection';
import database from './index';

class Author extends Model {
  name!: string;
  picture!: string;
  static get tableName() {
    return 'authors';
  }
  $formatJson(json: any) {
    json = super.$formatJson(json);
    return json;
  }
}

async function createSchema() {
  if (await database.schema.hasTable('authors')) {
    return;
  }
  await database.schema.createTable('authors', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('picture');
  });
}

createSchema()
  .then(() => console.log('Schema Author created!'))
  .catch((err) => {
    console.log('Schema Author failed to create!', err);
    return database.destroy();
  });

export default Author;
