import styled from 'styled-components';
import Button from '../layout/form/Button';
import ClosedModalButton from './ClosedModalButton';
import ImgBannerTitle from '../../assets/images/img-banner-title.svg';

const HowtoModal = () => {
  return (
    <>
      <ClosedModalButton />
      <HowtoWrap>
        <BannerTitle>게임규칙</BannerTitle>
        <GameRuleStep>
          <StepList>
            <li></li>
            <li></li>
            <li></li>
          </StepList>
          <StepList>
            <li></li>
            <li></li>
            <li></li>
          </StepList>
          <StepList>
            <li></li>
            <li></li>
            <li></li>
          </StepList>
        </GameRuleStep>
        <Button isBorder={false} onClickFnc={() => {}} type="submit">
          <p>다음</p>
        </Button>
      </HowtoWrap>
    </>
  );
};
const GameRuleStep = styled.div``;
const StepList = styled.ol``;
const HowtoWrap = styled.div`
  min-width: 500px;
  padding-top: 40px;
  display: flex;
  justify-content: center;
  button {
    background: #5a8900;
    color: #fff;
    height: 60px;
    width: 100%;
    max-width: 430px;
    margin: 30px auto 0%;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 500;
  }
`;
const BannerTitle = styled.h3`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 229px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: NPSfontBold;
  padding-top: 15px;
  font-size: 30px;
  height: 111px;
  text-align: center;
  margin: 0 0 40px;
  font-weight: 800;
  background: url(${ImgBannerTitle}) no-repeat center;
  color: #fff;
`;
export default HowtoModal;
