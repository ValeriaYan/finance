import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('operations', (builder) => {
    builder.increments('id').primary().notNullable();
    builder.string('description').notNullable();
    builder.integer('amount').notNullable();
    builder.integer('category_id').references('categories.id').notNullable();
    builder.integer('bill_id').references('bills.id').notNullable();
    builder.date('date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('operations');
}
