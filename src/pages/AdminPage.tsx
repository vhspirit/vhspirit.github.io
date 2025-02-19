import React, { useState } from 'react';
import { Game } from '../types';
import { Pencil, Trash2, Plus, Save, Lock } from 'lucide-react';

// Move credentials to state so they can be updated
const initialCredentials = {
  username: 'admin',
  password: 'password123'
};

interface GameFormData {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  size: string;
  price: number;
}

const initialGameFormData: GameFormData = {
  id: '',
  title: '',
  subtitle: '',
  imageUrl: '',
  size: '',
  price: 0
};

export function AdminPage() {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showGameForm, setShowGameForm] = useState(false);
  const [gameFormData, setGameFormData] = useState<GameFormData>(initialGameFormData);
  const [editingGameId, setEditingGameId] = useState<string | null>(null);
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === credentials.username && password === credentials.password) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentPassword !== credentials.password) {
      alert('Current password is incorrect');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }
    
    setCredentials(prev => ({
      ...prev,
      password: newPassword
    }));
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordForm(false);
    
    alert('Password updated successfully!');
  };

  const handleSaveWhatsApp = () => {
    // Here you would typically save to your backend
    alert('WhatsApp number saved successfully!');
  };

  const handleGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGameId) {
      setGames(games.map(game => 
        game.id === editingGameId ? { ...gameFormData } : game
      ));
    } else {
      const newGame = {
        ...gameFormData,
        id: Date.now().toString() // Simple ID generation
      };
      setGames([...games, newGame]);
    }
    setShowGameForm(false);
    setGameFormData(initialGameFormData);
    setEditingGameId(null);
  };

  const handleEditGame = (game: Game) => {
    setGameFormData(game);
    setEditingGameId(game.id);
    setShowGameForm(true);
  };

  const handleDeleteGame = (gameId: string) => {
    if (confirm('Are you sure you want to delete this game?')) {
      setGames(games.filter(game => game.id !== gameId));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Login</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Security Settings</h3>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 flex items-center gap-2"
              >
                <Lock size={20} />
                Change Password
              </button>
            </div>
            
            {showPasswordForm && (
              <form onSubmit={handlePasswordChange} className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* WhatsApp Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">WhatsApp Settings</h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="WhatsApp Number"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSaveWhatsApp}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
              >
                <Save size={20} />
                Save Number
              </button>
            </div>
          </div>
        </div>

        {/* Games Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Games Management</h3>
            <button
              onClick={() => {
                setShowGameForm(true);
                setGameFormData(initialGameFormData);
                setEditingGameId(null);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus size={20} />
              Add New Game
            </button>
          </div>

          {showGameForm && (
            <form onSubmit={handleGameSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={gameFormData.title}
                    onChange={(e) => setGameFormData({...gameFormData, title: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    value={gameFormData.subtitle}
                    onChange={(e) => setGameFormData({...gameFormData, subtitle: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    value={gameFormData.imageUrl}
                    onChange={(e) => setGameFormData({...gameFormData, imageUrl: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Size</label>
                  <input
                    type="text"
                    value={gameFormData.size}
                    onChange={(e) => setGameFormData({...gameFormData, size: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={gameFormData.price}
                    onChange={(e) => setGameFormData({...gameFormData, price: parseFloat(e.target.value)})}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowGameForm(false);
                    setGameFormData(initialGameFormData);
                    setEditingGameId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {editingGameId ? 'Update Game' : 'Add Game'}
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 gap-4">
            {games.map((game) => (
              <div key={game.id} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{game.title}</h4>
                    <p className="text-sm text-gray-600">{game.subtitle}</p>
                    <p className="text-sm text-gray-500">Size: {game.size} | Price: ${game.price}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditGame(game)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteGame(game.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}