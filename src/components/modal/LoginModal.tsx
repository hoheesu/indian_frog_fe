import { useState } from 'react';
import Input from '../form/Input';
import ClosedModalButton from './ClosedModalButton';
import Button from '../form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import {
  emailValidCheck,
  passwordValidCheck,
} from '../../utils/inputValidCheck';

function LoginModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
  });
  const [_, setEmailValidation] = useState(false);
  // console.log(emailValidation);

  const handleModalOpen = (type?: string) => {
    type ? useSetIsModalClick(type) : useSetIsModalClick();
  };
  const handleInputOnChange = ({ e }: any) => {
    const { name, value } = e.target;
    setSignupInput({ ...signupInput, [name]: value });
    if (name === 'email') {
      emailValidCheck(value)
        ? setEmailValidation(true)
        : setEmailValidation(false);
    }
    if (name === 'password') {
      passwordValidCheck(value);
    }
  };
  const handleLoginSubmit = () => {
    handleModalOpen();
  };

  const handleToSignupModal = () => {
    handleModalOpen('signup');
  };

  return (
    <>
      <ClosedModalButton />
      <h2>로그인</h2>
      <form>
        <p>
          <label>이메일</label>
          <Input
            type="email"
            name="email"
            value={''}
            onChangeFnc={handleInputOnChange}
          />
        </p>
        <p>
          <label>비밀번호</label>
          <Input
            name="password"
            type="password"
            value={''}
            onChangeFnc={handleInputOnChange}
          />
        </p>

        <Button isBorder={true} onClickFnc={handleLoginSubmit} type="submit">
          <p>로그인</p>
        </Button>
      </form>
      <Button isBorder={false} onClickFnc={handleLoginSubmit}>
        <p>비밀번호 찾기</p>
      </Button>
      <Button isBorder={false} onClickFnc={handleToSignupModal}>
        <p>회원가입하기</p>
      </Button>
    </>
  );
}

export default LoginModal;
