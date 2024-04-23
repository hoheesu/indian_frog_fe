import { useQuery } from '@tanstack/react-query';
import { getGameRoomsList } from '../api/gameRoomApi';
import { getMypageInfo, getRankingList } from '../api/myPageApi';
import { getUserPoint } from '../api/userAuthApi';

export const useGetGameRoomsList = (pageNum: number) => {
  return useQuery({
    queryKey: ['gameRoomsList', pageNum],
    queryFn: () => getGameRoomsList(pageNum),
  });
};

export const useGetMypageInfo = () => {
  return useQuery({
    queryKey: ['myPageInfo', getMypageInfo],
    queryFn: getMypageInfo,
  });
};
export const useGetUserPoint = () => {
  return useQuery({
    queryKey: ['userPoint', getUserPoint],
    queryFn: getUserPoint,
  });
};
export const useGetRankingList = () => {
  return useQuery({
    queryKey: ['rankingList', getRankingList],
    queryFn: getRankingList,
  });
};
