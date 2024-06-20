const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class SemestresController {
    async update(request, response){
        const { numero } = request.body

        const semestre = await knex("semestres").where({ numero }).first()
        if(!semestre) throw new AppError("Semestre não disponível!", 401)

        const semestreJaAberto = await knex("semestres").where({ numero,  status: "aberto" }).first()
        if(semestreJaAberto) throw new AppError("Este semestre já está aberto!", 400)

        const semestreAberto = await knex("semestres").where({ status: "aberto" }).first()
        if(semestreAberto) throw new AppError("Já existe um semestre aberto!", 400)

        const count = await knex('coordenacoes')
        .where({ semestre_id: semestre.id })
        .whereNotNull('coordenador')
        .count('* as count');

        if(!count) throw new AppError("Todos os campos de coordenador devem estar preeenchidos para abrir um semestre!", 400)

        await knex("semestres").where({ numero }).update({ status: "aberto" })

        return response.status(200).json()
    }
}

module.exports = SemestresController

