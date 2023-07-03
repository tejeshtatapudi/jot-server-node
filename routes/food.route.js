const express = require("express");
const foodController = require("../controllers/food.controller");

const router = express.Router();

router.post("/", foodController.createFood);
router.get("/", foodController.getAllFoods);
router.get("/:id", foodController.getFoodById);
router.put("/:id", foodController.updateFood);
router.delete("/:id", foodController.deleteFoodItem);

module.exports = router;
