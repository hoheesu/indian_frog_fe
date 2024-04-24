import { useQuery } from '@tanstack/react-query';
import { getGameRoomsList } from '../api/gameRoomApi';
import { getMypageInfo, getRankingList } from '../api/myPageApi';
import { getUserPoint, snsLoginUser } from '../api/userAuthApi';

export const QUERY_KEYS = {
  GameRoomsList: 'gameRoomsList',
  MyPageInfo: 'myPageInfo',
  UsePoint: 'userPoint',
  RankingList: 'rankingList',
  SnsLogin: 'snsLogin',
};

export const useGetGameRoomsList = (pageNum: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GameRoomsList, pageNum],
    queryFn: () => getGameRoomsList(pageNum),
  });
};

export const useGetMypageInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MyPageInfo, getMypageInfo],
    queryFn: getMypageInfo,
  });
};
export const useGetUserPoint = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.UsePoint, getUserPoint],
    queryFn: getUserPoint,
  });
};

export const useGetRankingList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.RankingList, getRankingList],
    queryFn: getRankingList,
  });
};
export const useGetSnsLogin = (snsName: string, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SnsLogin, snsName],
    queryFn: () => snsLoginUser(snsName),
    ...options,
  });
};
