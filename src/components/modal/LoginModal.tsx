import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../layout/form/Input';
import ClosedModalButton from './ClosedModalButton';
import Button from '../layout/form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import {
  emailValidCheck,
  passwordValidCheck,
} from '../../utils/inputValidCheck';
import { useLoginSubmitMutation } from '../../hooks/useMutation';
import styled from 'styled-components';
import IconSnsGoogle from '../../assets/images/icons/icon-sns-google.svg';
import IconSnsKakao from '../../assets/images/icons/icon-sns-kakao.svg';
import { useGetSnsLogin } from '../../hooks/useQuery';

function LoginModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleModalOpen = (type?: string) => {
    type ? useSetIsModalClick(type) : useSetIsModalClick();
  };

  const useLoginSubmit = useLoginSubmitMutation();
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [userValid, setUserValid] = useState(true);
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const [snsName, setSnsName] = useState('');
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
    useLoginSubmit.mutate(loginInput);
    useSetIsModalClick();
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setUserValid(false);
    } else setUserValid(true);
  }, [loginInput]);

  const { data } = useGetSnsLogin(snsName);
  const handleSnsLoginClick = (name: string) => {
    setSnsName(name);
  };
  useEffect(() => {
    if (data) {
      window.location.href = data;
    }
  }, [handleSnsLoginClick]);

  return (
    <>
      <ClosedModalButton />
      <h2>로그인</h2>
      <LoginWrap>
        <LoginForm>
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
                  <p className="error">이메일 형식이 틀렸습니다.</p>
                ) : (
                  <p>확인</p>
                )
              ) : (
                <p className="error">이메일을 입력해주세요</p>
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
                  <p className="error">비밀번호 형식이 틀렸습니다.</p>
                ) : (
                  <p>확인</p>
                )
              ) : (
                <p className="error">비밀번호를 입력해주세요</p>
              )}
            </div>

            <Button
              isBorder={true}
              onClickFnc={handleLoginSubmit}
              type="submit"
              disabled={userValid}
            >
              <p>로그인</p>
            </Button>
          </form>
          <div>
            <Button
              isBorder={false}
              onClickFnc={() => handleModalOpen('findPassword')}
            >
              <p>비밀번호 찾기</p>
            </Button>
            <Button
              isBorder={false}
              onClickFnc={() => handleModalOpen('signup')}
            >
              <p>아직 계정이 없으신가요?</p>
            </Button>
          </div>
        </LoginForm>

        <SnsLoginForm IconSnsGoogle={IconSnsGoogle} IconSnsKakao={IconSnsKakao}>
          <h3>간편하게 시작하기</h3>
          <ul>
            <li className="sns-google">
              <Button
                isBorder={false}
                onClickFnc={() => handleSnsLoginClick('google')}
              >
                <p>구글로 시작하기</p>
              </Button>
            </li>
            <li className="sns-kakao">
              <Button
                isBorder={false}
                onClickFnc={() => handleSnsLoginClick('kakao')}
              >
                <p>카카오로 시작하기</p>
              </Button>
            </li>
          </ul>
        </SnsLoginForm>
      </LoginWrap>
    </>
  );
}
interface SnsIconInfo {
  IconSnsGoogle: string;
  IconSnsKakao: string;
}
const LoginWrap = styled.div`
  @media (max-height: 600px) {
    display: flex;
    width: 100%;
    gap: 40px;
  }
`;
const LoginForm = styled.div`
  flex: 1;
`;
const SnsLoginForm = styled.div<SnsIconInfo>`
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid #eeeeee;
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #555;
  }
  ul {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    li {
      height: 60px;
      width: 100%;
      text-align: center;
      border-radius: 10px;
      &.sns-google {
        background: #ececec;
        p {
          &::before {
            background: url(${(props) => props.IconSnsGoogle});
          }
          color: #56533d;
        }
      }
      &.sns-kakao {
        background: #fee500;
        p {
          &::before {
            background: url(${(props) => props.IconSnsKakao});
          }
          color: #181600;
        }
      }
      button {
        height: 100%;
        width: 100%;
        p {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 800;
          &::before {
            content: '';
            display: block;
            width: 27px;
            height: 27px;
          }
        }
      }
    }
  }
  @media (max-height: 600px) {
    flex: 1;
    margin-top: 0px;
    padding-top: 0px;
    padding-left: 40px;
    border-top: none;
    border-left: 1px solid #ddd;
    h3 {
      font-size: 14px;
    }
    ul {
      li {
        height: 50px;
        button {
          p {
            font-size: 14px;
          }
        }
      }
    }
  }
`;
export default LoginModal;
