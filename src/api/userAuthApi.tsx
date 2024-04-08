import { AxiosError, AxiosResponse } from 'axios';
import { instance } from './axios';
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
    const response = await instance.post('/user/login', loginInfo);
    console.log(response);
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
