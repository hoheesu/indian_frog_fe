import styled from 'styled-components';
import Button from '../layout/form/Button';
import ClosedModalButton from './ClosedModalButton';
import ImgBannerTitle from '../../assets/images/img-banner-title.svg';
import ImgRule01 from '../../assets/images/img-gamerule-01.png';
import ImgRule02 from '../../assets/images/img-gamerule-02.png';
import ImgRule03 from '../../assets/images/img-gamerule-03.png';
import ImgRule04 from '../../assets/images/img-gamerule-04.png';
import ImgRule05 from '../../assets/images/img-gamerule-05.png';
import ImgRule06 from '../../assets/images/img-gamerule-06.png';
import ImgRule07 from '../../assets/images/img-gamerule-07.png';
import ImgRule08 from '../../assets/images/img-gamerule-08.png';
import ImgRule09 from '../../assets/images/img-gamerule-09.png';
import ImgRule10 from '../../assets/images/img-gamerule-10.png';
import ImgRule11 from '../../assets/images/img-gamerule-11.png';
import ImgRule12 from '../../assets/images/img-gamerule-12.png';
import ImgRuleCheck from '../../assets/images/img-gamerule-check.png';
import ImgRuleRaise from '../../assets/images/img-gamerule-raise.png';
import ImgRuleDie from '../../assets/images/img-gamerule-die.png';
import ImgRuleWin from '../../assets/images/img-gamerule-win.png';

