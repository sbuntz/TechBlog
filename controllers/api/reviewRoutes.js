const router = require('express').Router();
const { Location, Review } = require('../../models');
const withAuth = require('../../utils/auth');

// routes for '/reviews'

// get reviews based on id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.getByPk(req.params.id, {
      include: [{ model: Location }],
    });
    console.log('reviewData: ', reviewData)

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})

// create new review
router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete a review
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      return res.status(404).json({ message: 'No project found with this id!' });
    }

    res.status(200).json(reviewData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
