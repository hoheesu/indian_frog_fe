import { ChangeEvent, useState } from 'react';
import Input from '../layout/form/Input';
import ClosedModalButton from './ClosedModalButton';
import Button from '../layout/form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import {
  emailValidCheck,
  passwordValidCheck,
} from '../../utils/inputValidCheck';
import { loginUser } from '../../api/userAuthApi';

function LoginModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });

    if (name === 'email') {
      emailValidCheck(value) ? setEmailValid(true) : setEmailValid(false);
    }
    if (name === 'password') {
      passwordValidCheck(value) ? setPwValid(true) : setPwValid(false);
    }
  };

  const handleLoginSubmit = async () => {
    await loginUser(loginInput);
    useSetIsModalClick();
  };

  const handleToSignupModal = () => {
    useSetIsModalClick('signup');
  };

  return (
    <>
      <ClosedModalButton />
      <h2>로그인</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>이메일</label>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={loginInput.email}
            onChangeFnc={handleInputOnChange}
          />
          {loginInput.email.trim() ? (
            !emailValid ? (
              <p>이메일 형식이 틀렸습니다.</p>
            ) : (
              <p>확인</p>
            )
          ) : (
            <p>이메일을 입력해주세요</p>
          )}
        </div>
        <div>
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={loginInput.password}
            onChangeFnc={handleInputOnChange}
          />
          {loginInput.password.trim() ? (
            !pwValid ? (
              <p>비밀번호 형식이 틀렸습니다.</p>
            ) : (
              <p>확인</p>
            )
          ) : (
            <p>비밀번호를 입력해주세요</p>
          )}
        </div>

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
