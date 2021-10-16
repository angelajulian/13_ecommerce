const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(tags);
  } catch (error) {
    res.status(507).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: "No tag with this ID" });
    }
  } catch (error) {
    res.status(507).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(tag);
  } catch (error) {
    res.status(507).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: "No tag with this ID" });
    }
  } catch (error) {
    res.status(507).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: "No tag with this ID" });
    }
  } catch (error) {
    res.status(507).json(error);
  }
});

module.exports = router;
