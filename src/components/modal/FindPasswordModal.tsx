import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../layout/form/Input';
import ClosedModalButton from './ClosedModalButton';
import { emailValidCheck } from '../../utils/inputValidCheck';
import Button from '../layout/form/Button';
import { checkEmailDuplication } from '../../api/userAuthApi';
import { useFindPasswordMutation } from '../../hooks/useMutation';

const FindPasswordModal = () => {
  const [findPwInput, setFindPwInput] = useState({
    email: '',
  });
  const [emailValid, setEmailValid] = useState(false);
  const [emailDuplication, setEmailDuplication] = useState(false);
  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFindPwInput({ ...findPwInput, [name]: value });

    if (name === 'email') {
      emailValidCheck(value) ? setEmailValid(true) : setEmailValid(false);
    }
  };
  const useFindPassword = useFindPasswordMutation();
  useEffect(() => {
    if (emailValid) {
      (async () => {
        (await checkEmailDuplication(findPwInput.email))
          ? setEmailDuplication(true)
          : setEmailDuplication(false);
      })();
    }
  }, [findPwInput.email]);
  const handleFindPasswordOnClick = () => {
    useFindPassword.mutate(findPwInput.email);
  };

  return (
    <>
      <ClosedModalButton />
      <h2>비밀번호 찾기</h2>
      <p>등록된 이메일로 임시 비밀번호가 전달됩니다.</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>이메일</label>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={findPwInput.email}
            onChangeFnc={handleInputOnChange}
          />
          {findPwInput.email.trim() ? (
            !emailValid ? (
              <p style={{ color: 'red' }}>이메일 형식이 틀렸습니다.</p>
            ) : emailDuplication ? (
              <p style={{ color: 'red' }}>등록되지 않은 이메일입니다.</p>
            ) : (
              <p style={{ color: 'green' }}>등록된 이메일입니다.</p>
            )
          ) : null}
        </div>
        <Button
          isBorder={true}
          onClickFnc={handleFindPasswordOnClick}
          type="submit"
          disabled={emailDuplication}
        >
          <p>비밀번호 찾기</p>
        </Button>
      </form>
    </>
  );
};

export default FindPasswordModal;
