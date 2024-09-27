const Reservation = require('../models/Reservation');
const Barbershop = require('../models/Barbershop');
const moment = require('moment');

// Créer une réservation avec l'ID utilisateur extrait du token
const createReservation = async (req, res) => {
    const { barbershopId, reservationTime } = req.body;
    const userId = req.user.id;
    console.log('User ID from token:', userId);
    try {
      console.log('Barbershop ID:', barbershopId); // Vérifier l'ID du barbershop
      console.log('Reservation Time:', reservationTime); // Vérifier l'heure de la réservation
      console.log('User ID from token:', userId); // Vérifier l'ID de l'utilisateur
  
      // Vérifier si la date de réservation est dans le passé
      if (moment(reservationTime).isBefore(moment())) {
        return res.status(400).json({ error: "La date de réservation ne peut pas être dans le passé." });
      }
  
      // Vérifier si le barbershop existe
      const barbershop = await Barbershop.findById(barbershopId);
      if (!barbershop) {
        return res.status(404).json({ error: "Barbershop non trouvé" });
      }
  
      // Créer et enregistrer la réservation
      const newReservation = new Reservation({
        user: userId,
        barbershop: barbershopId,
        reservationTime
      });
      await newReservation.save();
  
      res.status(201).json({ message: 'Réservation effectuée avec succès', reservation: newReservation });
    } catch (error) {
      console.error('Error during reservation creation:', error);  // Log complet des erreurs
      res.status(500).json({ error: "Erreur du serveur" });
    }
  };
  

// Obtenir les réservations de l'utilisateur authentifié
const getUserReservations = async (req, res) => {
  try {
    console.log('User ID:', req.user && req.user.id); // Utilisez req.user.id ici
    const reservations = await Reservation.find({ user: req.user.id }).populate('barbershop');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des réservations" });
  }
};


// Obtenir les réservations pour un barbershop spécifique
const getBarbershopReservations = async (req, res) => {
  const { barbershopId } = req.params;
  try {
    const reservations = await Reservation.find({ barbershop: barbershopId }).populate('user');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des réservations" });
  }
};



const updateReservationStatus = async (req, res) => {
    const { reservationId } = req.params;
    const { status } = req.body;
  
    try {
      const validStatuses = ['En cours', 'Acceptée', 'Supprimée', 'Non traitée'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Statut invalide." });
      }
  
      const updatedReservation = await Reservation.findByIdAndUpdate(
        reservationId,
        { status },
        { new: true }
      );
  
      if (!updatedReservation) {
        return res.status(404).json({ error: "Réservation non trouvée." });
      }
  
      res.status(200).json({ message: 'Statut de la réservation mis à jour avec succès', reservation: updatedReservation });
    } catch (error) {
      res.status(500).json({ error: "Erreur du serveur" });
    }
  };
  const getBarbershopAvailability = async (req, res) => {
    const { barbershopId } = req.params;
    const { date } = req.query;  // Récupérer la date des paramètres de requête
  
    try {
      // Utiliser la date fournie ou la date actuelle
      const selectedDate = date ? moment(date).startOf('day') : moment().startOf('day');
  
      const reservations = await Reservation.find({
        barbershop: barbershopId,
        reservationTime: {
          $gte: selectedDate.toDate(),
          $lt: moment(selectedDate).add(1, 'day').toDate(),
        },
      }).select('reservationTime');
  
      const reservedTimes = reservations.map(res =>
        moment(res.reservationTime).format('YYYY-MM-DDTHH:mm:ssZ')
      );
  
      const slots = [];
      const startTime = moment(selectedDate).set({ hour: 10, minute: 0 });
      const endTime = moment(selectedDate).set({ hour: 20, minute: 0 });
  
      for (let currentTime = moment(startTime); currentTime <= endTime; currentTime.add(30, 'minutes')) {
        const slotTime = currentTime.format('YYYY-MM-DDTHH:mm:ssZ');
        slots.push({ time: slotTime, available: !reservedTimes.includes(slotTime) });
      }
  
      res.status(200).json(slots);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des créneaux horaires" });
    }
  };
  
  
 // Supprimer une réservation
const deleteReservation = async (req, res) => {
  const { reservationId } = req.params;
  
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
    
    if (!deletedReservation) {
      return res.status(404).json({ error: "Réservation non trouvée." });
    }
    
    res.status(200).json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur" });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  getBarbershopReservations,
  getBarbershopAvailability,
  updateReservationStatus,
  deleteReservation // Ajoutez cette ligne
};
