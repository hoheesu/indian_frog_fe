import { create } from 'zustand';
interface GameEndInfo {
  gameWinner: string;
  gameLoser: string;
  winnerPoint: number;
  loserPoint: number;
  isUserWin: boolean;
}

export interface GameEndStore {
  userChoice: string;
  gameEndInfo: GameEndInfo;
  setUserChoice: (newUserChoice: string) => void;
  setGameEndInfo: (newGameEndInfo: GameEndInfo) => void;
}

export const useGameEndStore = create<GameEndStore>((set) => ({
  userChoice: '',
  gameEndInfo: {
    gameWinner: '',
    gameLoser: '',
    winnerPoint: 0,
    loserPoint: 0,
    isUserWin: true,
  },
  setUserChoice: (newUserChoice: string) => {
    set(() => ({
      userChoice: newUserChoice,
    }));
  },
  setGameEndInfo: (newGameEndInfo: GameEndInfo) => {
    set(() => ({
      gameEndInfo: newGameEndInfo,
    }));
  },
}));
