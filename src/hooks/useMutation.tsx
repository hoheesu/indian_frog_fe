import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../api/userAuthApi';
import { createGameRoom, joinGameRoom } from '../api/gameRoomApi';
import { useNavigate } from 'react-router-dom';
import { useIsModalStore } from '../store/modal/CreateModalStore';

import { chargePoint, updateProfile } from '../api/myPageApi';
import useUserProfileStore from '../store/profile/useUserProfileStore';

export const useLoginSubmitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const accessToken = data?.headers.authorization;
      localStorage.setItem('accessToken', accessToken);
      alert(data?.data.message);
      queryClient.invalidateQueries();
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
      navigate(`/gameroom/${data?.data.data.roomId}`);
      useSetIsModalClick();
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useJoinRoomMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: joinGameRoom,
    onSuccess: async (data, roomNumber: number) => {
      navigate(`/gameroom/${roomNumber}`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useChargePointMutation = () => {
  const queryClient = useQueryClient();
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  return useMutation({
    mutationFn: chargePoint,
    onSuccess: () => {
      setTimeout(() => {
        alert('포인트가 충전되었습니다.');
        useSetIsModalClick();
        queryClient.invalidateQueries();
      }, 1000);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const setUserImgUrl = useUserProfileStore((state) => state.setUserImgUrl);
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data: { userImgUrl: string }) => {
      setUserImgUrl(data.userImgUrl);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
