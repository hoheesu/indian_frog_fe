import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ClosedModalButton from './ClosedModalButton';

function MembersModal() {
  return (
    <>
      <ClosedModalButton />
      <h2>만든이들</h2>
      <MembersList>
        <li>
          <Link to="https://github.com/hoheesu" target="_blank">
            <ImageBox></ImageBox>
            <h3>김개굴</h3>
            <p>프론트 개발자</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/hoheesu" target="_blank">
            <ImageBox></ImageBox>
            <h3>김개굴</h3>
            <p>프론트 개발자</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/hoheesu" target="_blank">
            <ImageBox></ImageBox>
            <h3>김개굴</h3>
            <p>백엔드 개발자</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/hoheesu" target="_blank">
            <ImageBox></ImageBox>
            <h3>김개굴</h3>
            <p>백엔드 개발자</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/hoheesu" target="_blank">
            <ImageBox></ImageBox>
            <h3>김개굴</h3>
            <p>백엔드 개발자</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/hoheesu" target="_blank">
            <ImageBox></ImageBox>
            <h3>김개굴</h3>
            <p>백엔드 개발자</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/hoheesu" target="_blank">
            <ImageBox></ImageBox>
            <h3>김개굴</h3>
            <p>메인 디자이너</p>
          </Link>
        </li>
      </MembersList>
    </>
  );
}

const MembersList = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3px;
`;
const ImageBox = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 25px;
  border: 1px solid var(--color-black);
`;

export default MembersModal;
