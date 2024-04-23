import styled from 'styled-components';
import Input from '../../components/layout/form/Input';
import IconEnter from '../../assets/images/icons/icon-enter.svg';

const BattingInput = () => {
  return (
    <BattingWrap>
      <form action="">
        <Input
          type="number"
          value={''}
          onChangeFnc={() => {}}
          placeholder="Raise할 배팅금액을 입력해주세요"
        />
      </form>
    </BattingWrap>
  );
};
const BattingWrap = styled.div`
  position: relative;
  margin-top: 50px;
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #5a8900;
    background-image: url(${IconEnter});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
  }
  input {
    padding: 0 30px;
    background: #fff;
    width: 100%;
    height: 70px;
    border-radius: 50px;
    font-size: 18px;
    border: 4px solid #bfec80;
    &::-webkit-inner-spin-button {
      appearance: none;
    }
  }
`;
export default BattingInput;
