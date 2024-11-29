"use client"
import { Character } from "@/Models/character";
import useFavoritesStore from "@/store/character/CharacterStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

interface Props {
  character: Character;
}

export default function CardFavoriteCharacter({ character }: Props) {
  const { removeFavorite } = useFavoritesStore();
  const [showBrokenHeart, setShowBrokenHeart] = useState(false);

  const toggleFavorite = (id: number) => {
    setShowBrokenHeart(true);
    setTimeout(() => {
      removeFavorite(id);
    }, 500);
  };

  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-center p-4">
      <Link href={`/characters/likes/${character.id}`} className="w-full text-center">
        <div className="flex justify-center">
          <Image
            src={character.image}
            alt={character.name}
            width={120}
            height={120}
            className="rounded-full border-2 border-gray-200"
          />
        </div>
        <h2 className="text-lg font-semibold mt-4 text-gray-900 truncate">
          {character.name}
        </h2>
        <p className="text-sm text-gray-600 truncate">
          {character.species} - {character.gender}
        </p>
      </Link>
      <button
        onClick={() => toggleFavorite(character.id)}
        className="mt-4 flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-500 rounded-lg shadow-sm hover:bg-red-200">
        {showBrokenHeart ? (
          <FaHeartBroken className="text-xl" />
        ) : (
          <FaHeart className="text-xl" />
        )}
        <span className="text-sm font-medium">
          {showBrokenHeart ? "Eliminado" : "Eliminar"}
        </span>
      </button>
    </div>
  );
}
