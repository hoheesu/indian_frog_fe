import { ChangeEvent, useState } from 'react';
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

  const [emailValidation, setEmailValidation] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });

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
    useSetIsModalClick();
  };

  const handleToSignupModal = () => {
    useSetIsModalClick('signup');
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
            placeholder="이메일을 입력하세요"
            value={loginInput.email}
            onChangeFnc={handleInputOnChange}
          />
          {loginInput.email.trim() ? (
            !emailValidation ? (
              <p>이메일 형식이 틀렸습니다.</p>
            ) : (
              <p>확인</p>
            )
          ) : (
            <p>이메일을 입력해주세요</p>
          )}
        </p>
        <p>
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={loginInput.password}
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
