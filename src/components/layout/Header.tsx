import Button from './form/Button';
import styled from 'styled-components';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
// import { useNavigate } from 'react-router-dom';

function Header() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  // const navigate = useNavigate();
  const handleModalOpen = (type?: string) => {
    type ? useSetIsModalClick(type) : useSetIsModalClick();
  };
  // const pathToRanking = () => {
  //   navigate('/ranking');
  // };

  return (
    <HeaderContainer>
      <HeaderInner>
        <Button onClickFnc={() => handleModalOpen('howto')} isBorder={false}>
          <p>
            <span>
              <img src="src/assets/images/icons/icon-howto.svg" alt="" />
            </span>
            THE MAKERS
          </p>
        </Button>
        <Button onClickFnc={() => handleModalOpen('members')} isBorder={false}>
          <p>
            <span>
              <img src="src/assets/images/icons/icon-makers.svg" alt="" />
            </span>
            THE MAKERS
          </p>
        </Button>
        <Button onClickFnc={() => handleModalOpen('ranking')} isBorder={false}>
          <p>
            <span>
              <img src="src/assets/images/icons/icon-ranking.svg" alt="" />
            </span>
            RANKING
          </p>
        </Button>
        <Button onClickFnc={() => handleModalOpen('login')} isBorder={true}>
          <p>
            <span>
              <img src="src/assets/images/icons/icon-login.svg" alt="" />
            </span>
            LOG IN
          </p>
        </Button>
      </HeaderInner>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
`;
const HeaderInner = styled.div`
  width: 100%;
  padding: 0 60px;
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
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

export default Header;
