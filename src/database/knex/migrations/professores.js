exports.up = knex => knex.schema.createTable("professores", table => {
    table.increments("id").primary()
    table.text("nome").notNullable()
})

exports.down = knex => knex.schema.dropTable("professores")