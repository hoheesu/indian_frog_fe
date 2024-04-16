import { AxiosError } from 'axios';
import { authInstance, instance } from './axios';
import { ErrorResponse } from 'react-router-dom';

export const checkEmailDuplication = async (userEmail: string) => {
  try {
    const response = await instance.get(`/user/email/check?email=${userEmail}`);
    console.log(response.data.status);
    return response.data.status;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response.data.status;
    }
  }
};
export const checkNicknameDuplication = async (userNickname: string) => {
  try {
    const response = await instance.get(
      `/user/nickname/check?nickname=${userNickname}`,
    );
    console.log(response.data.status);
    return response.data.status;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response.data.status;
    }
  }
};

export const signupUser = async (signupInfo: {
  nickname: string;
  email: string;
  password: string;
}) => {
  try {
    const { nickname, email, password } = signupInfo;
    const response = await instance.post('/user/signup', {
      nickname,
      email,
      password,
    });
    return response;
  } catch (error: any) {
    // const axiosError = error as AxiosError<ErrorResponse>;
    // if (axiosError.response) {
    //   console.log(axiosError.response.data.status);
    //   throw axiosError.response.data;
    // }
    alert(error.response.data.message);
    throw error;
  }
};

export const loginUser = async (loginInfo: {
  email: string;
  password: string;
}) => {
  try {
    const response = await instance.post('/user/login', loginInfo, {
      withCredentials: true, // 쿠키를 포함시키기 위해 withCredentials 옵션을 true로 설정합니다.
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response;
  } catch (error: any) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      console.log(axiosError.response.data.status);
      throw axiosError.response.data;
    }
  }
};

export const refreshToken = async () => {
  try {
    const response = await authInstance.post('/token/refresh', {
      withCredentials: true,
    });
    const accessToken = response?.headers.authorization;
    localStorage.setItem('accessToken', accessToken);
    return response.data.accessToken;
  } catch (err) {
    throw err;
  }
};
