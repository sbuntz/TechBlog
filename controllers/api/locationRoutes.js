const router = require('express').Router();
const { Location } = require('../../models');
const withAuth = require('../../utils/auth');

// routes for '/locations'

// get locations based on the user selecting a name
router.get('/:name', withAuth, async (req, res) => {
  try {
    // Get location by name
    const locationData = await Location.findAll({
      where: {
        location_name: req.params.name,
      }
      });
    console.log('locationData: ', locationData)

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})


router.post('/', withAuth, async (req, res) => {
  try {
    const newLocation = await Location.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newLocation);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!locationData) {
      return res.status(404).json({ message: 'No project found with this id!' });
    }

    res.status(200).json(locationData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
