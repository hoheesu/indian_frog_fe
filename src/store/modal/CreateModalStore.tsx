import { create } from 'zustand';

interface UseIsModalStoreType {
  isModal: boolean | string;
  setIsModalClick: (modalType?: string) => void;
}
interface GameInfo {
  participant: string;
  host: string;
  participantPoint: number;
  hostPoint: number;
}

interface UseGameRoomInfoStore {
  gameInfo: GameInfo;
  setIsGameInfo: (newGameInfo: GameInfo) => void;
}

export const useIsModalStore = create<UseIsModalStoreType>((set) => ({
  isModal: false,
  setIsModalClick: (modalType: string | boolean = false) => {
    set(() => ({
      isModal: modalType ? modalType : false,
    }));
  },
}));

export const useGameRoomInfoStore = create<UseGameRoomInfoStore>((set) => ({
  gameInfo: {
    participant: '',
    host: '',
    participantPoint: 0,
    hostPoint: 0,
  },
  setIsGameInfo: (newGameInfo: GameInfo) =>
    set(() => ({
      gameInfo: newGameInfo,
    })),
}));
