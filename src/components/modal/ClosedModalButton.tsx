import Button from '../layout/form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import styled from 'styled-components';
import CloseButton from '../../assets/images/icons/icon-close.svg';

function ClosedModalButton() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleClosedModal = () => {
    useSetIsModalClick();
  };
  return (
    <>
      <CloseBtnWrap>
        <Button onClickFnc={handleClosedModal} isBorder={false}>
          <p>
            <img src={CloseButton} alt="" />
          </p>
        </Button>
      </CloseBtnWrap>
    </>
  );
}
const CloseBtnWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  @media (max-height: 600px) {
    position: sticky;
    top: 0;
    right: 0;
    text-align: right;
  }
`;
export default ClosedModalButton;
