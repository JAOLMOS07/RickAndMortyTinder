"use client"
import CardCharacter from '@/components/CharacterCard/CharacterCard';
import { Character } from '@/Models/character';
import useDislikesStore from '@/store/character/CharacterDislikeStorage';
import { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

export default function RedemptionView() {
  const { dislikes, removeDislikes } = useDislikesStore();

  const [dislikesCharacters, setDislikesCharacters] = useState<Character[]>([]);
  const [character, setCharacter] = useState<Character | null>(null);
  const [position, setPosition] = useState<number>(0);

  const fetchDislikeCharacters = async () => {
    if (dislikes.length === 0) {
      setDislikesCharacters([]);
      setCharacter(null);
      return;
    }

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/[${dislikes.join(',')}]`);
      const data: Character[] = await response.json();
      setDislikesCharacters(data);
      setCharacter(data[0]);
      setPosition(0);
    } catch (error) {
      console.error('Error fetching disliked characters:', error);
    }
  };

  useEffect(() => {
    fetchDislikeCharacters();
  }, [dislikes]);

  const nextCharacter = () => {
    if (dislikesCharacters.length === 0) {
      setCharacter(null);
      return;
    }

    const nextPosition = (position + 1) % dislikesCharacters.length;
    setPosition(nextPosition);
    setCharacter(dislikesCharacters[nextPosition]);
  };

  const handleLike = () => {
    if (character) {
      removeDislikes(character.id);
    }
    nextCharacter();
  };

  const handleDislike = () => {
    nextCharacter();
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]  rounded-md">
      <h1 className="text-3xl font-bold mb-8 text-white">Zona de redención</h1>
      {character ? (
        <>
          <div className="w-80 h-96 overflow-hidden  rounded-lg">
            <CardCharacter character={character} />
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleLike}
              className="w-12 h-12 flex justify-center items-center bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600">
              <FaThumbsUp size={20} />
            </button>
            <button
              onClick={handleDislike}
              className="w-12 h-12 flex justify-center items-center bg-gray-700 text-white rounded-full shadow hover:bg-gray-800">
              <FaThumbsDown size={20} />
            </button>
          </div>
        </>
      ) : (
        <p className="text-lg text-white">No hay personajes con dislike para redimir.</p>
      )}
    </div>
  );
}