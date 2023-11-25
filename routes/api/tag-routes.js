const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        as: 'products',
        through: ProductTag
      }
    ]
  })
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        as: 'products',
        through: ProductTag
      }
    ]
  })
    .then((tags) => {
      if (!tags) {
        res.status(404).json({ message: 'No tags found with this id' });
        return;
      }
      res.status(200).json(tags);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((tag) => {
      if (tag[0] == 0) {
        res.status(404).json({ message: 'No rows affected!' });
        return;
      }
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((tag) => {
      if (tag == 0) {
        res.status(404).json({ message: 'No rows deleted!' });
        return;
      }
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
