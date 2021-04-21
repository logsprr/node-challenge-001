import { Model } from 'objection';
import Knex from 'knex';
import configKnex from '../database';

const knex = Knex(configKnex);

Model.knex(knex);

export default knex;
