import { useEffect, useState } from 'react';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import wellFrog from '../../assets/images/story/wellFrog1.png';

function StoryEndModal() {
  const [useIsModal, useSetIsModalClick] = useIsModalStore((state) => [
    state.isModal,
    state.setIsModalClick,
  ]);

  const [secondsLeft, setSecondsLeft] = useState(3);
  const navigate = useNavigate();
  const pathToMain = () => {
    navigate('/main');
    useSetIsModalClick();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(timerId);
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [useIsModal]);

  useEffect(() => {
    if (secondsLeft === 0) {
      pathToMain();
    }
  }, [secondsLeft]);

  const progress = (3 - secondsLeft) / 3; // 타이머 진행도 계산

  return (
    <StoryEndModalContainer>
      <img src={wellFrog} alt="" />
      <Title>로비로 이동중입니다 ..</Title>
      <TimerContainer>
        <TimerBar $time={progress * 100} />
        <TimerWrap />
      </TimerContainer>
    </StoryEndModalContainer>
  );
}
const StoryEndModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 30px;
  align-items: center;
  width: 500px;
  @media (max-width: 900px) or (max-height: 600px) {
    width: 100%;
    height: 100%;
    padding: 20px 100px 70px;
  }
`;
const Title = styled.h3`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: var(--color-main);
`;
const TimerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 20px;
`;
interface TimerBarType {
  $time: number;
}
const TimerBar = styled.div<TimerBarType>`
  position: absolute;
  width: ${(props) => props.$time}%;
  height: 100%;
  background-color: var(--color-main);
  border-radius: 10px;
  z-index: 2;
`;
const TimerWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #eadfc2;
  border-radius: 10px;
  z-index: 1;
`;
export default StoryEndModal;
