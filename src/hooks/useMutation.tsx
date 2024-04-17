import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/userAuthApi';
import { createGameRoom, joinGameRoom } from '../api/gameRoomApi';
import { useNavigate } from 'react-router-dom';
import { useIsModalStore } from '../store/modal/CreateModalStore';
import { useGameRoomInfoStore } from '../store/modal/GameRoomInfoStore';
import { useHostUserInfoStore } from '../store/modal/HostUserInfo';

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
  const useHostUserInfo = useHostUserInfoStore(
    (state) => state.setHostUserInfo,
  );
  return useMutation({
    mutationFn: createGameRoom,
    onSuccess: (data) => {
      console.log(data?.data.data);
      useHostUserInfo({
        hostName: data?.data.data.hostName,
        hostPoint: data?.data.data.myPoint,
      });
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
