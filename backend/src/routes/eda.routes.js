const router = require("express").Router();
const eda = require("../controllers/eda.controller");

router.post("/", eda.createEDA);
router.put("/:id", eda.updateEDA);
router.post("/:id/submit", eda.submitEDA);
router.get("/:id", eda.getEDA);
router.post("/:id/containers", edaController.saveContainers);
module.exports = router;
