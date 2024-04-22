import { create } from 'zustand';

interface HostUserInfo {
  hostName: string;
  hostPoint: number;
}

interface UseHostUserInfoStore {
  hostUserInfo: HostUserInfo;
  setHostUserInfo: (newHostInfo: HostUserInfo) => void;
}

export const useHostUserInfoStore = create<UseHostUserInfoStore>((set) => ({
  hostUserInfo: {
    hostName: '',
    hostPoint: 0,
  },
  setHostUserInfo: (newHostInfo: HostUserInfo) =>
    set(() => ({
      hostUserInfo: newHostInfo,
    })),
}));
