import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../layout/form/Button';
import Input from '../layout/form/Input';
import ClosedModalButton from './ClosedModalButton';
import { useChangePasswordMutation } from '../../hooks/useMutation';
import { passwordValidCheck } from '../../utils/inputValidCheck';
import styled from 'styled-components';
import IconView from '../../assets/images/icons/icon-view.svg';
import IconNoView from '../../assets/images/icons/icon-noview.svg';

const ChangePassWord = () => {
  const initialInputTypes = {
    updateInput: 'password',
    checkInput: 'password',
  };
  const [inputType, setInputType] = useState(initialInputTypes);
  const [pwValid, setPwValid] = useState(false);
  const [userValid, setUserValid] = useState(true);
  const useChangePassword = useChangePasswordMutation();
  const [changePWInput, setChangePWInput] = useState({
    originPassword: '',
    updatedPassword: '',
    checkPassword: '',
  });
  const handleViewPasswordClick = (inputKey: keyof typeof inputType) => {
    setInputType((prevTypes) => ({
      ...prevTypes,
      [inputKey]: prevTypes[inputKey] === 'text' ? 'password' : 'text',
    }));
  };
  const hancleChangePasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePWInput({ ...changePWInput, [name]: value });
    if (name === 'updatedPassword') {
      passwordValidCheck(value) ? setPwValid(true) : setPwValid(false);
    }
  };
  const handleChangePasswordClick = () => {
    useChangePassword.mutate({
      originPassword: changePWInput.originPassword,
      updatedPassword: changePWInput.updatedPassword,
    });
  };
  useEffect(() => {
    if (pwValid && userValid) {
      if (changePWInput.updatedPassword === changePWInput.checkPassword) {
        setUserValid(false);
      } else setUserValid(true);
    } else setUserValid(true);
  }, [changePWInput]);
  return (
    <>
      <ClosedModalButton />
      <h2>비밀번호 변경하기</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>현재 비밀번호</label>
          <Input
            type="password"
            name="originPassword"
            value={changePWInput.originPassword}
            onChangeFnc={(e) => hancleChangePasswordOnChange(e)}
            placeholder="비밀번호를 입력하세요."
          />
        </div>
        <div>
          <label>변경할 비밀번호</label>
          <PasswordInput>
            <Input
              type={inputType.updateInput}
              name="updatedPassword"
              value={changePWInput.updatedPassword}
              onChangeFnc={(e) => hancleChangePasswordOnChange(e)}
              placeholder="변경할 비밀번호를 입력하세요."
            />
            <ViewPasswordBtn
              onClick={() => handleViewPasswordClick('updateInput')}
            >
              {inputType.updateInput === 'password' ? (
                <img src={IconNoView} alt="" />
              ) : (
                <img src={IconView} alt="" />
              )}
            </ViewPasswordBtn>
          </PasswordInput>
          {changePWInput.updatedPassword.trim() ? (
            !pwValid ? (
              <p className="error">비밀번호 형식이 틀렸습니다.</p>
            ) : changePWInput.originPassword ===
              changePWInput.updatedPassword ? (
              <p className="error">
                변경할 비밀번호가 현재 비밀번호와 동일합니다.
              </p>
            ) : (
              <p>확인</p>
            )
          ) : (
            <p className="error">비밀번호를 입력해주세요</p>
          )}
        </div>
        <div>
          <label>비밀번호 확인</label>
          <PasswordInput>
            <Input
              type={inputType.checkInput}
              name="checkPassword"
              value={changePWInput.checkPassword}
              placeholder="비밀번호를 재입력하세요"
              onChangeFnc={hancleChangePasswordOnChange}
            />
            <ViewPasswordBtn
              onClick={() => handleViewPasswordClick('checkInput')}
            >
              {inputType.checkInput === 'password' ? (
                <img src={IconNoView} alt="" />
              ) : (
                <img src={IconView} alt="" />
              )}
            </ViewPasswordBtn>
          </PasswordInput>
          {changePWInput.updatedPassword !== changePWInput.checkPassword ? (
            <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
          ) : null}
        </div>
        <Button onClickFnc={handleChangePasswordClick}>
          <p>비밀번호 변경하기</p>
        </Button>
      </form>
    </>
  );
};

const PasswordInput = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding-right: 60px !important;
  }
`;
const ViewPasswordBtn = styled.button`
  position: absolute;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  img {
    width: 100%;
  }
`;

export default ChangePassWord;
