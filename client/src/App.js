import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/admin';
import Client from './pages/client';
import AddBarbershop from './pages/addBarbershop';
import EditBarbershop from './pages/editBarbershop';
import BarbershopDetails from './pages/BarbershopDetails';
import BarbershopPortfolios from './pages/BarbershopPortfolios';
import AdminReservations from './pages/AdminReservations';
import AddRating from './pages/AddRating';
import AdminRatings from './pages/AdminRatings';
import BarbershopProfile from './pages/BarbershopProfile';
import ClientPortfoglio from './pages/ClientPortfoglio';
import ClientReservation from './pages/ClientReservation';
import Reservation from './pages/Reservation';
import AdminServices from './pages/AdminServices';
import AddService from './pages/AddService';
import EditService from './pages/EditService';
import ClientServices from './pages/ClientServices';
import VoiceRecognition from './pages/Voice';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/client" element={<Client />} />
        <Route path="/addBarbershop" element={<AddBarbershop />} />
        <Route path="/editBarbershop/:id" element={<EditBarbershop />} />
        <Route path="/barbershopDetails/:id" element={<BarbershopDetails />} />
        <Route path="/portfolios/:id" element={<BarbershopPortfolios />} />
        <Route path="/reservations/:id" element={<AdminReservations />} />
        <Route path="/ratings/:id" element={<AddRating />} />
        <Route path="/getratings/:id" element={<AdminRatings />} />
        <Route path="/profile/:id" element={<BarbershopProfile />} />
        <Route path="/clientportfoglio/:id" element={<ClientPortfoglio />} />
        <Route path="/Creservations" element={<ClientReservation />} />
        <Route path="/Breservations/:id" element={<Reservation />} />
        <Route path="/Aservices/:id" element={<AdminServices />} />
        <Route path="/AddServices/:id" element={<AddService />} />
        <Route path="/editServices/:id" element={<EditService  />} />
        <Route path="/Cservices/:id" element={<ClientServices />} />
        <Route path="/voice" element={<VoiceRecognition />} />


      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
