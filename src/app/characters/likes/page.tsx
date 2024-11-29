"use client"
import CardFavoriteCharacter from "@/components/characterFavoriteCard/CharacterFavoriteCard";
import { Character } from "@/Models/character";
import useFavoritesStore from "@/store/character/CharacterStore";
import { useEffect, useState } from "react";

export default function Home() {
  const { favorites } = useFavoritesStore();
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[] | null>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const fetchFavoriteCharacters = async () => {
    if (favorites.length === 0) {
      setFavoriteCharacters([]);
      return;
    }

    const response = await fetch(`https://rickandmortyapi.com/api/character/[${favorites.join(",")}]`);
    const data: Character[] = await response.json();
    setFavoriteCharacters(data);
  };

  useEffect(() => {
    fetchFavoriteCharacters();
  }, [favorites]);

  const filteredCharacters = favoriteCharacters?.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[90vh] py-8 px-4">
      <main className="max-w-screen-xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-semibold text-center text-white">Personajes favoritos</h1>

        {/* Campo de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Contenedor de los personajes favoritos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredCharacters?.length === 0 ? (
            <div className="col-span-full text-center text-xl text-white">
              No hay personajes que coincidan con tu búsqueda.
            </div>
          ) : (
            filteredCharacters?.map((character) => (
              <CardFavoriteCharacter key={character.id} character={character} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
