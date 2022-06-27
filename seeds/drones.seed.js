const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

  
  const Drone = require("../models/Drone.model");

  // insertarla en la BD
  const mongoose = require("mongoose");

  const MONGO_URI = process.env.MONGODB_URI 

  mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log("conectado")

  })
  .catch((err) => {
    console.log("no funciona")
  })

Drone.create(drones)
.then((dronesFromDB) => {
    console.log(`create ${dronesFromDB.length} DRONES` )
    mongoose.connection.close()
})
.catch((err) => {
    console.log(err)
})
  

