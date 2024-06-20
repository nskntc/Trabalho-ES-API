const { Router } = require("express")

const sessionsRoutes = require("./sessions.routes")
const coordenacoesRoutes = require("./coordenacoes.routes")
const semestresRoutes = require("./semestres.routes")
const turmasRoutes = require("./turmas.routes")

const routes = Router()
routes.use("/sessions", sessionsRoutes)
routes.use("/coordenacoes", coordenacoesRoutes)
routes.use("/semestres", semestresRoutes)
routes.use("/turmas", turmasRoutes)

module.exports = routes