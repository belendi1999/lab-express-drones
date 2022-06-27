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
const {id} = req.params
console.log(id)
Drone.findById(id)
.then((response) => {
  res.render('drones/update-form.hbs', response)
})
});

router.post('/drones/:id/edit', (req, res, next) => {
  const {id} = req.params
  console.log(req.body.name)

  Drone.findByIdAndUpdate(id, {"name": req.body.name}, function(err, result){

    if(err){
        res.send(err)
    }
    else{
      Drone.find()
      .then (response => {
        console.log(response)
        res.render("drones/list", { drone: response})
        
      })
      .catch((err) => {
        next(err)
      });
    }

})

  
});

router.post('drone-delete/:id', (req, res, next) => {

    Drone
      .deleteOne({id:req.params.id})
      .then(response =>{
        console.log("Eliminado correctamente")
        res.redirect("/drones")
      })
      .catch(e=>console.log(e))
  });


module.exports = router;
