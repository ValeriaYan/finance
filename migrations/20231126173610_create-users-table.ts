import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (builder) => {
    builder.increments('id').primary().notNullable().unique();
    builder.string('email').notNullable().unique();
    builder.string('name');
    builder.string('token').nullable().unique();
    builder.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
