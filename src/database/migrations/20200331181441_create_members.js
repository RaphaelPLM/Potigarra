exports.up = function(knex) {
	return knex.schema.createTable('members', (table) => {
		table.increments();
        
        table.string('username').unique().notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('cpf', ).notNullable();
        table.string('rg').notNullable();
        table.string('class', 3).notNullable();
        table.string('gender').notNullable();
        table.string('phone_number').notNullable();

        table.date('birthdate').notNullable();
        
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
	});
};

exports.down = function(knex) {
    return knex.schema.dropTable('members')
};
