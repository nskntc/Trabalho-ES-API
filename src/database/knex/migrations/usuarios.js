exports.up = knex => knex.schema.createTable("usuarios", table => {
    table.increments("id").primary()
    table.text("email").notNullable()
    table.text("senha").notNullable()
    table.text("perfil")
})

exports.down = knex => knex.schema.dropTable("usuarios")