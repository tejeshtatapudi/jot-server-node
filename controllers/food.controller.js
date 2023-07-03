const Food = require("../models/food.model");

const MulterUpload = require("../utils/multerUpload");

exports.createFood = async (req, res) => {
  try {
    const upload = new MulterUpload("public/food","jot-food").upload();
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { name, ingredients, price, options, category } = req.body;


      let parsedOptions = JSON.parse(options)


      if (
        !name ||
        !ingredients ||
        !price ||
        !options ||
        !category
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const image = req.file ? req.file.filename : 'default-food.png';

      const foodItem = new Food({
        name,
        image:`/food/${image}`,
        ingredients,
        price,
        options:parsedOptions,
        category,
      });

      const savedFoodItem = await foodItem.save();
      res.status(201).json({
        message: "Food item saved successfully",
        result: savedFoodItem,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new food " });
  }
};

exports.getAllFoods = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalItems = await Food.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const foodItems = await Food.find({}).skip(skip).limit(limit);

    res.json({
      totalPages,
      currentPage: page,
      result: foodItems,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve food items" });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing required parameter: id" });
    }

    const foodItem = await Food.findById(id);
    if (!foodItem) {
      return res.status(404).json({ error: "Food not found" });
    }

    res.json({
      result: foodItem,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food " });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing required parameter: id" });
    }

    const { name, image, ingredients, price, options, category } =
      req.body;
    if (alt, 
      !name ||
      !image ||
      !ingredients ||
      !price ||
      !options ||
      !category
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedFoodItem = await Food.findByIdAndUpdate(
      id,
      { name, image, ingredients, price, options, category },
      { new: true }
    );
    if (!updatedFoodItem) {
      return res.status(404).json({ error: "Food  not found" });
    }

    res.json({
      result: updatedFoodItem,
      message: "Food updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update food " });
  }
};

exports.deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing required parameter: id" });
    }

    const deletedFoodItem = await Food.findByIdAndRemove(id);
    if (!deletedFoodItem) {
      return res.status(404).json({ error: "Food  not found" });
    }

    res.json({
      result: deletedFoodItem,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete food " });
  }
};
