import ClosedModalButton from './ClosedModalButton';
import styled from 'styled-components';
import Button from '../layout/form/Button';
import { useNavigate } from 'react-router-dom';
import { useIsModalStore } from '../../store/modal/CreateModalStore';

function RankingModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const navigate = useNavigate();
  const handleMoreBtnClick = () => {
    navigate('/ranking');
    useSetIsModalClick();
  };
  return (
    <>
      <ClosedModalButton />
      <ul>
        <RankItem>
          <p>RANK</p>
          <p>NICKNAME</p>
          <p>POINT</p>
        </RankItem>
        <RankItem>
          <p>1</p>
          <p>인디아나콘다</p>
          <p>123,456</p>
        </RankItem>
        <RankItem>
          <p>2</p>
          <p>인디아나콘다</p>
          <p>123,456</p>
        </RankItem>
        <RankItem>
          <p>3</p>
          <p>인디아나콘다</p>
          <p>123,456</p>
        </RankItem>
        <RankItem>
          <p>4</p>
          <p>인디아나콘다</p>
          <p>123,456</p>
        </RankItem>
        <RankItem>
          <p>5</p>
          <p>인디아나콘다</p>
          <p>123,456</p>
        </RankItem>
      </ul>
      <Button onClickFnc={handleMoreBtnClick} isBorder={false}>
        랭킹 더 보기 &rsaquo;
      </Button>
    </>
  );
}
const RankItem = styled.li`
  width: 500px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-black);
  height: 40px;
  &:nth-child(1) {
    font-weight: 800;
  }
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    font-weight: 600;
  }
  p {
    width: 25%;
    text-align: center;
    line-height: 40px;
  }
  p:nth-child(2) {
    width: 50%;
  }
`;

export default RankingModal;
