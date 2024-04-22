import { create } from 'zustand';

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
