import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollVideoHero from './components/ScrollVideoHero';
import ProductStory from './components/ProductStory';
import FlavorSection from './components/FlavorSection';
import TextureSection from './components/TextureSection';
import ProductShowcase from './components/ProductShowcase';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOpenOrder = () => {
    setIsOrderModalOpen(true);
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  const handleExploreFlavor = () => {
    const flavorSection = document.getElementById('flavor');
    if (flavorSection) {
      flavorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans relative selection:bg-purple-600 selection:text-white">
      {/* Floating Navbar */}
      <Navbar onOpenOrder={handleOpenOrder} />

      {/* 01. Section 1 — Cinematic Scroll-Controlled Video Hero */}
      <ScrollVideoHero onOpenOrder={handleOpenOrder} />

      {/* 02. Section 2 — Product Story: "BLACK BY NATURE." */}
      <ProductStory />

      {/* 03. Section 3 — Flavor: "BERRY EXPLOSION." */}
      <FlavorSection />

      {/* 04. Section 4 — Texture: "CRUNCH IN THE DARK." */}
      <TextureSection />

      {/* 05. Section 5 — Product Showcase: "ONE PRODUCT. ZERO BORING ANGLES." */}
      <ProductShowcase />

      {/* 06. Final CTA — "DARE TO TASTE IT?" */}
      <FinalCTA onOpenOrder={handleOpenOrder} onExploreFlavor={handleExploreFlavor} />

      {/* 07. Footer */}
      <Footer />

      {/* Interactive Reservation / Buy Now Modal */}
      <OrderModal isOpen={isOrderModalOpen} onClose={handleCloseOrder} />
    </div>
  );
}
