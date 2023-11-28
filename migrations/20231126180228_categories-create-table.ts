import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('categories', (builder) => {
    builder.increments('id').primary().notNullable().unique();
    builder.string('name').notNullable();
    builder.string('description');
    builder.integer('user_id').references('users.id').notNullable();
    builder.string('type').checkIn(['outcome', 'income']).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('categories');
}
