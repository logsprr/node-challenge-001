import { Model } from 'objection';
import Author from './Author';
import database from './index';

class Article extends Model {
  category!: string;
  title!: string;
  summary!: string;
  firstParagraph!: string;
  body!: string;
  author_id!: Author;

  static get tableName() {
    return 'articles';
  }
  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: Author,
      join: {
        from: 'articles.author_id',
        to: 'authors.id',
      },
    },
  };
  $formatJson(json: any) {
    json = super.$formatJson(json);
    if (json.author) {
      json.author = json.author.replace('(', '').replace(')', '').split(/,/g);
      json.author = {
        name: json.author[1],
        picture: json.author[2],
      };
      return json;
    } else {
      return json;
    }
  }
}

async function createSchema() {
  if (await database.schema.hasTable('articles')) {
    return;
  }
  await database.schema.createTable('articles', (table) => {
    table.increments('id').primary();
    table.string('category');
    table.string('title');
    table.string('summary');
    table.string('firstParagraph');
    table.string('body');
    table.bigInteger('author_id');
  });
}

createSchema()
  .then(() => console.log('Schema Article created!'))
  .catch((err) => {
    console.log('Schema Article failed to create!', err);
    return database.destroy();
  });

export default Article;
