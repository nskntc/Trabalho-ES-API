exports.up = knex => knex.schema.createTable("semestres", table => {
    table.increments("id").primary()
    table.text("numero").notNullable()
    table.text("status").default("fechado")
})

exports.down = knex => knex.schema.dropTable("semestres")