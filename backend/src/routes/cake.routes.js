const express = require("express");
const router = express.Router();

const {getAllCakes, createCake, updateCake, deleteCake} = require("../controllers/cake.controller");

router.get("/", getAllCakes);

router.post("/", createCake);

router.put("/:id", updateCake);

router.delete("/:id", deleteCake);

module.exports = router;