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
      <Button onClickFnc={() => handleModalOpen('members')} isBorder={false}>
        <p>THE MAKERS</p>
      </Button>
      <Button onClickFnc={() => handleModalOpen('ranking')} isBorder={false}>
        <p>RANKING</p>
      </Button>
      <Button onClickFnc={() => handleModalOpen('login')} isBorder={true}>
        <p>Log in</p>
      </Button>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  width: 100%;
  padding: 0 60px;
  height: 100px;
  background-color: transparent;
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
`;
export default Header;
