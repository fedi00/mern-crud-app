const Barbershop = require('../models/Barbershop');
const User = require('../models/User');

// Créer un nouveau barbershop
exports.createBarbershop = async (req, res) => {
  try {
    console.log('User from request:', req.user); // Log the req.user object
    const { name, address, phone, description } = req.body;
    const ownerId = req.user.id;  // Récupérer l'ID du propriétaire à partir du token JWT
    const image = req.file ? req.file.path : null; // Chemin de l'image uploadée

    // Vérifiez si l'utilisateur propriétaire existe
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    const newBarbershop = new Barbershop({
      name,
      address,
      phone,
      description,
      image, // Ajoutez l'image au nouveau Barbershop
      owner: ownerId
    });

    await newBarbershop.save();

    res.status(201).json(newBarbershop);
  } catch (error) {
    console.error('Error creating barbershop:', error);  // Log l'erreur dans la console
    res.status(500).json({ message: 'Error creating barbershop', error: error.message });
  }
};

// Obtenir tous les barbershops
exports.getBarbershops = async (req, res) => {
  try {
    const barbershops = await Barbershop.find().populate('owner', 'name email');
    res.status(200).json(barbershops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching barbershops', error });
  }
};

// Obtenir un barbershop par ID
exports.getBarbershopById = async (req, res) => {
  try {
    const barbershop = await Barbershop.findById(req.params.id).populate('owner', 'name email');
    if (!barbershop) {
      return res.status(404).json({ message: 'Barbershop not found' });
    }
    res.status(200).json(barbershop);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching barbershop', error });
  }
};

// Mettre à jour un barbershop
exports.updateBarbershop = async (req, res) => {
  try {
    console.log("Form data received:", req.body);
    const { name, address, phone, description } = req.body;
    const image = req.file ? req.file.path : null; // Chemin de l'image uploadée

    const updateData = { name, address, phone, description };
    if (image) {
      updateData.image = image; // Mettre à jour l'image si elle est fournie
    }

    const barbershop = await Barbershop.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!barbershop) {
      return res.status(404).json({ message: 'Barbershop not found' });
    }

    res.status(200).json(barbershop);
  } catch (error) {
    res.status(500).json({ message: 'Error updating barbershop', error });
  }
};

// Supprimer un barbershop
exports.deleteBarbershop = async (req, res) => {
  try {
    const barbershop = await Barbershop.findByIdAndDelete(req.params.id);

    if (!barbershop) {
      return res.status(404).json({ message: 'Barbershop not found' });
    }

    res.status(200).json({ message: 'Barbershop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting barbershop', error });
  }
  
};
exports.getUserBarbershops = async (req, res) => {
  try {
    const ownerId = req.user.id;  // Récupérer l'ID du propriétaire à partir du token JWT

    const barbershops = await Barbershop.find({ owner: ownerId }).populate('owner', 'name email');
    res.status(200).json(barbershops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user barbershops', error });
  }
};
// BarbershopController.js
exports.getBarbershops = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const barbershops = await Barbershop.find(query).populate('owner', 'name email');
    res.status(200).json(barbershops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching barbershops', error });
  }
};
