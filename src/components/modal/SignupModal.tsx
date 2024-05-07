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
  certifiedValidCheck,
  emailValidCheck,
  passwordValidCheck,
} from '../../utils/inputValidCheck';
import { useDebounce } from '../../hooks/useDebounce';
import styled from 'styled-components';
import {
  useCertifiedCodeMutation,
  useEmailCertifiedMutation,
} from '../../hooks/useMutation';

function SignupModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleModalOpen = (type?: string) => {
    type ? useSetIsModalClick(type) : useSetIsModalClick();
  };

  const [signupInput, setSignupInput] = useState({
    nickname: '',
    email: '',
    password: '',
    checkPassword: '',
    certifiedNum: '',
  });
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [emailDuplication, setEmailDuplication] = useState(false);
  const [nicknameDuplication, setNicknameDuplication] = useState(false);
  const [userValid, setUserValid] = useState(true);
  const userInput = useDebounce(signupInput, 500);
  const [isEmailCertified, setIsEmailCertified] = useState(false);
  const [isCertifiedNum, setIsCertifiedNum] = useState(false);
  const useEmailCertified = useEmailCertifiedMutation();
  const useCertifiedCode = useCertifiedCodeMutation();

  const handleInputOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInput({ ...signupInput, [name]: value });
    if (name === 'email') {
      emailValidCheck(value) ? setEmailValid(true) : setEmailValid(false);
    } else if (name === 'password') {
      passwordValidCheck(value) ? setPwValid(true) : setPwValid(false);
    } else if (name === 'certifiedNum') {
      certifiedValidCheck(value);
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
      if (
        signupInput.password === signupInput.checkPassword &&
        isCertifiedNum &&
        emailDuplication
      ) {
        setUserValid(false);
      } else setUserValid(true);
    } else setUserValid(true);
  }, [userInput]);

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

  const handleEmailCertified = () => {
    useEmailCertified.mutate(userInput.email);
    if (emailDuplication === true) {
      setIsEmailCertified(true);
    } else {
      setIsEmailCertified(false);
    }
  };
  const handleEmailCertifiedNumber = () => {
    useCertifiedCode.mutate({
      email: signupInput.email,
      code: signupInput.certifiedNum,
    });
  };
  useEffect(() => {
    if (useCertifiedCode.data?.success === true) {
      setIsCertifiedNum(true);
    }
  }, [useCertifiedCode.data]);

  return (
    <>
      <ClosedModalButton />
      <h2>회원가입</h2>
      <SignupForm className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>이메일</label>
          <InputBtnWrap>
            <Input
              type="email"
              name="email"
              value={signupInput.email}
              placeholder="이메일을 입력하세요"
              onChangeFnc={handleInputOnchange}
              disabled={isEmailCertified}
            />
            {!isEmailCertified ? (
              <Button
                type="submit"
                isBorder={false}
                onClickFnc={handleEmailCertified}
                disabled={!emailDuplication}
              >
                <p>이메일 확인</p>
              </Button>
            ) : null}
          </InputBtnWrap>
          {isEmailCertified ? (
            <InputBtnWrap>
              <TimerWithInput>
                <Input
                  type="text"
                  name="certifiedNum"
                  value={signupInput.certifiedNum}
                  placeholder="인증번호를 입력하세요"
                  onChangeFnc={handleInputOnchange}
                  disabled={isCertifiedNum}
                />
                <Timer>00:00</Timer>
              </TimerWithInput>
              <Button
                type="submit"
                isBorder={false}
                onClickFnc={handleEmailCertifiedNumber}
              >
                <p>인증하기</p>
              </Button>
            </InputBtnWrap>
          ) : null}
          {signupInput.email.trim() && !isEmailCertified ? (
            !emailValid ? (
              <p style={{ color: 'red' }}>이메일 형식이 틀렸습니다.</p>
            ) : emailDuplication ? (
              <p style={{ color: 'green' }}>사용가능한 이메일입니다.</p>
            ) : (
              <p style={{ color: 'red' }}>중복된 이메일입니다.</p>
            )
          ) : null}
          {isCertifiedNum && emailDuplication ? (
            <p style={{ color: 'green' }}>인증이 완료되었습니다.</p>
          ) : isEmailCertified && emailDuplication ? (
            <p style={{ color: 'red' }}>인증번호를 확인해주세요.</p>
          ) : null}
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
            <p style={{ color: 'red' }}>
              영문자, 특수문자, 숫자를 포함하여 8 ~ 15자리로 작성해주세요
            </p>
          ) : (
            <p></p>
          )}
          <p></p>
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
      </SignupForm>
      <div>
        <Button
          isBorder={false}
          onClickFnc={() => handleModalOpen('findPassword')}
        >
          <p>비밀번호 찾기</p>
        </Button>
        <Button isBorder={false} onClickFnc={() => handleModalOpen('login')}>
          <p>로그인하기</p>
        </Button>
      </div>
    </>
  );
}

const TimerWithInput = styled.div`
  width: 100%;
  position: relative;
  > input {
    width: 100%;
    padding-right: 70px !important;
  }

  & + button {
    min-width: 120px;
  }
`;
const Timer = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
`;
const InputBtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  & + div {
    margin-top: 5px;
    & + p {
      margin-top: 5px;
      font-size: 13px;
      color: #5a8900;
      &.error {
        color: #ff4a4a;
      }
    }
  }
  input {
    flex: 1;
    &:disabled {
      background: #ddd;
    }
  }
  button {
    @media (max-height: 600px) {
      height: 50px;
    }
    padding: 10px 30px;
    background: var(--color-main);
    color: var(--color-white);
    height: 60px;
    border-radius: 10px;
    font-size: 16px;
    &:disabled {
      background: #ddd;
      cursor: default;
    }
  }
`;
const SignupForm = styled.form`
  &.signup-form {
    @media (max-height: 600px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    button {
      margin-top: 0;
      grid-area: 3/2;
    }
    & + div {
      margin-top: 20px;
    }
  }
`;
export default SignupModal;
