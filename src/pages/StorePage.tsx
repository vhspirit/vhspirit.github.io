import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { GameCard } from '../components/GameCard';
import { GameModal } from '../components/GameModal';
import { Game } from '../types';

// Sample data - replace with your actual games data
const SAMPLE_GAMES: Game[] = [
  {
    id: '1',
    title: 'The Last of Us Part II',
    subtitle: 'Action-Adventure',
    imageUrl: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&q=80&w=800',
    size: '100GB',
    price: 59.99
  },
  // Add more games here
];

const WHATSAPP_NUMBER = '1234567890'; // Replace with your actual WhatsApp number

export function StorePage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleWhatsAppClick = () => {
    const message = 'Hi! I\'m interested in your games';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Game Store</h1>
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors shadow-md"
          >
            <MessageCircle size={24} />
            <span>Contact us on WhatsApp</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SAMPLE_GAMES.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onGameClick={(game) => setSelectedGame(game)}
            />
          ))}
        </div>

        {selectedGame && (
          <GameModal
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </div>
    </div>
  );
}