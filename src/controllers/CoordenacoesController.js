const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class CoordenadoresController {
    async index(request, response){
        const coordenacoes = await knex("coordenacoes").orderBy("curso")

        return response.status(201).json({ coordenacoes })
    }

    async update(request, response){
        const tabela = request.body

        const coordenadoresSelecionados = new Set();
        for (const item of tabela) {
            if (coordenadoresSelecionados.has(item.coordenador)) {
                throw new AppError(`O coordenador '${item.coordenador}' já está selecionado para outra coordenação.`, 400);
            }
            coordenadoresSelecionados.add(item.coordenador);
        }

        tabela.map(async (item) => {
            await knex('coordenacoes')
              .where({ tipo: item.tipo, curso: item.curso })
              .update({ coordenador: item.coordenador });
        });

        return response.status(204).json()
    }
}

module.exports = CoordenadoresController