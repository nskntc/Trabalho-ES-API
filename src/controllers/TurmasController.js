const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class TurmasController {
    async create(request, response){
        const { materia, horario, capacidade, professor, salas } = request.body

        if(capacidade < 1) throw new AppError("A capacidade deve ser um número positivo!", 401)

        const professorIndisponivel = await knex("turmas").where({ horario, professor }).first()
        if(professorIndisponivel) throw new AppError("Professor indisponível", 401)

        const semestreAberto = await knex("semestres").where({ status: "aberto" }).first()
        if(!semestreAberto) throw new AppError("O semestre precisa estar aberto para a turma ser criada!")


        await knex("turmas").insert({
            materia,
            horario,
            capacidade,
            professor,
            semestre_id: semestreAberto.id
        })

        const turma = await knex("turmas").where({ materia,
            horario,
            capacidade,
            professor,
            semestre_id: semestreAberto.id 
        }).first()

        salas.map(async (sala) => {
            await knex('salas')
              .insert({ numero: sala.numero, horario: sala.horario, turma_id: turma.id })
        })

        return response.status(201).json()
    }
}

module.exports = TurmasController