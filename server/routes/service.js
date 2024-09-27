const express = require('express');
const router = express.Router();
const {
  addService,
  updateService,
  deleteService,
  getServicesByBarbershop,
  getServiceById
} = require('../controllers/ServiceController');

// Route pour ajouter un service
router.post('/addS', addService);

// Route pour modifier un service
router.put('/updateS/:id', updateService);

// Route pour supprimer un service
router.delete('/deleteS/:id', deleteService);

// Route pour afficher tous les services d'un barbershop
router.get('/Sbarbershop/:barbershopId', getServicesByBarbershop);
router.get('/getS/:id', getServiceById);  // Assurez-vous que cette route est définie
module.exports = router;
