import { create } from 'zustand';

interface UseIsModalStoreType {
  isModal: boolean | string;
  setIsModalClick: (modalType?: string) => void;
}

export const useIsModalStore = create<UseIsModalStoreType>((set) => ({
  isModal: false,
  setIsModalClick: (modalType: string | boolean = false) => {
    set(() => ({
      isModal: modalType ? modalType : false,
    }));
  },
}));
