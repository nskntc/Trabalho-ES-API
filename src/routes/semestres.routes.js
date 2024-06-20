const { Router } = require("express")

const SemestresController = require("../controllers/SemestresController")

const semestresRoutes = Router()
const semestresController = new SemestresController()

semestresRoutes.put("/", semestresController.update)

module.exports = semestresRoutes