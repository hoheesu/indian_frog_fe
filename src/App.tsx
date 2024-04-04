import { Outlet } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import ModalPortal from './components/modal/ModalPortal';
import Header from './components/layout/Header';
import { useIsModalStore } from './store/modal/CreateModalStore';
import styled from 'styled-components';
import ModalTemplate from './components/modal/ModalTemplate';

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
        <ModalPortal>
          <ModalTemplate />
        </ModalPortal>
      )}
    </>
  );
}
const MainContainer = styled.div`
  padding-top: 100px;
`;

export default App;
