const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (error) {
    res.status(507).json(error);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });
    res.json(category);
  } catch (err) {
    res.status(507).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newCategory);
  } catch (error) {
    res.status(507).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "No category with this ID" });
    }
  } catch (err) {
    res.status(507).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy(req.body, {
      where: { id: req.params.id },
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "No category with this ID" });
    }
  } catch (err) {
    res.status(507).json(err);
  }
});

module.exports = router;
