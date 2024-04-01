import React from 'react';
import Button from '../form/Button';
import styled from 'styled-components';
import { useIsModalStore } from '../../store/modal/CreateModalStore';

function Header() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleModalOpen = () => {
    useSetIsModalClick();
  };
  return (
    <HeaderContainer>
      <Button title="모달테스트버튼" onClickFnc={handleModalOpen} />
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: transparent;
`;
export default Header;
