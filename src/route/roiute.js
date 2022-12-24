router = require("express").Router()
const  cardController  = require("../controller/cardController")
const costomersController = require("../controller/costomerController")

//=================== costomer opration ========================================

router.post("/Profile", costomersController.createCostomer)
router.get("/Profile", costomersController.getCostomer)
router.delete("/Profile", costomersController.deleteCostomer)

//===================== catd operatrion ===================================
router.post("/card", cardController.createCard)
router.get("/card", cardController.ListOfcard)

module.exports = router