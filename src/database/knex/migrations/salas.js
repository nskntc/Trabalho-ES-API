exports.up = knex => knex.schema.createTable("salas", table => {
    table.increments("id").primary()
    table.text("turma_id").references("id").inTable("turmas").onDelete("CASCADE")
    table.text("numero").notNullable()
    table.text("horario").notNullable()
})

exports.down = knex => knex.schema.dropTable("salas")