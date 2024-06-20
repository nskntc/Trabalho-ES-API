const { Router } = require("express")

const TurmasController = require("../controllers/TurmasController")

const turmasRoutes = Router()
const turmasController = new TurmasController()

turmasRoutes.post("/", turmasController.create)

module.exports = turmasRoutes