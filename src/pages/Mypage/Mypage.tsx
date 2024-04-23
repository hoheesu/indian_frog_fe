import styled from 'styled-components';
import ImgCharacterDummy from '../../assets/images/img-character.svg';
import Button from '../../components/layout/form/Button';
import { useGetMypageInfo } from '../../hooks/useQuery';
import { formatNumber } from '../../utils/numberFormatCheck';
import IconArrowRight from '../../assets/images/icons/icon-arrow-right.svg';
import IconRanking from '../../assets/images/icons/icon-ranking.svg';
import IconCoin from '../../assets/images/icons/icon-coin-rotate.svg';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useNavigate } from 'react-router-dom';
const Mypage = () => {
  const myPageInfo = useGetMypageInfo();
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleModalOpen = (type?: string) => {
    type ? useSetIsModalClick(type) : useSetIsModalClick();
  };
  const navigate = useNavigate();
  return (
    <>
      <MypageWrap>
        <ProfileWrap>
          <PictureWrap>
            <picture>
              {myPageInfo.data?.myImageUrl ? (
                <img src={myPageInfo.data?.myImageUrl} alt="" />
              ) : (
                <img src={ImgCharacterDummy} alt="" />
              )}
            </picture>
          </PictureWrap>
          <p>{myPageInfo.data?.nickName}</p>

          <Button
            onClickFnc={() => handleModalOpen('updateImg')}
            isBorder={false}
          >
            <p>프로필 편집</p>
          </Button>
        </ProfileWrap>
        <MyDetailInfoList>
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
          <li>
            <ItemBox>
              <p>
                {myPageInfo.data?.point <= 0 ? (
                  <ArrowLink onClick={() => handleModalOpen('pointCharge')}>
                    포인트 충전
                  </ArrowLink>
                ) : (
                  <ArrowLink
                    onClick={() => {
                      alert(
                        '포인트를 모두 소진했을 경우에만 충전이 가능합니다!',
                      );
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
        </MyDetailInfoList>
      </MypageWrap>
    </>
  );
};
const MyDetailInfoList = styled.ul`
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
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
    width: 13px;
    height: 13px;
    background: url(${IconArrowRight});
  }
  font-size: 18px;
  gap: 5px;
`;
const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 10px 30px;
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
    font-size: 20px;
    i {
      width: 30px;
      img {
        width: 100%;
      }
    }
    > a {
      font-size: 20px;
    }
    + p {
      font-size: 30px;
    }
  }
  span {
    font-size: 35px;
    font-weight: 700;
    padding: 010px;
  }
`;
const PictureWrap = styled.div`
  position: relative;
  display: flex;
`;
const MypageWrap = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;
const ProfileWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 200px auto 0;
  align-items: center;
  justify-content: center;
  gap: 20px;
  > p {
    font-family: 'NPSfontBold';
    font-size: 28px;
    font-weight: 600;
  }
  button {
    width: 100%;
    max-width: 160px;
    height: 50px;
    border-radius: 30px;
    background: #222;
    &:hover {
      background: #5a8900;
    }
    p {
      padding: 5px 20px;
      font-size: 20px;
      font-weight: 500;
      color: #fff;
    }
  }
  picture {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 200px;
    height: 200px;
    object-fit: fill;
    overflow: hidden;
    border-radius: 50%;
    border: 5px solid #222222;
    background: #fff;
    img {
      height: 200px;
      width: 200px;
      object-fit: cover;
    }
  }
`;

export default Mypage;
