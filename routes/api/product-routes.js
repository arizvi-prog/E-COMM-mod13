const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  const products = await Product.findAll({
    include: Category
  })

  res.json(products);
});

// get one product
router.get('/:product_id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  const id = req.params.product_id;
  const product = await Product.findByPk(id, {
    include: [
      { model: Category },
      { model: Tag }
    ]
  });
  res.json(product);
});

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// update product
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedRows === 0) {
      // If no rows were updated, return a 404 error
      return res.status(404).json({ message: 'Product not found or no changes made' });
    }

    // If tagIds are provided, update the tags associated with the product
    if (req.body.tagIds && req.body.tagIds.length) {
      // Find all current product tags
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });

      // Create a list of new tag IDs
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Determine which tags to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Remove old tags and add new tags
      await ProductTag.destroy({ where: { id: productTagsToRemove } });
      await ProductTag.bulkCreate(newProductTags);
    }

    // Fetch the updated product to return
    const updatedProduct = await Product.findOne({
      where: { id: req.params.id },
      include: [{ model: Tag }]
    });

    return res.json(updatedProduct);

  } catch (error) {
    console.log('Product PUT route error:', error);
    res.status(400).json(error);
  }
});


router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  await Product.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json({
    message: 'product deleted'
  })

});

module.exports = router;