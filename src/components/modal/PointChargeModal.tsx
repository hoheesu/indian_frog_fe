import styled, { css } from 'styled-components';
import { useChargePointMutation } from '../../hooks/useMutation';
import ClosedModalButton from './ClosedModalButton';
import ImgIndianFrog1 from '../../assets/images/img-indianfrog1.svg';
import { useState } from 'react';
const PointChargeModal = () => {
  const usePointCharge = useChargePointMutation();
  const [clickedButtonIndex, setClickedButtonIndex] = useState<number | null>(
    null,
  );
  const [lastRandomNum, setLastRandomNum] = useState<number | null>(null);
  const numbers = [50, 100, 200];

  const handleCardClick = (index: number) => {
    if (clickedButtonIndex === null) {
      const randomIdx = Math.floor(Math.random() * numbers.length);
      const randomNum = numbers[randomIdx];

      setLastRandomNum(randomNum);
      usePointCharge.mutate({ point: randomNum });
      setClickedButtonIndex(index);
    }
  };

  return (
    <RandomCharge>
      <ClosedModalButton />
      <h2>포인트 랜덤 뽑기</h2>
      <p>랜덤카드를 선택하여 포인트를 충전해주세요!</p>
      <RandomCards>
        {numbers.map((_, index) => (
          <RandomCard key={index} $isClicked={clickedButtonIndex === index}>
            <button
              onClick={() => handleCardClick(index)}
              data-selected-num={lastRandomNum}
            ></button>
          </RandomCard>
        ))}
      </RandomCards>
    </RandomCharge>
  );
};
const RandomCharge = styled.div`
  h2 {
    font-size: 30px;
    margin-bottom: 10px;
  }
  p {
    font-size: 20px;
    color: #555;
  }
`;
const RandomCards = styled.ul`
  margin-top: 30px;
  display: flex;
  gap: 30px;
  width: 100%;
`;
const RandomCard = styled.li<{ $isClicked: boolean }>`
  button {
    &::before {
      content: '';
      top: 0;
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url(${ImgIndianFrog1});
      background-repeat: no-repeat;
      background-position: center;
      background-size: 60%;
      background-color: #98ca51;
      transform: rotateY(180deg);
      border-radius: 20px;
    }
    position: relative;
    flex: 1;
    min-width: 260px;
    height: 400px;
    border-radius: 20px;
    padding: 0;
    transform-style: preserve-3d;
    transition: all 0.7s ease-in-out;
    ${({ $isClicked }) =>
      $isClicked &&
      css`
        transform: rotateY(180deg);
      `}
    &::after {
      font-family: NPSfontBold;
      content: attr(data-selected-num);
      position: absolute;
      top: 0;
      font-size: 100px;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background: #eeb607;
      transform: rotateY(180deg);
      border-radius: 20px;
    }
  }
`;
export default PointChargeModal;
