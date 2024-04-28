import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  emailCertified,
  emailCertifiedCode,
  findPassword,
  loginUser,
} from '../api/userAuthApi';
import { createGameRoom, joinGameRoom } from '../api/gameRoomApi';
import { useNavigate } from 'react-router-dom';
import { useIsModalStore } from '../store/modal/CreateModalStore';
import { useGameRoomInfoStore } from '../store/modal/GameRoomInfoStore';
import { useHostUserInfoStore } from '../store/modal/HostUserInfo';
import { chargePoint, updateProfile } from '../api/myPageApi';
import useUserProfileStore from '../store/profile/useUserProfileStore';
import { QUERY_KEYS } from './useQuery';
import { getCookie } from '../utils/cookies';

export const useLoginSubmitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const accessToken = data?.headers.authorization;
          console.log(getCookie('refreshToken'));
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
  const queryClient = useQueryClient();
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
      navigate(`/gameroom/${data?.data.data.roomId}`);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GameRoomsList],
      });
      useSetIsModalClick();
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useJoinRoomMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const useSetGameRoomInfo = useGameRoomInfoStore(
    (state) => state.setIsGameInfo,
  );
  return useMutation({
    mutationFn: joinGameRoom,
    onSuccess: async (data, roomNumber: number) => {
      useSetGameRoomInfo(data);
      navigate(`/gameroom/${roomNumber}`);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GameRoomsList],
      });
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MyPageInfo],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
export const useEmailCertifiedMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: emailCertified,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useCertifiedCodeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: emailCertifiedCode,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      alert('이미 인증이 완료되었습니다.');
    },
  });
};
export const useFindPasswordMutation = () => {
  const queryClient = useQueryClient();
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  return useMutation({
    mutationFn: findPassword,
    onSuccess: () => {
      alert('임시 비밀번호를 보냈습니다.');
      useSetIsModalClick();
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
