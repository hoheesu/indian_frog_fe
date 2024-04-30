import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  emailCertified,
  emailCertifiedCode,
  findPassword,
  loginUser,
} from '../api/userAuthApi';
import { createGameRoom, gameRoomInfo, joinGameRoom } from '../api/gameRoomApi';
import { useNavigate } from 'react-router-dom';
import { useIsModalStore } from '../store/modal/CreateModalStore';
import { changePassword, chargePoint, updateProfile } from '../api/myPageApi';
import useUserProfileStore from '../store/profile/useUserProfileStore';
import { QUERY_KEYS } from './useQuery';

export const useLoginSubmitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const accessToken = data?.headers.authorization;
      localStorage.setItem('accessToken', accessToken);
      alert(data?.data.message);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UsePoint],
      });
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
  return useMutation({
    mutationFn: createGameRoom,
    onSuccess: (data) => {
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
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  return useMutation({
    mutationFn: joinGameRoom,
    onSuccess: (_, roomNumber: number) => {
      navigate(`/gameroom/${roomNumber}`);
      useSetIsModalClick();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GameRoomsList],
      });
    },
    onError: (_, roomNumber: number) => {
      (async () => {
        try {
          await gameRoomInfo(roomNumber);
        } catch (error: any) {
          alert(error.message);
          navigate('/main');
        }
      })();
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
export const useChangePasswordMutation = () => {
  const queryClient = useQueryClient();
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (data.passwordChange) {
        alert('비밀번호가 변경되었습니다.');
        useSetIsModalClick();
        queryClient.invalidateQueries();
      } else {
        alert('비밀번호를 다시 확인해주세요');
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
