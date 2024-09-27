    const express = require('express');
    const router = express.Router();
    const barbershopController = require('../controllers/BarbershopController');
    const auth = require('../middleware/auth');
    const upload = require('../middleware/upload')

    router.post('/addB',auth,upload.single('image'), barbershopController.createBarbershop);

    // Route pour obtenir tous les barbershops
    router.get('/getB', barbershopController.getBarbershops);

    // Route pour obtenir un barbershop par ID
    router.get('/getBar/:id', barbershopController.getBarbershopById);

    // Route pour mettre à jour un barbershop
    router.put('/updateB/:id', upload.single('image'),barbershopController.updateBarbershop);

    // Route pour supprimer un barbershop
    router.delete('/deleteB/:id', barbershopController.deleteBarbershop);
    // Route pour obtenir les barbershops de l'utilisateur connecté
    router.get('/myBarbershops', auth, barbershopController.getUserBarbershops);
// routes/barbershops.js
router.get('/getB', barbershopController.getBarbershops);

    module.exports = router;
