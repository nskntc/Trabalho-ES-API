exports.up = knex => knex.schema.createTable("coordenacoes", table => {
    table.increments("id").primary()
    table.integer("semestre_id").references("id").inTable("semestres").onDelete("CASCADE")
    table.text("tipo").notNullable()
    table.text("curso").notNullable()
    table.text("coordenador")
})

exports.down = knex => knex.schema.dropTable("coordenacoes")