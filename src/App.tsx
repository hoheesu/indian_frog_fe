import { Outlet } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import GlobalFonts from './assets/styles/GlobalFonts';
import ModalPortal from './components/modal/ModalPortal';
import Header from './components/layout/Header';
import { useIsModalStore } from './store/modal/CreateModalStore';
import ModalTemplate from './components/modal/ModalTemplate';
function App() {
  const useIsModal = useIsModalStore((state) => state.isModal);

  return (
    <>
      <GlobalFonts />
      <GlobalStyles />
      <Outlet />
      <Header />
      {useIsModal && (
        <ModalPortal>
          <ModalTemplate />
        </ModalPortal>
      )}
    </>
  );
}

export default App;