import { useState } from 'react';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
const HowtoModal = () => {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const [currentStep, setCurrentStep] = useState(0);
  const handleNextStep = () => {
    if (currentStep === 4) {
      useSetIsModalClick();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  return (
    <>
      <ClosedModalButton />
      <HowtoWrap>
        <BannerTitle>게임규칙</BannerTitle>
        <GameRuleStep>
          {currentStep === 0 && (
            <StepCont>
              <StepList>
                <li>
                  <picture>
                    <img src={ImgRule01} alt="" />
                  </picture>
                  <Description>
                    <span>1</span>
                    <p>숫자 1~10까지의 숫자 카드 덱 2개를 사용한다.</p>
                  </Description>
                </li>
                <li>
                  <picture>
                    <img src={ImgRule02} alt="" />
                  </picture>
                  <Description>
                    <span>2</span>
                    <p>
                      라운드 종료 시 더 높은 숫자 카드를 가진 유저가 라운드에서
                      승리하고 배팅된 포인트를 모두 가져간다.
                    </p>
                  </Description>
                </li>
                <li>
                  <picture>
                    <img src={ImgRule03} alt="" />
                  </picture>
                  <Description>
                    <span>3</span>
                    <p>라운드 시작 시 플레이어는 각각 카드를 1장 받는다.</p>
                    <p>자신의 카드는 라운드 종료 시까지 확인할 수 없다.</p>
                  </Description>
                </li>
              </StepList>
            </StepCont>
          )}
          {currentStep === 1 && (
            <StepCont>
              <h2>
                <img src={ImgRuleCheck} alt="" />
              </h2>
              <StepList>
                <li>
                  <picture>
                    <img src={ImgRule04} alt="" />
                  </picture>
                  <Description>
                    <span>4</span>
                    <h3>선턴인 유저</h3>
                    <p>
                      게임에 참가한 유저 중 포인트가 더 적은 유저의 값 (최대
                      2000)만큼 베팅한다.
                    </p>
                  </Description>
                </li>
                <li>
                  <picture>
                    <img src={ImgRule05} alt="" />
                  </picture>
                  <Description>
                    <span>5</span>
                    <h3>후턴인 유저</h3>
                    <p>상대가 베팅한 포인트만큼 베팅한다.</p>
                  </Description>
                </li>
                <li>
                  <picture>
                    <img src={ImgRule06} alt="" />
                  </picture>
                  <Description>
                    <span>6</span>
                    <h3>둘 다 CHECK인 경우</h3>
                    <p>자신의 카드는 라운드 종료 시까지 확인할 수 없다.</p>
                  </Description>
                </li>
              </StepList>
            </StepCont>
          )}
          {currentStep === 2 && (
            <StepCont>
              <h2>
                <img src={ImgRuleRaise} alt="" />
              </h2>
              <StepList>
                <li>
                  <picture>
                    <img src={ImgRule07} alt="" />
                  </picture>
                  <Description>
                    <span>7</span>
                    <p>입력값 만큼 베팅한다.</p>
                  </Description>
                </li>
                <li>
                  <picture>
                    <img src={ImgRule08} alt="" />
                  </picture>
                  <Description>
                    <span>8</span>
                    <p>
                      RAISE 이후 CHEK나 DIE 가 나오면 베팅을 종료하고 라운드가
                      종료된다.
                    </p>
                  </Description>
                </li>
                <li>
                  <picture>
                    <img src={ImgRule09} alt="" />
                  </picture>
                  <Description>
                    <span>9</span>
                    <p>
                      RAISE 이후 CHECK 할 때 베팅할 포인트가 부족한 경우 모든
                      포인트가 베팅된다.
                    </p>
                  </Description>
                </li>
              </StepList>
            </StepCont>
          )}
          {currentStep === 3 && (
            <StepCont>
              <h2>
                <img src={ImgRuleDie} alt="" />
              </h2>
              <StepList>
                <li>
                  <Description>
                    <span>10</span>
                    <h3>라운드 종료</h3>
                    <p>
                      라운드를 종료하고 선택한 유저는 라운드 패배 처리 된다.
                    </p>
                  </Description>
                  <Description>
                    <h3>승리한 유저</h3>
                    <p>승리한 유저는 베팅된 포인트를 모두 획득한다.</p>
                  </Description>
                  <Description>
                    <h3>라운드 종료시</h3>
                    <p>
                      라운드 종료 시 두 명의 카드 값이 같을 경우 무승부 처리
                      또는 임의로 지정한 덱의 카드를 가진 유저가 승리하도록
                      처리한다.
                    </p>
                  </Description>
                </li>
                <li>
                  <Description>
                    <span>11</span>
                    <h3>무승부</h3>
                    <p>
                      라운드에 베팅된 포인트를 다음 라운드로 이월하고 해당
                      라운드에서 승리한 유저가 포인트를 전부 가져간다.
                    </p>
                  </Description>
                </li>
                <li>
                  <Description>
                    <span>12</span>
                    <h3>베팅포인트가 부족한 경우</h3>
                    <p>
                      RAISE 이후 CHECK 할 때 베팅할 포인트가 부족한 경우 모든
                      포인트가 베팅된다.
                    </p>
                  </Description>
                </li>
              </StepList>
            </StepCont>
          )}
          {currentStep === 4 && (
            <StepCont>
              <h2>
                <img src={ImgRuleWin} alt="" />
              </h2>
              <StepList>
                <li>
                  <picture>
                    <img src={ImgRule10} alt="" />
                  </picture>
                  <Description>
                    <span>13</span>
                    <h3>승리 처리</h3>
                    <p>
                      1번덱 혹은 2번덱의 카드를 가진 유저가 승리처리 되고
                      포인트를 라운드에 걸린 포인트를 전부 가져간다.
                    </p>
                  </Description>
                </li>
                <li>
                  <picture>
                    <img src={ImgRule11} alt="" />
                  </picture>
                  <Description>
                    <span>14</span>
                    <h3>라운드 종료 </h3>
                    <p>
                      라운드 종료 시 보유한 포인트가 0인 유저는 다음 라운드를
                      진행할 수 없으며 즉시 게임에서 패배 처리 된다.
                    </p>
                  </Description>
                </li>
                <li>
                  <picture>
                    <img src={ImgRule12} alt="" />
                  </picture>
                  <Description>
                    <span>15</span>
                    <h3>3번의 라운드</h3>
                    <p>
                      3번의 라운드 진행이 끝난 후 3번의 라운드에서 더 많은
                      포인트를 획득한 유저가 게임에서 승리한다.
                    </p>
                  </Description>
                </li>
              </StepList>
            </StepCont>
          )}
        </GameRuleStep>
        <Button isBorder={false} onClickFnc={handleNextStep} type="submit">
          {currentStep === 4 ? <p>이해했어!</p> : <p>다음</p>}
        </Button>
      </HowtoWrap>
    </>
  );
};
const GameRuleStep = styled.div``;

const StepList = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 400px));
  gap: 40px;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    picture {
      height: 250px;
      max-width: 330px;
      display: flex;
      align-items: center;
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
  }
  @media (max-height: 600px) {
    gap: 50px;
    display: flex;
    flex-direction: column;
    li {
      margin: 0 auto;
      max-width: 400px;
      picture {
        height: 150px;
        max-width: 200px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
`;
const StepCont = styled.div`
  h2 {
    margin: 20px auto 40px;
    width: 270px;
    text-align: center;
    img {
      width: 100%;
    }
  }
  @media (max-height: 600px) {
    h2 {
      margin: 10px auto 40px;
      width: 150px;
    }
  }
`;
const Description = styled.div`
  & + div {
    margin-top: 40px;
  }
  h3 {
    font-family: 'NPSfontBold';
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 20px;
  }
  span {
    font-family: 'NPSfontBold';
    display: inline-flex;
    margin: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background: #5a8900;
    color: #fff;
    font-size: 16px;
  }
  p {
    word-break: keep-all;
    font-size: 16px;
    color: #56533d;
    line-height: 1.3;
    font-weight: 500;
    & + p {
      margin-top: 20px;
      color: #938f78;
    }
  }
  @media (max-height: 600px) {
    & + div {
      margin-top: 20px;
    }
    h3 {
      font-size: 16px;
      margin-bottom: 15px;
    }
    span {
      margin: 10px;
      width: 20px;
      height: 20px;
      font-size: 13px;
    }
    p {
      font-size: 14px;
      & + p {
        margin-top: 10px;
      }
    }
  }
`;
const HowtoWrap = styled.div`
  min-width: 500px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    &:hover {
      background: #81c008;
      color: #fff;
    }
    background: #5a8900;
    color: #fff;
    transition: all 0.1s ease-in-out;
    height: 60px;
    width: 100%;
    max-width: 430px;
    margin: 50px auto 0%;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 500;
  }
  @media (max-height: 600px) {
    padding-top: 0;
    button {
      height: 50px;
      max-width: 300px;
    }
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
  @media (max-height: 600px) {
    position: relative;
    inset: inherit;
    transform: translate(0);
    width: 100%;
    font-size: 16px;
    height: 53px;
    margin: 0 0 15px;
    background-size: 120px;
  }
`;
export default HowtoModal;
