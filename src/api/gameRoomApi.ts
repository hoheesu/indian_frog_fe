import { AxiosError } from 'axios';
import { authInstance } from './axios';
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
    const response = await authInstance.get(`/gameRoom?page=${pageNum}`);
    console.log(response);
    return response.data.data;
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
    console.log(response);
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response;
    }
  }
};
