import styled from 'styled-components';
import Button from '../layout/form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import iconInfo from '../../assets/images/icons/icon-info.svg';
import { useNavigate } from 'react-router-dom';
const LogoutModal = () => {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleClosedModal = () => {
    useSetIsModalClick();
  };
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate('/');
    localStorage.removeItem('accessToken');
    useSetIsModalClick();
  };
  return (
    <BasicModalWarp>
      <span>
        <img src={iconInfo} alt="" />
      </span>
      <h2>로그아웃</h2>
      <p>로그아웃 하시겠습니까?</p>
      <BtnWrap>
        <Button onClickFnc={handleClosedModal} isBorder={false}>
          <p>취소</p>
        </Button>
        <Button onClickFnc={handleLogoutClick} isBorder={false}>
          <p>확인</p>
        </Button>
      </BtnWrap>
    </BasicModalWarp>
  );
};
const BasicModalWarp = styled.div`
  text-align: center;
  h2 {
    font-size: 22px;
    margin: 20px 0;
  }
  p {
    font-size: 18px;
    color: #555;
  }
  @media (max-height: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
  button {
    width: 100%;
    height: 60px;
    background-color: #938f78;
    border-radius: 50px;
    + button {
      background-color: #5a8900;
    }
    p {
      text-align: center;
      color: #fff;
      font-weight: 500;
      font-size: 20px;
    }
  }
  @media (max-height: 600px) {
    margin-top: 10px;
    gap: 5px;
    button {
      height: 50px;
      min-width: 120px;
    }
  }
`;
export default LogoutModal;
