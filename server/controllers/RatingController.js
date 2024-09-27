// controllers/ratingController.js
const Rating = require('../models/Rating');

// Ajouter un rating
exports.addRating = async (req, res) => {
    try {
        const userId = req.user.id;  // L'ID utilisateur extrait du token JWT
        const { rating } = req.body;
        const barbershopId = req.params.barbershopId;

        // Vérifier si l'utilisateur a déjà noté ce barbershop
        const existingRating = await Rating.findOne({ userId, barbershopId });
        if (existingRating) {
            // Mettre à jour la note existante
            existingRating.rating = rating;
            await existingRating.save();
            return res.status(200).json(existingRating);
        }

        // Sinon, ajouter une nouvelle note
        const newRating = new Rating({ rating, userId, barbershopId });
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir les ratings d'un barbershop
exports.getBarbershopRatings = async (req, res) => {
    try {
        const barbershopId = req.params.barbershopId;
        const ratings = await Rating.find({ barbershopId }).populate('userId', 'name');  // Optionnel : populating du nom de l'utilisateur
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
// Obtenir la moyenne des ratings d'un barbershop
exports.getAverageRating = async (req, res) => {
    try {
      const barbershopId = req.params.barbershopId;
      const ratings = await Rating.find({ barbershopId });
  
      if (ratings.length === 0) {
        return res.status(200).json({ averageRating: 0 });
      }
  
      const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
      const averageRating = total / ratings.length;
  
      res.status(200).json({ averageRating });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  };
  