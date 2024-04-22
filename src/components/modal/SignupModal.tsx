import { ChangeEvent, useEffect, useState } from 'react';
import ClosedModalButton from './ClosedModalButton';
import Input from '../layout/form/Input';
import Button from '../layout/form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import {
  checkEmailDuplication,
  checkNicknameDuplication,
  signupUser,
} from '../../api/userAuthApi';
import {
  emailValidCheck,
  passwordValidCheck,
} from '../../utils/inputValidCheck';
import { useDebounce } from '../../hooks/useDebounce';

function SignupModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const [signupInput, setSignupInput] = useState({
    nickname: '',
    email: '',
    password: '',
    checkPassword: '',
  });
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [emailDuplication, setEmailDuplication] = useState(false);
  const [nicknameDuplication, setNicknameDuplication] = useState(false);
  const [userValid, setUserValid] = useState(true);

  const userInput = useDebounce(signupInput, 500);

  const handleInputOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInput({ ...signupInput, [name]: value });
    if (name === 'email') {
      emailValidCheck(value) ? setEmailValid(true) : setEmailValid(false);
    } else if (name === 'password') {
      passwordValidCheck(value) ? setPwValid(true) : setPwValid(false);
    }
  };

  useEffect(() => {
    if (emailValid) {
      (async () => {
        (await checkEmailDuplication(userInput.email))
          ? setEmailDuplication(true)
          : setEmailDuplication(false);
      })();
    }
  }, [userInput.email]);

  // 닉네임 중복검사 디바운스
  useEffect(() => {
    if (userInput.nickname.trim().length > 1) {
      (async () => {
        (await checkNicknameDuplication(userInput.nickname))
          ? setNicknameDuplication(true)
          : setNicknameDuplication(false);
      })();
    }
  }, [userInput.nickname]);

  useEffect(() => {
    if (emailDuplication && nicknameDuplication && pwValid) {
      if (signupInput.password === signupInput.checkPassword) {
        setUserValid(false);
      } else setUserValid(true);
    } else setUserValid(true);
  }, [userInput]);

  const handleToLoginModal = () => {
    useSetIsModalClick('login');
  };
  const handleSignupSubmit = async () => {
    try {
      await signupUser(signupInput);
      alert('회원가입이 완료되었습니다!');
      useSetIsModalClick('login');
    } catch (error) {
      if (error) {
        // await alert(Promise.reject(error.response.data.message));
      }
    }
  };

  return (
    <>
      <ClosedModalButton />
      <h2>회원가입</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>이메일</label>
          <Input
            type="email"
            name="email"
            value={signupInput.email}
            placeholder="이메일을 입력하세요"
            onChangeFnc={handleInputOnchange}
          />
          {signupInput.email.trim() ? (
            !emailValid ? (
              <p style={{ color: 'red' }}>이메일 형식이 틀렸습니다.</p>
            ) : emailDuplication ? (
              <p style={{ color: 'green' }}>사용가능한 이메일입니다.</p>
            ) : (
              <p style={{ color: 'red' }}>중복된 이메일입니다.</p>
            )
          ) : (
            <p style={{ color: 'red' }}></p>
          )}
        </div>
        <div>
          <label>닉네임</label>
          <Input
            type="text"
            name="nickname"
            value={signupInput.nickname}
            placeholder="닉네임을 입력하세요"
            onChangeFnc={handleInputOnchange}
          />
          {signupInput.nickname.trim() ? (
            nicknameDuplication ? (
              <p style={{ color: 'green' }}>사용가능한 닉네임입니다.</p>
            ) : (
              <p style={{ color: 'red' }}>중복된 닉네임입니다.</p>
            )
          ) : null}
        </div>
        <div>
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            value={signupInput.password}
            placeholder="비밀번호를 입력하세요"
            onChangeFnc={handleInputOnchange}
          />
          {!pwValid ? (
            <p>
              비밀번호는 소문자, 특수문자, 숫자를 포함하여 8 ~15자리로
              작성해주세요
            </p>
          ) : (
            <p> </p>
          )}
          <p> </p>
        </div>
        <div>
          <label>비밀번호 확인</label>
          <Input
            type="password"
            name="checkPassword"
            value={signupInput.checkPassword}
            placeholder="비밀번호를 재입력하세요"
            onChangeFnc={handleInputOnchange}
          />
          {signupInput.password !== signupInput.checkPassword ? (
            <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
          ) : null}
        </div>
        <Button
          type="submit"
          isBorder={true}
          onClickFnc={handleSignupSubmit}
          disabled={userValid}
        >
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
