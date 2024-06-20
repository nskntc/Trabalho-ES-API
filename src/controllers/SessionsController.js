const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class SessiosController {
    async create(request, response){
        const { email, senha, perfil } = request.body

        const user = await knex("usuarios").where({ email }).first()
        if(!user) throw new AppError("Email e/ou senha e/ou perfil incorretos!", 401)

        if(senha !== user.senha) throw new AppError("Email e/ou senha e/ou perfil incorretos!", 401)

        if(perfil !== user.perfil) throw new AppError("Email e/ou senha e/ou perfil incorretos!", 401)

        return response.status(201).json({ user })
    }
}

module.exports = SessiosController