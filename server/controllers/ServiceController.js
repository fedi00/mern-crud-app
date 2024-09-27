const Service = require('../models/Service');

// Ajouter un service
const addService = async (req, res) => {
  const { name, description, price, barbershopId } = req.body;

  try {
    const newService = new Service({
      name,
      description,
      price,
      barbershop: barbershopId
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du service' });
  }
};

// Modifier un service
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(id, {
      name,
      description,
      price
    }, { new: true });

    if (!updatedService) {
      return res.status(404).json({ error: 'Service non trouvé' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la modification du service' });
  }
};

// Supprimer un service
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ error: 'Service non trouvé' });
    }

    res.status(200).json({ message: 'Service supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du service' });
  }
};

// Afficher tous les services pour un barbershop spécifique
const getServicesByBarbershop = async (req, res) => {
  const { barbershopId } = req.params;

  try {
    const services = await Service.find({ barbershop: barbershopId });

    if (!services) {
      return res.status(404).json({ error: 'Aucun service trouvé pour ce barbershop' });
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des services' });
  }
};
const getServiceById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const service = await Service.findById(id);
  
      if (!service) {
        return res.status(404).json({ error: 'Service non trouvé' });
      }
  
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération du service' });
    }
  };
  
  module.exports = {
    addService,
    updateService,
    deleteService,
    getServicesByBarbershop,
    getServiceById,  // Ajoutez la méthode ici
  };