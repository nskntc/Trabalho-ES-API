exports.up = knex => knex.schema.createTable("turmas", table => {
    table.increments("id").primary()
    table.integer("semestre_id").references("id").inTable("semestres").onDelete("CASCADE")
    table.text("materia")
    table.text("horario")
    table.integer("capacidade")
    table.text("professor")
})

exports.down = knex => knex.schema.dropTable("turmas")