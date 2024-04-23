import { AxiosError } from 'axios';
import { authInstance } from './axios';
import { ErrorResponse } from 'react-router-dom';

export const getMypageInfo = async () => {
  try {
    const { data } = await authInstance.get(`/myPage`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response;
    }
  }
};
export const chargePoint = async (myPoint: { point: number }) => {
  try {
    const { data } = await authInstance.post(`/myPage/point`, myPoint);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response;
    }
  }
};

export const updateProfile = async (userImg: { userImg: File }) => {
  try {
    const formData = new FormData();
    formData.append('userImg', userImg.userImg);
    const { data } = await authInstance.post(`/myPage`, formData);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response;
    }
  }
};

export const getRankingList = async () => {
  try {
    const { data } = await authInstance.get('/ranking');
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response;
    }
  }
};
