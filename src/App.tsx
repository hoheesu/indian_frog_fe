import { Outlet, useLocation } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import GlobalFonts from './assets/styles/GlobalFonts';
import ModalPortal from './components/modal/ModalPortal';
import Header from './components/layout/Header';
import { useIsModalStore } from './store/modal/CreateModalStore';
import ModalTemplate from './components/modal/ModalTemplate';
function App() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  const location = useLocation();
  return (
    <>
      <GlobalFonts />
      <GlobalStyles />
      {location.pathname.substring(1, 9) !== 'gameroom' ? <Header /> : null}
      <Outlet />
      {useIsModal && (
        <ModalPortal>
          <ModalTemplate />
        </ModalPortal>
      )}
    </>
  );
}

export default App;
