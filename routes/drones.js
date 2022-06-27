const express = require('express');
const router = express.Router();
const Drone = require("../models/Drone.model")

router.get('/drones', (req, res, next) => {
  Drone.find()
  .then (response => {
    console.log(response)
    res.render("drones/list", { drone: response})
    
  })
  .catch((err) => {
    next(err)
  });

});
router.get('/drones/create', (req, res, next) => res.render('drones/create-form.hbs'));
router.post('/drones/create', (req, res, next) => {
  console.log(req.body);
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    /*.then(droneFromDB => console.log(`New drone created: ${droneFromDB.name}.` */
    .then(() => res.redirect('/drones'))
    .catch(error => res.redirect('/drones/create'));
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
