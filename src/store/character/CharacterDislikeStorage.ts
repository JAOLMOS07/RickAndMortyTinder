import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DislikeState {
  dislikes: number[]; 
  addDislikes: (id: number) => void;
  removeDislikes: (id: number) => void;
  clearDislikes: () => void;
}

const useDislikesStore = create<DislikeState>()(
  persist(
    (set, get) => ({
      dislikes: [], 
      addDislikes: (id: number) => {
        const currentDislikes = get().dislikes;
        if (!currentDislikes.includes(id)) {
          set({ dislikes: [...currentDislikes, id] });
        }
      },
      removeDislikes: (id: number) => {
        set({
          dislikes: get().dislikes.filter(
            (characterId) => characterId !== id
          ),
        });
      },
      clearDislikes: () => set({ dislikes: [] }),
    }),
    {
      name: "dislikes-storage", 
      partialize: (state) => ({ dislikes: state.dislikes }), 
    }
  )
);

export default useDislikesStore;
