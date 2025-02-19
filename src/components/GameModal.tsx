import React from 'react';
import { X } from 'lucide-react';
import { Game } from '../types';

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

export function GameModal({ game, onClose }: GameModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800">{game.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <img 
            src={game.imageUrl} 
            alt={game.title}
            className="w-full h-64 object-cover rounded-lg mt-4"
          />
          
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">{game.subtitle}</p>
            <p className="text-sm text-gray-500">Size: {game.size}</p>
          </div>
        </div>
      </div>
    </div>
  );
}