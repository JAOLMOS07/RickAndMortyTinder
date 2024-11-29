import { Character } from "@/Models/character";
import Image from "next/image";
import { FaMapMarkerAlt, FaGenderless, FaCircle } from "react-icons/fa";

interface Props {
  character: Character;
}

export default function CardCharacter({ character }: Props) {
  const statusColors: Record<string, string> = {
    Alive: "text-green-500",
    Dead: "text-red-500",
    unknown: "text-gray-500",
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden ">
      <Image
        src={character.image}
        alt={character.name}
        width={500}
        height={500}
        className="w-full h-48 object-cover transform transition duration-300 hover:shadow-xl hover:scale-105"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 truncate mb-2">
          {character.name}
        </h2>
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <FaGenderless className="text-gray-400" />
          <p className="text-sm">
            {character.species} - {character.gender}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm mb-2">
          <FaCircle className={statusColors[character.status] || "text-gray-500"} />
          <p className="text-gray-600">{character.status}</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-500 text-sm mb-2">
          <FaMapMarkerAlt className="text-blue-400" />
          <p>Origin: {character.origin.name}</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <FaMapMarkerAlt className="text-blue-400" />
          <p>Location: {character.location.name}</p>
        </div>
      </div>
    </div>
  );
}