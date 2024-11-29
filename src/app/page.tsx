"use client"
import CardCharacter from '@/components/CharacterCard/CharacterCard';
import { Character } from '@/Models/character';
import useDislikesStore from '@/store/character/CharacterDislikeStorage';
import useFavoritesStore from '@/store/character/CharacterStore';
import { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown} from 'react-icons/fa';
import { IoFemaleSharp, IoMaleFemale, IoMaleSharp } from 'react-icons/io5';

export default function Home() {
  const countCharacters: number = 826;
  const [randomCharacter, setRandomCharacter] = useState<Character | null>(null);
  const [genderFilter, setGenderFilter] = useState<'female' | 'male' | 'unknown' | 'all'>('all');
  const { favorites, addFavorite } = useFavoritesStore();
  const {  addDislikes } = useDislikesStore();

  const fetchRandomCharacter = async () => {
    let characterData: Character | null = null;

    do {
      const randomId = Math.floor(Math.random() * countCharacters) + 1;
      const response = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
      const data: Character = await response.json();
      characterData = favorites.includes(data.id) ? null : data;
    } while (!characterData || (genderFilter !== 'all' && characterData.gender.toLowerCase() !== genderFilter));

    setRandomCharacter(characterData);
  };

  useEffect(() => {
    fetchRandomCharacter();
  }, [genderFilter]);

  const handleLike = () => {
    if (randomCharacter) {
      addFavorite(randomCharacter.id);
    }
    fetchRandomCharacter();
  };

  const handleDislike = () => {
    if (randomCharacter) {
      addDislikes(randomCharacter.id);
    }
    fetchRandomCharacter();
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] space-y-6">
      {/* Filter Dropdown */}
      <div className="flex items-center">
        <label className="mr-2 text-white">Filter by Gender:</label>
        <div className="relative">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value as 'female' | 'male' | 'unknown' | 'all')}
            className="block appearance-none w-40 bg-white border rounded-lg shadow-md px-2 ">
            <option value="all">Todos</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="unknown">Desconocido</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          {randomCharacter ? (
            randomCharacter.gender.toLowerCase() === 'female' ? (
              <IoFemaleSharp className="text-green-900" />
            ) : randomCharacter.gender.toLowerCase() === 'male' ? (
              <IoMaleSharp className="text-green-900" />
            ) : (
              <IoMaleFemale className="text-green-900" />
            )
          ) : (
            <IoMaleFemale className="text-green-900" /> 
          )}
          </div>
        </div>
      </div>

      {/* Character Display */}
      {randomCharacter ? (
        <>
          <div className="w-80 h-96 overflow-hidden">
            <CardCharacter character={randomCharacter} />
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleLike}
              className="w-12 h-12 flex justify-center items-center bg-green-500 text-white rounded-full shadow hover:bg-green-600">
              <FaThumbsUp size={20} />
            </button>
            <button
              onClick={handleDislike}
              className="w-12 h-12 flex justify-center items-center bg-red-500 text-white rounded-full shadow hover:bg-red-600">
              <FaThumbsDown size={20} />
            </button>
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-700">Cargando...</p>
      )}
    </div>
  );
}
