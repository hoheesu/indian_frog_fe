import { Outlet } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import ModalLayout from './components/modal/ModalLayout';
import Header from './components/layout/Header';
import styled from 'styled-components';
import { useIsModalStore } from './store/modal/CreateModalStore';

function App() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  return (
    <>
      <GlobalStyles />
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      {useIsModal && (
        <ModalLayout>
          {/* <CreateModal /> */}
          <p>모달 테스트</p>
        </ModalLayout>
      )}
    </>
  );
}
const MainContainer = styled.div`
  padding-top: 100px;
`;

export default App;
