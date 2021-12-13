const sequelize = require('../config/connection');
const { User, Location, Review } = require('../models');

const userData = require('./userData.json');
const locationData = require('./locationData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


 
try {
  for (const location of locationData) {
    await Location.create({
      ...location,
    });
  }
  
  for (const review of reviewData) {
    await Review.create({
      ...review,
    });
  }
  
} catch (error) {
  console.log(error)
  
}



  process.exit(0);
};

seedDatabase();
