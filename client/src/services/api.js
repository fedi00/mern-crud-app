import axios from 'axios';

// Créez une instance Axios avec la baseURL de votre backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL pour le backend
});

// Intercepteur pour inclure le token JWT dans les en-têtes des requêtes

// Intercepteur pour inclure le token JWT dans les en-têtes des requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token dans l\'intercepteur:', token);  // Vérifiez que le token est bien récupéré
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);





// Service pour s'inscrire
export const registerUser = (userData) => {
  return api.post('auth/register', userData);
};

// Service pour se connecter
export const loginUser = async (userData) => {
  try {
    const response = await api.post('auth/login', userData);
    localStorage.setItem('token', response.data.token);
    return response;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};


// Service pour créer un nouveau barbershop
export const createBarbershop = (barbershopData) => {
  return api.post('barbershops/addB', barbershopData);
};

// Service pour obtenir tous les barbershops
export const getBarbershops = () => {
  return api.get('barbershops/getB');
};

// Service pour obtenir un barbershop par ID
export const getBarbershopById = (id) => {
  return api.get(`barbershops/getBar/${id}`);
};

// Service pour mettre à jour un barbershop
export const updateBarbershop = (id, barbershopData) => {
  return api.put(`barbershops/updateB/${id}`, barbershopData);
};

// Service pour supprimer un barbershop
export const deleteBarbershop = (id) => {
  return api.delete(`barbershops/deleteB/${id}`);
};
export const getBarbershopsByOwner = () => {
  return api.get('barbershops/myBarbershops');
};
export const addImagesToPortfolio = async (barbershopId, images) => {
  const formData = new FormData();
  images.forEach(image => formData.append('images', image));

  try {
    const response = await api.post(`portfolios/portfoliosAdd/${barbershopId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};
// Récupérer le portfolio d'un barbershop
export const getPortfolioByBarbershopId = async (barbershopId) => {
  const response = await api.get(`portfolios/portfoliosGet/${barbershopId}`);
  return response.data;
};

// Supprimer une image du portfolio
export const deleteImageFromPortfolio = async (barbershopId, imageId) => {
  const response = await api.delete(`portfolios/portfoliosDel/${barbershopId}/${imageId}`);
  return response.data;
};
// Nouvelle fonction pour obtenir les réservations d'un barbershop
export const getBarbershopReservations = async (barbershopId) => {
  try {
    const response = await api.get(`reservations/barbershop/${barbershopId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    throw error;
  }
};

export const updateReservationStatus = async (reservationId, status) => {
  try {
    const response = await api.patch(`reservations/status/${reservationId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
    throw error;
  }
};
export const addRating = async (barbershopId, rating) => {
  try {
    const response = await api.post(`ratings/addrating/${barbershopId}`, { rating });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la note:', error);
    throw error;
  }
};
export const getRatingsByBarbershopId = async (barbershopId) => {
  try {
    const response = await api.get(`ratings/getrating/${barbershopId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des notes:', error);
    throw error;
  }
};
export default api; // Exportation par défaut
