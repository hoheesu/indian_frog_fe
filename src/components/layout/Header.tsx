import Button from './form/Button';
import styled, { css } from 'styled-components';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useLocation } from 'react-router-dom';
import IconHowto from '../../assets/images/icons/icon-howto.svg';
import IconMakers from '../../assets/images/icons/icon-makers.svg';
import IconRanking from '../../assets/images/icons/icon-ranking.svg';
import IconLogin from '../../assets/images/icons/icon-login.svg';

function Header() {
  const location = useLocation().pathname;

  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleModalOpen = (type?: string) => {
    type ? useSetIsModalClick(type) : useSetIsModalClick();
  };

  return (
    <HeaderContainer location={location}>
      <HeaderInner>
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
        <Button onClickFnc={() => handleModalOpen('login')} isBorder={true}>
          <p>
            <span>
              <img src={IconLogin} alt="" />
            </span>
            LOG IN
          </p>
        </Button>
      </HeaderInner>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div<{ location: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  z-index: 100;
  ${({ location }) =>
    location === '/main'
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
  justify-content: flex-end;
  height: 100px;
  gap: 10px;
  button {
    > p {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

export default Header;
