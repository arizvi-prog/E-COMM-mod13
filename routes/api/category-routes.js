const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll({
      include: Product
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'An error occurred while fetching categories' });
  }
});

router.get('/:category_id', async (req, res) => {
  try {
    const id = req.params.category_id;
    const category = await Category.findByPk(id, {
      include: Product
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'An error occurred while fetching the category' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Validate input
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // create a new category
    const newCategory = await Category.create({ category_name });
    res.status(201).json({
      message: "Category creation success!",
      category: newCategory
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'An error occurred while creating the category' });
  }
});

router.put('/:category_id', async (req, res) => {
  try {
    // Validate input
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Update the category by its `id` value
    const [updatedRows] = await Category.update(req.body, {
      where: {
        id: req.params.category_id
      }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Category not found or no changes made' });
    }

    // Fetch the updated category to return
    const updatedCategory = await Category.findOne({
      where: { id: req.params.category_id }
    });

    res.json({
      message: 'Category updated!',
      category: updatedCategory
    });

  } catch (error) {
    console.error('Category PUT route error:', error);
    res.status(500).json({ error: 'An error occurred while updating the category' });
  }
});

router.delete('/:category_id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const rowsDeleted = await Category.destroy({
      where: {
        id: req.params.category_id
      }
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({
      message: "Category deletion success!"
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'An error occurred while deleting the category' });
  }
});

module.exports = router;
