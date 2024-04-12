import { useQuery } from '@tanstack/react-query';
import { getGameRoomsList } from '../api/gameRoomApi';

export const useGetGameRoomsList = (pageNum: number) => {
  return useQuery({
    queryKey: ['gameRoomsList', pageNum],
    queryFn: () => getGameRoomsList(pageNum),
  });
};
