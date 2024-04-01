import { create } from 'zustand';

interface UseIsModalStoreType {
  isModal: boolean;
  setIsModalClick: () => void;
}

export const useIsModalStore = create<UseIsModalStoreType>((set) => ({
  isModal: false, // state
  setIsModalClick: () =>
    set((state: { isModal: boolean }) => ({ isModal: !state.isModal })),
}));
