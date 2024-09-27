const Portfolio = require('../models/Portfolio');
const Barbershop = require('../models/Barbershop');

// Ajouter des images au portfolio d'un barbershop
exports.addImagesToPortfolio = async (req, res) => {
  try {
    console.log('Files received:', req.files);  // Ajouter cette ligne pour vérifier les fichiers reçus
    const { barbershopId } = req.params;
    const barbershop = await Barbershop.findById(barbershopId);

    if (!barbershop) {
      return res.status(404).json({ message: 'Barbershop not found' });
    }

    const portfolio = await Portfolio.findOne({ barbershop: barbershopId });

    if (!portfolio) {
      const newPortfolio = new Portfolio({
        images: req.files.map(file => file.filename),
        barbershop: barbershopId
      });
      await newPortfolio.save();
      return res.status(201).json(newPortfolio);
    } else {
      portfolio.images.push(...req.files.map(file => file.filename));
      await portfolio.save();
      return res.status(200).json(portfolio);
    }

  } catch (error) {
    console.error('Error:', error);  // Ajouter cette ligne pour capturer les erreurs
    res.status(500).json({ message: 'Error adding images to portfolio', error });
  }
};

// Récupérer le portfolio d'un barbershop
exports.getPortfolioByBarbershopId = async (req, res) => {
  try {
    const { barbershopId } = req.params;
    const portfolio = await Portfolio.findOne({ barbershop: barbershopId });

    if (!portfolio) {
      // Retourner une réponse avec un message indiquant qu'il n'y a pas encore de portfolio
      return res.status(200).json({ images: [], message: 'No portfolio yet' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio', error });
  }
};

// Supprimer une image du portfolio
exports.deleteImageFromPortfolio = async (req, res) => {
  try {
    const { barbershopId, imageId } = req.params;
    const portfolio = await Portfolio.findOne({ barbershop: barbershopId });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    portfolio.images = portfolio.images.filter(image => image !== imageId);
    await portfolio.save();

    res.status(200).json({ message: 'Image removed from portfolio' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing image from portfolio', error });
  }
};
