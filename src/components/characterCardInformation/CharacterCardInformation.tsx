'use client'
import { Character } from "@/Models/character";
import { FaMapMarkerAlt, FaHome, FaInfoCircle, FaHeart } from 'react-icons/fa';
import useFavoritesStore from "@/store/character/CharacterStore";

interface Props {
  character: Character;
}

export default function CardCharacterInformation({ character }: Props) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const isFavorite = favorites.includes(character.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del personaje */}
        <div className="flex justify-center">
          <img
            src={character.image}
            alt={character.name}
            className="rounded-lg shadow-lg max-w-xs w-full"
          />
        </div>

        {/* Información del personaje */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">{character.name}</h1>
          <div className="flex items-center space-x-2 text-lg">
            <FaInfoCircle className="text-gray-500" />
            <p className="text-gray-700">{character.status} - {character.species}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="text-gray-700">Type: {character.type || "Unknown"}</p>
            <p className="text-gray-700">Gender: {character.gender}</p>
          </div>

          {/* Origen y ubicación */}
          <div className="flex flex-col md:flex-row md:space-x-4 text-gray-700">
            <div className="flex items-center space-x-2">
              <FaHome />
              <a href={character.origin.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                {character.origin.name}
              </a>
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <FaMapMarkerAlt />
              <a href={character.location.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                {character.location.name}
              </a>
            </div>
          </div>

          {/* Episodios */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Episodes</h2>
            <ul className="list-disc pl-5 space-y-1 max-h-40 overflow-y-auto">
              {character.episode.map((ep, index) => (
                <li key={index} className="text-gray-700">{ep}</li>
              ))}
            </ul>
          </div>

          {/* Botón de favoritos */}
          <button
            onClick={toggleFavorite}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg shadow-md w-full md:w-auto ${isFavorite ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            <FaHeart className={isFavorite ? "text-white" : "text-gray-700"} />
            <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}