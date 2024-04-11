import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/userAuthApi';

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
