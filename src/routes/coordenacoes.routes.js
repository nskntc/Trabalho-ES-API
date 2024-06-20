const { Router } = require("express")

const CoordenacoesController = require("../controllers/CoordenacoesController")

const coordenacoesRoutes = Router()
const coordenacoesController = new CoordenacoesController()

coordenacoesRoutes.get("/", coordenacoesController.index)
coordenacoesRoutes.put("/", coordenacoesController.update)

module.exports = coordenacoesRoutes