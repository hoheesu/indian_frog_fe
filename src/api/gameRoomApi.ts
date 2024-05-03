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
    const { data } = await instance.get(`/gameRoom?page=${pageNum}`);
    console.log(data.data);

    return {
      result: data.data.content,
      nextPage: pageNum + 1,
      isLast: data.data.last,
      hasNextPage: data.data.numberOfElements === 15,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response.data;
    }
  }
};

export const joinGameRoom = async (gameRoomId: number) => {
  try {
    const response = await authInstance.post(`/gameRoom/${gameRoomId}/join`);
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 400) {
      console.log(response);
      throw response;
    }
  } catch (error: any) {
    throw error.response.data;
  }
};

export const gameRoomInfo = async (gameRoomId: number) => {
  try {
    const response = await authInstance.get(`/gameRoom/${gameRoomId}`);
    return response.data.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
