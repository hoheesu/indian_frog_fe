import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ClosedModalButton from './ClosedModalButton';
import ImgLogoGray from '../../assets/images/img-logo-gray.svg';
import ImgCharacter01 from '../../assets/images/img-character01.png';
import ImgCharacter02 from '../../assets/images/img-character02.png';
import ImgCharacter03 from '../../assets/images/img-character03.png';
import ImgCharacter04 from '../../assets/images/img-character04.png';
import ImgCharacter05 from '../../assets/images/img-character05.png';
import ImgCharacter06 from '../../assets/images/img-character06.png';
import ImgCharacter07 from '../../assets/images/img-character07.png';

function MembersModal() {
  return (
    <>
      <ClosedModalButton />
      <h2>만든 개구리들</h2>
      <MembersList>
        <li>
          <Link to="https://github.com/Rosa-Eau" target="_blank">
            <ImageBox>
              <img src={ImgCharacter01} alt="" />
            </ImageBox>
            <h3>오진선</h3>
            <p>BE</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/hoheesu" target="_blank">
            <ImageBox>
              <img src={ImgCharacter02} alt="" />
            </ImageBox>
            <h3>윤준수</h3>
            <p>FE</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/holynow" target="_blank">
            <ImageBox>
              <img src={ImgCharacter03} alt="" />
            </ImageBox>
            <h3>함석원</h3>
            <p>FE</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/hoheesu" target="_blank">
            <ImageBox>
              <img src={ImgCharacter04} alt="" />
            </ImageBox>
            <h3>김지우</h3>
            <p>UI/UX DESINER</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/kjs4231" target="_blank">
            <ImageBox>
              <img src={ImgCharacter05} alt="" />
            </ImageBox>
            <h3>강주성</h3>
            <p>BE</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/eleunadeu" target="_blank">
            <ImageBox>
              <img src={ImgCharacter06} alt="" />
            </ImageBox>
            <h3>박용운</h3>
            <p>BE</p>
          </Link>
        </li>
        <li>
          <Link to="https://github.com/lsc713" target="_blank">
            <ImageBox>
              <img src={ImgCharacter07} alt="" />
            </ImageBox>
            <h3>이주호</h3>
            <p>BE</p>
          </Link>
        </li>
      </MembersList>
    </>
  );
}

const MembersList = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 0 30px 120px;
  &:after {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    width: 116px;
    height: 67px;
    filter: grayscale(1);
    background: url(${ImgLogoGray}) no-repeat bottom center;
    @media (max-height: 600px) {
      display: none;
    }
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px 0;
    &:nth-child(1),
    &:nth-child(3),
    &:nth-child(6) {
      img {
        transform: translateY(10px);
      }
    }

    > a {
      display: flex;
      flex-direction: column;
      gap: 10px;
      h3 {
        font-family: 'NPSfontBold';
        font-weight: 800;
        color: var(--color-main);
        font-size: 17px;
      }
      p {
        font-family: 'NPSfontRegular';
        font-size: 13px;
        color: #555;
      }
    }
  }
  @media (max-height: 600px) {
    gap: 10px;
    padding: 0 100px 50px;
  }
`;
const ImageBox = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
  @media (max-height: 600px) {
    width: 80px;
    height: 80px;
  }
`;

export default MembersModal;
