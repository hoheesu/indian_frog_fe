import ClosedModalButton from './ClosedModalButton';
import styled from 'styled-components';
import Button from '../layout/form/Button';
import { useNavigate } from 'react-router-dom';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useGetRankingList } from '../../hooks/useQuery';
import { formatNumber } from '../../utils/numberFormatCheck';
import IconCrown from '../../assets/images/icons/icon-crown.svg';
import IconArrowR from '../../assets/images/icons/icon-arrow-right.svg';
import ImgBannerTitle from '../../assets/images/img-banner-title.svg';

function RankingModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const navigate = useNavigate();
  const handleMoreBtnClick = () => {
    navigate('/ranking');
    useSetIsModalClick();
  };
  const rankingList = useGetRankingList();
  const rankingInfo = rankingList?.data;

  interface Rankings {
    ranking: number;
    nickname: string;
    point: number;
    userImg: string;
  }
  return (
    <>
      <ClosedModalButton />
      <RanKingWrap>
        <BannerTitle>게임랭킹</BannerTitle>
        <ListTitle>
          <p>RANK</p>
          <p>NICKNAME</p>
          <p>POINT</p>
        </ListTitle>
        <RankingList>
          {rankingInfo?.rankings
            .slice(0, 5)
            .map((rankings: Rankings, index: number) => (
              <RankingItem key={index}>
                <p>{rankings.ranking}</p>
                <p>{rankings.nickname}</p>
                {/* <p>{formatNumber(rankings.point)}</p> */}
                <p>{rankings.point < 0 ? 0 : formatNumber(rankings.point)}</p>
              </RankingItem>
            ))}
          <MyRanking>
            <p>{rankingInfo?.myRanking}</p>
            <p>{rankingInfo?.myNickname}</p>
            <p>{rankingInfo?.myPoint}</p>
          </MyRanking>
        </RankingList>
      </RanKingWrap>
      <Button onClickFnc={handleMoreBtnClick} isBorder={false}>
        <p>
          랭킹 더 보기
          <span>
            <img src={IconArrowR} alt="" />
          </span>
        </p>
      </Button>
    </>
  );
}
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
    font-weight: 800;
    color: #56533d;
    gap: 6px;
  }
  @media (max-height: 600px) {
    gap: 0px;
    p {
      font-size: 13px;
    }
  }
`;
const RankingList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
  @media (max-height: 600px) {
    gap: 5px;
  }
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
  border-radius: 30px;
  border: 1px solid #ddd;
  height: 50px;
  background: #f9f4e0;
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
    font-size: 16px;
    color: #56533d;
  }
  @media (max-height: 600px) {
    height: 35px;
    p {
      &:nth-child(2) {
        font-size: 13px;
      }
      &:nth-child(4) {
        font-size: 13px;
      }
      font-size: 13px;
    }
  }
  &:nth-child(-n + 3) {
    p {
      &:nth-child(1) {
        &::before {
          content: '';
          display: block;
          width: 16px;
          height: 12px;
          background: url(${IconCrown}) no-repeat center;
          background-size: 70%;
        }
      }
      color: #fff;
    }
  }
`;
const MyRanking = styled(RankingItem)`
  background: #d0ef8a;
  border: 2px solid #7eb737;
  p {
    &:nth-child(2) {
      &::before {
        content: '나';
        display: flex;
        align-items: center;
        justify-content: center;
        background: #5a8900;
        color: #fff;
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
    }
  }
`;
const RanKingWrap = styled.div`
  min-width: 500px;
  padding-top: 40px;
  + button {
    display: flex;
    margin-top: 20px;
    margin-left: auto;
    p {
      display: flex;
      justify-content: center;
      gap: 5px;
      font-size: 14px;
      font-weight: 800;
      align-items: center;
      span {
        display: inline-flex;
        align-items: center;
      }
    }
  }
  @media (max-height: 600px) {
    min-width: unset;
    max-width: 400px;
    margin: 0 auto;
    padding: 0;
  }
`;
const BannerTitle = styled.h3`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 229px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: NPSfontBold;
  padding-top: 15px;
  font-size: 30px;
  height: 111px;
  text-align: center;
  margin: 0 0 40px;
  font-weight: 800;
  background: url(${ImgBannerTitle}) no-repeat center;
  color: #fff;
  @media (max-height: 600px) {
    position: relative;
    inset: inherit;
    transform: translate(0);
    width: 100%;
    font-size: 16px;
    height: 53px;
    margin: 0 0 15px;
    background-size: 120px;
  }
`;
export default RankingModal;
