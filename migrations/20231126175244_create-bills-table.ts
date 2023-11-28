import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bills', (builder) => {
    builder.increments('id').primary().notNullable().unique();
    builder.string('name').notNullable();
    builder.string('description');
    builder.integer('amount').notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bills');
}
