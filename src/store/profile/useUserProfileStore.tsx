import { create } from 'zustand';

interface UserProfileState {
  userImgUrl: string;
  setUserImgUrl: (url: string) => void;
}

const useUserProfileStore = create<UserProfileState>((set) => ({
  userImgUrl: '', // 사용자 이미지 URL을 저장하는 상태
  setUserImgUrl: (url) => set({ userImgUrl: url }), // 이미지 URL을 업데이트하는 함수
}));

export default useUserProfileStore;
