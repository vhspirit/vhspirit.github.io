import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onGameClick: (game: Game) => void;
}

export function GameCard({ game, onGameClick }: GameCardProps) {
  return (
    <div 
      className="rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 shadow-lg"
      onClick={() => onGameClick(game)}
    >
      <img 
        src={game.imageUrl} 
        alt={game.title}
        className="w-full h-48 object-cover"
      />
    </div>
  );
}