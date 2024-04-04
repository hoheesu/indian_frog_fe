import { ChangeEvent, useState } from 'react';
import ClosedModalButton from './ClosedModalButton';
import Input from '../form/Input';
import Button from '../form/Button';
import {
  emailValidCheck,
  passwordValidCheck,
} from '../../utils/inputValidCheck';

function SignupModal() {
  const [signupInput, setSignupInput] = useState({
    nickname: '',
    email: '',
    password: '',
    checkPassword: '',
  });
  const [emailValidation, setEmailValidation] = useState(false);

  const handleInputOnchange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleToLoginModal = () => {};
  const handleSignupSubmit = () => {};

  return (
    <>
      <ClosedModalButton />
      <form onSubmit={(e) => e.preventDefault()}>
        <p>
          <label>이메일</label>
          <Input
            type="email"
            name="email"
            value={signupInput.email}
            placeholder="이메일을 입력하세요"
            onChangeFnc={handleInputOnchange}
          />
          <Button
            onClickFnc={() => {}}
            isBorder={true}
            disabled={!emailValidation}
          >
            중복체크
          </Button>
          {signupInput.email.trim() ? (
            !emailValidation ? (
              <span>이메일 형식이 틀렸습니다.</span>
            ) : (
              <span>확인</span>
            )
          ) : null}
        </p>
        <p>
          <label>닉네임</label>
          <Input
            type="text"
            name="nickname"
            value={signupInput.nickname}
            placeholder="닉네임을 입력하세요"
            onChangeFnc={handleInputOnchange}
          />
          <Button onClickFnc={() => {}} isBorder={true}>
            중복체크
          </Button>
          <span></span>
        </p>
        <p>
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            value={signupInput.password}
            placeholder="비밀번호를 입력하세요"
            onChangeFnc={handleInputOnchange}
          />
        </p>
        <p>
          <label>비밀번호 확인</label>
          <Input
            type="password"
            name="checkPassword"
            value={signupInput.checkPassword}
            placeholder="비밀번호를 재입력하세요"
            onChangeFnc={handleInputOnchange}
          />
        </p>
        <Button type="submit" isBorder={true} onClickFnc={handleSignupSubmit}>
          <p>회원가입</p>
        </Button>
      </form>
      <Button isBorder={false} onClickFnc={handleSignupSubmit}>
        <p>비밀번호 찾기</p>
      </Button>
      <Button isBorder={false} onClickFnc={handleToLoginModal}>
        <p>로그인하기</p>
      </Button>
    </>
  );
}

export default SignupModal;
