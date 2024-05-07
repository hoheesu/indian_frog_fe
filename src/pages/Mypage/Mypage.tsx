import styled from 'styled-components';
import Button from '../../components/layout/form/Button';
import { useGetMypageInfo } from '../../hooks/useQuery';
import { formatNumber } from '../../utils/numberFormatCheck';
import IconArrowRight from '../../assets/images/icons/icon-arrow-right.svg';
import IconRanking from '../../assets/images/icons/icon-ranking.svg';
import IconCoin from '../../assets/images/icons/icon-coin-rotate.svg';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useNavigate } from 'react-router-dom';
import ImgRandomProfile01 from '../../assets/images/img-randomProfile01.svg';
import { setScreeSize } from '../../utils/heightCheck';

const Mypage = () => {
  const myPageInfo = useGetMypageInfo();
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleModalOpen = (type?: string) => {
    type ? useSetIsModalClick(type) : useSetIsModalClick();
  };
  const navigate = useNavigate();
  window.addEventListener('resize', () => setScreeSize());
  return (
    <MypageWrap>
      <ProfileWrap>
        <PictureWrap>
          <picture>
            {myPageInfo.data?.myImageUrl ? (
              <img src={myPageInfo.data?.myImageUrl} alt="" />
            ) : (
              <img src={ImgRandomProfile01} alt="" />
            )}
          </picture>
        </PictureWrap>
        <p>{myPageInfo.data?.nickName}</p>
        <BtnWrap>
          <Button
            onClickFnc={() => handleModalOpen('updateImg')}
            isBorder={false}
          >
            <p>프로필 편집</p>
          </Button>
          <Button
            onClickFnc={() => handleModalOpen('changePassword')}
            isBorder={false}
          >
            <p>비밀번호 변경</p>
          </Button>
        </BtnWrap>
      </ProfileWrap>
      <MyDetailInfoList>
        <li>
          <ItemBox>
            <p>
              {myPageInfo.data?.point <= 30 ? (
                <ArrowLink onClick={() => handleModalOpen('pointCharge')}>
                  포인트 충전
                </ArrowLink>
              ) : (
                <ArrowLink
                  onClick={() => {
                    alert('포인트가 30이하일 경우에만 충전이 가능합니다!');
                  }}
                >
                  포인트 충전
                </ArrowLink>
              )}
            </p>
            <p>
              <i>
                <img src={IconCoin} alt="" />
              </i>
              <span>
                {' '}
                {myPageInfo.data?.point < 0
                  ? 0
                  : formatNumber(myPageInfo.data?.point)}
              </span>
            </p>
          </ItemBox>
        </li>
        <li>
          <ItemBox>
            <p>내 현재 순위는</p>
            <p>
              <i>
                <img src={IconRanking} alt="" />
              </i>
              <span>{myPageInfo.data?.ranking}</span>위
            </p>
          </ItemBox>
          <ArrowLink onClick={() => navigate('/ranking')}>
            전체 랭킹 보기
          </ArrowLink>
        </li>
      </MyDetailInfoList>
    </MypageWrap>
  );
};
const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  button {
    width: 100%;
    min-width: 150px;
    height: 55px;
    padding: 3px;
    border-radius: 30px;
    background: #5a8900;
    &:hover {
      background: #81c008;
    }
    p {
      padding: 5px 10px;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
    & + button {
      background: transparent;
      border: 2px solid #5a8900;
      &:hover {
        background: transparent;
      }
      p {
        color: #5a8900;
      }
    }
  }
  @media (max-height: 600px) {
    button {
      height: 45px;
      min-width: 140px;
      p {
        padding: 10px 20px;
        font-size: 14px;
      }
    }
  }
`;
const MyDetailInfoList = styled.ul`
  margin-top: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  @media (max-height: 600px) {
    li {
      width: 100%;
      height: 50px;
    }
    flex: 1;
    margin-top: 0;
    flex-direction: column;
    gap: 10px;
  }
`;
const ArrowLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: 'NPSfontBold';
  &:hover {
    color: #5a8900;
  }
  &:after {
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    background: url(${IconArrowRight}) no-repeat center;
    background-size: 100%;
  }
  font-size: 16px;
  gap: 5px;
  @media (max-height: 600px) {
    font-size: 13px;
    &:after {
      width: 13px;
      height: 13px;
    }
  }
`;
const ItemBox = styled.div`
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 20px 30px;
  height: 100px;
  width: 600px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  + button {
    margin-top: 15px;
    margin-left: auto;
  }
  p {
    font-family: 'NPSfontBold';
    display: flex;
    align-items: center;
    font-size: 16px;
    i {
      width: 30px;
      img {
        width: 100%;
      }
    }
    > a {
      font-size: 18px;
    }
    + p {
      font-size: 20px;
    }
  }
  span {
    font-size: 25px;
    font-weight: 700;
    padding: 0 10px;
  }
  @media (max-height: 600px) {
    max-width: unset;
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    p {
      font-size: 13px;
      i {
        width: 20px;
      }
    }
    span {
      font-size: 18px;
    }
  }
`;
const PictureWrap = styled.div`
  position: relative;
  display: flex;
`;
const MypageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  @media (max-height: 600px) {
    flex-direction: row;
    padding: 0 100px;
    gap: 20px;
  }
`;
const ProfileWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  > p {
    font-family: 'NPSfontBold';
    font-size: 28px;
    font-weight: 600;
  }

  picture {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 170px;
    height: 170px;
    object-fit: fill;
    overflow: hidden;
    border-radius: 50%;
    border: 5px solid #222222;
    background: #fff;
    img {
      height: inherit;
      width: inherit;
      object-fit: cover;
    }
  }
  @media (max-height: 600px) {
    flex: 1;
    gap: 20px;
    p {
      font-size: 18px;
    }
    picture {
      width: 100px;
      height: 100px;
      border-width: 2px;
      img {
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }
  }
`;

export default Mypage;
