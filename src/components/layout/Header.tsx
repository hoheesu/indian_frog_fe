import Button from './form/Button';
import styled, { css } from 'styled-components';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useLocation, useNavigate } from 'react-router-dom';
import IconHowto from '../../assets/images/icons/icon-howto.svg';
import IconMakers from '../../assets/images/icons/icon-makers.svg';
import IconRanking from '../../assets/images/icons/icon-ranking.svg';
import IconLogin from '../../assets/images/icons/icon-login.svg';
import IconLogout from '../../assets/images/icons/icon-logout.svg';
import IconCoin from '../../assets/images/icons/icon-coin-rotate.svg';
import IconMypage from '../../assets/images/icons/icon-mypage.svg';
import IconHome from '../../assets/images/icons/icon-home.svg';
import { useGetUserPoint } from '../../hooks/useQuery';
import { formatNumber } from '../../utils/numberFormatCheck';
import MusicButton from './MusicButton';

function Header() {
  const location = useLocation().pathname;
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleModalOpen = (type?: string) => {
    type ? useSetIsModalClick(type) : useSetIsModalClick();
  };
  const authToken = localStorage.getItem('accessToken');
  const useUserPoint = useGetUserPoint();
  const navigate = useNavigate();

  return (
    <HeaderContainer $location={location}>
      <HeaderInner>
        {location.substring(1, 9) !== 'gameroom' ? (
          <Button onClickFnc={() => navigate('/main')} isBorder={false}>
            <p>
              <span>
                <img src={IconHome} alt="" />
              </span>
              <span>HOME</span>
            </p>
          </Button>
        ) : null}
        <Button onClickFnc={() => handleModalOpen('howto')} isBorder={false}>
          <p>
            <span>
              <img src={IconHowto} alt="" />
            </span>
            <span>HOWTO</span>
          </p>
        </Button>
        <Button onClickFnc={() => handleModalOpen('members')} isBorder={false}>
          <p>
            <span>
              <img src={IconMakers} alt="" />
            </span>
            <span>THE MAKERS</span>
          </p>
        </Button>

        {authToken ? (
          location.substring(1, 9) !== 'gameroom' ? (
            <>
              <Button
                onClickFnc={() => {
                  authToken
                    ? handleModalOpen('ranking')
                    : alert('로그인 후 이용 가능합니다.');
                }}
                isBorder={false}
              >
                <p>
                  <span>
                    <img src={IconRanking} alt="" />
                  </span>
                  <span>RANKING</span>
                </p>
              </Button>

              {useUserPoint.data?.myPoint <= 30 ? (
                <Button
                  onClickFnc={() => handleModalOpen('pointCharge')}
                  isBorder={false}
                >
                  <p className="myPoint">
                    <span>
                      <img src={IconCoin} alt="" />
                    </span>
                    <span>
                      {useUserPoint.data?.myPoint < 0
                        ? 0
                        : formatNumber(useUserPoint.data?.myPoint)}
                    </span>
                  </p>
                </Button>
              ) : (
                <Button
                  onClickFnc={() =>
                    alert('포인트가 30이하일 경우에만 충전이 가능합니다!')
                  }
                  isBorder={false}
                >
                  <p className="myPoint">
                    <span>
                      <img src={IconCoin} alt="" />
                    </span>
                    <span>
                      {useUserPoint.data?.mtPoint < 0
                        ? 0
                        : formatNumber(useUserPoint.data?.myPoint)}
                    </span>
                  </p>
                </Button>
              )}
            </>
          ) : null
        ) : null}
        {authToken ? (
          <UserMemberBtns>
            <MusicButton />
            {location.substring(1, 9) !== 'gameroom' ? (
              <>
                <Button
                  onClickFnc={() => {
                    navigate('/mypage');
                  }}
                  isBorder={false}
                >
                  <p>
                    <span>
                      <img src={IconMypage} alt="" />
                    </span>
                    <span>MY PAGE</span>
                  </p>
                </Button>
                <Button
                  onClickFnc={() => handleModalOpen('logout')}
                  isBorder={false}
                >
                  <p>
                    <span>
                      <img src={IconLogin} alt="" />
                    </span>
                    <span>LOG OUT</span>
                  </p>
                </Button>
              </>
            ) : null}
          </UserMemberBtns>
        ) : (
          <UserMemberBtns>
            <MusicButton />
            {
              <Button
                onClickFnc={() => handleModalOpen('login')}
                isBorder={false}
              >
                <p>
                  <span>
                    <img src={IconLogout} alt="" />
                  </span>
                  <span>LOG IN</span>
                </p>
              </Button>
            }
          </UserMemberBtns>
        )}
      </HeaderInner>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div<{ $location: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  z-index: 100;
  ${({ $location }) =>
    $location === '/main' || $location === '/ranking'
      ? css`
          background: #fffdee;
          border-bottom: 1px solid #eadfc2;
        `
      : null}
`;
const HeaderInner = styled.div`
  width: 100%;
  max-width: 1460px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100px;

  button {
    > p {
      display: flex;
      align-items: center;
      gap: 10px;
      span {
        font-family: NPSfontBold;

        font-size: 16px;
        font-weight: 500;
      }
      &.myPoint {
        font-size: 18px;
        font-weight: 800;
      }
      img {
        width: 30px;
      }
    }
  }
  @media (max-height: 600px) or (max-width: 1110px) {
    @media (max-width: 850px) {
      gap: 20px;
      button {
        span + span {
          display: none;
        }
      }
    }
    height: 60px;
    button {
      > p {
        gap: 7px;
        span {
          font-size: 13px;
          font-weight: 500;
        }
        &.myPoint {
          font-size: 15px;
          font-weight: 500;
        }
        img {
          width: 25px;
        }
      }
      @media (max-width: 950px) {
      }
    }
  }
`;
const UserMemberBtns = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 10px;
  @media (max-height: 600px) or (max-width: 1110px) {
    gap: 20px;
    img {
      width: 25px;
    }
  }
`;
export default Header;
