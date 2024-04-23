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
import { useGetUserPoint } from '../../hooks/useQuery';
import { useEffect } from 'react';
import { loginUser } from '../../api/userAuthApi';
import { formatNumber } from '../../utils/numberFormatCheck';
function Header() {
  const location = useLocation().pathname;
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleModalOpen = (type?: string) => {
    type ? useSetIsModalClick(type) : useSetIsModalClick();
  };
  const authToken = localStorage.getItem('accessToken');
  const useUserPoint = useGetUserPoint();
  const navigate = useNavigate();

  useEffect(() => {
    loginUser;
  }, []);
  return (
    <HeaderContainer $location={location}>
      <HeaderInner>
        <Button onClickFnc={() => navigate('/')} isBorder={false}>
          <p>
            <span>
              <img src={IconHowto} alt="" />
            </span>
            MAIN
          </p>
        </Button>
        <Button onClickFnc={() => handleModalOpen('howto')} isBorder={false}>
          <p>
            <span>
              <img src={IconHowto} alt="" />
            </span>
            HOWTO
          </p>
        </Button>
        <Button onClickFnc={() => handleModalOpen('members')} isBorder={false}>
          <p>
            <span>
              <img src={IconMakers} alt="" />
            </span>
            THE MAKERS
          </p>
        </Button>
        <Button onClickFnc={() => handleModalOpen('ranking')} isBorder={false}>
          <p>
            <span>
              <img src={IconRanking} alt="" />
            </span>
            RANKING
          </p>
        </Button>
        {authToken ? (
          <Button onClickFnc={() => {}} isBorder={false}>
            <p className="myPoint">
              <span>
                <img src={IconCoin} alt="" />
              </span>
              {useUserPoint.data?.point < 0
                ? 0
                : formatNumber(useUserPoint.data?.point)}
            </p>
          </Button>
        ) : null}
        {authToken ? (
          <UserMemberBtns>
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
                MY PAGE
              </p>
            </Button>
            <Button
              onClickFnc={() => handleModalOpen('logout')}
              isBorder={false}
            >
              <p>
                <span>
                  <img src={IconLogout} alt="" />
                </span>
                LOG OUT
              </p>
            </Button>
          </UserMemberBtns>
        ) : (
          <UserMemberBtns>
            <Button
              onClickFnc={() => handleModalOpen('login')}
              isBorder={false}
            >
              <p>
                <span>
                  <img src={IconLogin} alt="" />
                </span>
                LOG IN
              </p>
            </Button>
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
  justify-content: flex-start;
  height: 100px;
  gap: 10px;
  button {
    > p {
      font-family: NPSfontBold;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 500;
      &.myPoint {
        font-size: 18px;
        font-weight: 800;
      }
      img {
        width: 30px;
      }
    }
  }
`;
const UserMemberBtns = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 10px;
`;
export default Header;
