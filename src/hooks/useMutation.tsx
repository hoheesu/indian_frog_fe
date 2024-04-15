import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/userAuthApi';
import { createGameRoom, joinGameRoom } from '../api/gameRoomApi';
import { useNavigate } from 'react-router-dom';
import {
  useGameRoomInfoStore,
  useIsModalStore,
} from '../store/modal/CreateModalStore';

export const useLoginSubmitMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const accessToken = data?.headers.authorization;
      localStorage.setItem('accessToken', accessToken);
      alert(data?.data.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useCreateRoomMutation = () => {
  const navigate = useNavigate();
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  return useMutation({
    mutationFn: createGameRoom,
    onSuccess: (data) => {
      navigate(`/gameroomtest/${data?.data.data.roomId}`);
      useSetIsModalClick();
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useJoinRoomMutation = () => {
  const navigate = useNavigate();
  const useSetGameRoomInfo = useGameRoomInfoStore(
    (state) => state.setIsGameInfo,
  );
  return useMutation({
    mutationFn: joinGameRoom,
    onSuccess: async (data, roomNumber: number) => {
      useSetGameRoomInfo(data);
      navigate(`/gameroomtest/${roomNumber}`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
