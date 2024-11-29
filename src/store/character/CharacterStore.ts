import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id: number) => {
        const currentFavorites = get().favorites;
        if (!currentFavorites.includes(id)) {
          set({ favorites: [...currentFavorites, id] });
        }
      },
      removeFavorite: (id: number) => {
        set({
          favorites: get().favorites.filter(
            (characterId) => characterId !== id
          ),
        });
      },
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);

export default useFavoritesStore;
