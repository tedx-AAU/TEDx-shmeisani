import React from 'react';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';
import About from '../components/About';
import OrganizerSection from '../components/OrganizerSection';
import Partners from '../components/Partners'; 

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black">
        <Hero 
        onSeeSpeakers={() => navigate('/speakers')} 
        onGetTickets={() => navigate('/tickets')} 
      />
      <About />
      
      <OrganizerSection />

      <Partners />
    </div>
  );
};

export default Home;