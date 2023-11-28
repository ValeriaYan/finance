import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users-bills', (builder) => {
    builder.integer('bill_id').references('bills.id').notNullable();
    builder.integer('user_id').references('users.id').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users-bills');
}
