import { Outlet } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import GlobalFonts from './assets/styles/GlobalFonts';
import ModalPortal from './components/modal/ModalPortal';
import Header from './components/layout/Header';
import { useIsModalStore } from './store/modal/CreateModalStore';
import styled from 'styled-components';
import ModalLayout from './components/modal/ModalLayout';

function App() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  return (
    <>
      <GlobalStyles />
      <GlobalFonts />
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      {useIsModal && (
        <ModalPortal>
          <ModalLayout />
        </ModalPortal>
      )}
    </>
  );
}
const MainContainer = styled.div`
  padding-top: 100px;
`;

export default App;
