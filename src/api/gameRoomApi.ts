import { AxiosError } from 'axios';
import { authInstance, instance } from './axios';
import { ErrorResponse } from 'react-router-dom';

export const createGameRoom = async (roomInput: { roomName: string }) => {
  try {
    const response = await authInstance.post('/gameRoom/create', roomInput);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response.data;
    }
  }
};

export const getGameRoomsList = async (pageNum: number) => {
  try {
    const response = await instance.get(`/gameRoom?page=${pageNum}`);
    console.log(response.data.data);
    return response.data.data;
    // return {
    //   items: response.data.data,
    //   nextPage: pageNum + 1,
    //   hasMore: response.data.data.size > 0,
    // };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response;
    }
  }
};

export const joinGameRoom = async (gameRoomId: number) => {
  try {
    const response = await authInstance.post(`/gameRoom/${gameRoomId}/join`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response;
    }
  }
};

export const gameRoomInfo = async (gameRoomId: number) => {
  try {
    const response = await authInstance.get(`/gameRoom/${gameRoomId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
