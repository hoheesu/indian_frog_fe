import styled from 'styled-components';
import { useGetRankingList } from '../../hooks/useQuery';
import { formatNumber } from '../../utils/numberFormatCheck';
import ImgRandomProfile01 from '../../assets/images/img-randomProfile01.svg';
import IconCrown from '../../assets/images/icons/icon-crown.svg';

const RankingPage = () => {
  const rankingList = useGetRankingList();
  const rankingInfo = rankingList?.data;

  interface Rankings {
    ranking: number;
    nickname: string;
    point: number;
    userImg: string;
  }
  return (
    <RanKingWrap>
      <h2>게임랭킹</h2>
      <ListTitle>
        <p>RANK</p>
        <p>NICKNAME</p>
        <p>POINT</p>
        <p>PROFILE</p>
      </ListTitle>
      <RankingList>
        {rankingInfo?.rankings.map((rankings: Rankings, index: number) => (
          <RankingItem key={index}>
            <p>{rankings.ranking}</p>
            <p>{rankings.nickname}</p>
            {/* <p>{formatNumber(rankings.point)}</p> */}
            <p>{rankings.point < 0 ? 0 : formatNumber(rankings.point)}</p>
            <p>
              <ProfileImg>
                {rankings.userImg === null ? (
                  <img src={ImgRandomProfile01}></img>
                ) : (
                  <img src={rankings.userImg}></img>
                )}
              </ProfileImg>
            </p>
          </RankingItem>
        ))}
      </RankingList>
      <MyRankingWrap>
        <MyRankingInfo>
          <p>{rankingInfo?.myRanking}</p>
          <p>{rankingInfo?.myNickname}</p>
          <p>{rankingInfo?.myPoint}</p>
          <p>
            <ProfileImg>
              {rankingInfo?.userImg === null ? (
                <img src={ImgRandomProfile01}></img>
              ) : (
                <img src={rankingInfo?.userImg}></img>
              )}
            </ProfileImg>
          </p>
        </MyRankingInfo>
      </MyRankingWrap>
    </RanKingWrap>
  );
};
const ListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: NPSfontBold;
    flex: 1 0;
    text-align: center;
    font-size: 16px;
    color: #2b5e13;
    gap: 6px;
  }
`;
const RankingList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;
const RankingItem = styled(ListTitle)`
  &:nth-child(1) {
    background: #375401;
  }
  &:nth-child(2) {
    background: #5a8900;
  }
  &:nth-child(3) {
    background: #7eb737;
  }
  &:nth-child(-n + 3) {
    border-top: 1px solid #fff;
    p {
      &:nth-child(1) {
        &::before {
          content: '';
          display: block;
          width: 20px;
          height: 14px;
          background: url(${IconCrown});
        }
      }
      color: #fff;
    }
  }
  border-top: 1px solid #ddd;
  height: 75px;
  p {
    &:nth-child(2) {
      font-weight: 800;
      font-size: 16px;
    }
    &:nth-child(4) {
      font-weight: 800;
      font-size: 16px;
      display: flex;
      justify-content: center;
    }
    font-size: 20px;
    color: #56533d;
  }
  @media (max-height: 600px) {
    height: 50px;
    font-size: 16px;
    p {
      font-size: 13px;
      &:nth-child(2) {
        font-size: 13px;
      }
      &:nth-child(4) {
        font-size: 13px;
      }
    }
  }
`;
const ProfileImg = styled.picture`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  border: 2px solid #fff;
  background: #fff;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
  img {
    object-fit: cover;
    width: inherit;
    height: inherit;
  }
  @media (max-height: 600px) {
    width: 35px;
    height: 35px;
    border-width: 1px;
  }
`;
const MyRankingWrap = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 900px;
  padding: 0 20px;
  @media (max-height: 600px) {
    bottom: 20px;
    max-width: 100%;
    padding: 0 30px;
  }
`;
const MyRankingInfo = styled(ListTitle)`
  &:before {
    content: '내 랭킹';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    background: #fff;
    padding: 2px 10px;
    height: 25px;
    width: 50px;
    background: #7eb737;
    border-radius: 50px;
    color: #fff;
  }
  position: relative;
  height: 80px;
  background: linear-gradient(90deg, rgba(208, 239, 138, 1) 0%, #fffec0 100%);
  border: 3px solid #7eb737;
  border-radius: 50px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  @media (max-height: 600px) {
    height: 50px;
    border-width: 2px;
  }
  p {
    font-weight: 800;
    font-size: 20px;
    color: #56533d;
    @media (max-height: 600px) {
      font-size: 16px;
    }
    &:nth-child(4) {
      display: flex;
      justify-content: center;
    }
  }
`;
const RanKingWrap = styled.div`
  position: relative;
  max-width: 900px;
  padding: 100px 20px;
  margin: 100px auto 0;
  padding-bottom: 300px;
  h2 {
    font-family: NPSfontBold;
    font-size: 35px;
    text-align: center;
    margin: 0 0 80px;
    font-weight: 800;
  }
  @media (max-height: 600px) {
    max-width: 100%;
    padding: 0 30px;
    margin: 90px auto 100px;
    h2 {
      margin: 0 0 30px;
      font-size: 20px;
    }
  }
`;
export default RankingPage;
