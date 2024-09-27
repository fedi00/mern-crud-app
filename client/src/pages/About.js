import React from 'react';
import './AboutUs.css'; // Make sure to create and style this CSS file
import Barber from '../images/barber2.jpg'; // Ensure the path is correct

const About = () => {
  return (
    <main className="about-us-container">
    <section className="about-us">
        <h1>About Us</h1>
        <img src={Barber} alt="Barbershop" className="about-us-image" />
        <p>Welcome to StyleBook, your one-stop platform for booking the best barbershop services in Tunis. Our mission is to streamline the booking process for customers while enhancing the visibility and efficiency of local barbershops.</p>
        
        <h2>Our Mission</h2>
        <p>StyleBook aims to make it easier and faster for users to find and book appointments with local barbershops. By providing a platform for barbershops to showcase their services, prices, and reviews, we help them attract more customers and improve their business performance.</p>
        
        <h2>What We Offer</h2>
        <ul>
            <li>Efficient and convenient online booking</li>
            <li>Detailed reviews and ratings from other customers</li>
            <li>Comprehensive service listings with prices and descriptions</li>
            <li>User-friendly interface and seamless booking process</li>
        </ul>
        
        <h2>Our Team</h2>
        <p>We are a passionate team dedicated to providing the best online booking experience for hair salon services. Our goal is to ensure customer satisfaction and support the growth of local barbershops in Tunis.</p>
        
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, feel free to reach out to us. We are here to help you book your perfect look anytime, anywhere.</p>
    </section>
</main>
);
};

export default About;