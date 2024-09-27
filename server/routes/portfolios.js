const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/PortfolioController');
const upload = require('../middleware/upload');

// Ajouter des images au portfolio d'un barbershop
router.post('/portfoliosAdd/:barbershopId', upload.array('images', 10), portfolioController.addImagesToPortfolio);

// Récupérer le portfolio d'un barbershop
router.get('/portfoliosGet/:barbershopId', portfolioController.getPortfolioByBarbershopId);

// Supprimer une image du portfolio
router.delete('/portfoliosDel/:barbershopId/:imageId', portfolioController.deleteImageFromPortfolio);

module.exports = router;
