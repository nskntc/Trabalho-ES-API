const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TurmasController {
  async create(request, response) {
    const { materia, horario, capacidade, professor, salas } = request.body;

    if (!materia || !horario || !capacidade || !professor || !salas)
      throw new AppError("Informações faltando, impossível criar turma!", 401);

    if (capacidade < 1)
      throw new AppError("A capacidade deve ser um número positivo!", 401);

    const professorIndisponivel = await knex("turmas")
      .where({ horario, professor })
      .first();
    if (professorIndisponivel)
      throw new AppError("Professor indisponível", 401);

    const semestreAberto = await knex("semestres")
      .where({ status: "aberto" })
      .first();
    if (!semestreAberto)
      throw new AppError(
        "O semestre precisa estar aberto para a turma ser criada!"
      );

    let count = 0

    for (const sala of salas) {
      if(await knex("salas").where({ numero: sala.numero, horario: sala.horario }) !== undefined) count++
    }

    if(count) throw new AppError(
      "As salas selecionadas estão indisponíveis para este horário, verifique a disponibilidade."
    );

    await knex("turmas").insert({
      materia,
      horario,
      capacidade,
      professor,
      semestre_id: semestreAberto.id,
    });

    const turma = await knex("turmas")
      .where({
        materia,
        horario,
        capacidade,
        professor,
        semestre_id: semestreAberto.id,
      })
      .first();

    salas.map(async (sala) => {
      await knex("salas").insert({
        numero: sala.numero,
        horario: sala.horario,
        turma_id: turma.id,
      });
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { id } = request.params;
    const { materia, horario, capacidade, professor, salas } = request.body;

    const turma = await knex("turmas").where({ id }).first();
    if (!turma) throw new AppError("Turma não encontrada!", 404);

    const salasDaTurma = await knex("salas").where({ turma_id: turma.id });

    if (!materia || !horario || !capacidade || !professor || !salas)
      throw new AppError("Informações faltando, impossível criar turma!", 401);

    if (capacidade < 1)
      throw new AppError("A capacidade deve ser um número positivo!", 401);

    const professorIndisponivel = await knex("turmas")
      .where({ horario, professor })
      .first();
    if (professorIndisponivel)
      throw new AppError("Professor indisponível", 401);

    const semestreAberto = await knex("semestres")
      .where({ status: "aberto" })
      .first();
    if (!semestreAberto)
      throw new AppError(
        "O semestre precisa estar aberto para a turma ser criada!"
      );
      
    await knex("salas").where({ turma_id: turma.id }).delete();
    let count = 0

    for (const sala of salas) {
      if(await knex("salas").where({ numero: sala.numero, horario: sala.horario }) !== undefined) count++
    }

    if(count) throw new AppError(
      "As salas selecionadas estão indisponíveis para este horário, verifique a disponibilidade."
    );

    const updateTurma = {
      materia,
      horario,
      capacidade,
      professor,
    };
    await knex("turmas").where({ id }).update(updateTurma);

    salas.map(async (sala) => {
      await knex("salas").insert({
        numero: sala.numero,
        horario: sala.horario,
        turma_id: turma.id,
      });
    });

    return response.status(201).json();
  }

  async read(request, response) {
    const rows = await knex("turmas").select("*");

    console.log(rows);
    response.json(rows);
  }
}

module.exports = TurmasController;