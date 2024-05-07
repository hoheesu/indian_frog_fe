import Button from '../../components/layout/form/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ImgLogo from '../../assets/images/img-logo.svg';
import ImgStart from '../../assets/images/img-start.svg';
import { setScreeSize } from '../../utils/heightCheck';

function LandingPage() {
  const navigate = useNavigate();

  window.addEventListener('resize', () => setScreeSize());
  return (
    <LandingWrap>
      <LandingContainer>
        <H1>
          <img src={ImgLogo} alt="" />
        </H1>

        <Button isBorder={true} onClickFnc={() => navigate('/gamestory')}>
          <p>
            <img src={ImgStart} alt="" />
          </p>
        </Button>
      </LandingContainer>
    </LandingWrap>
  );
}

const LandingWrap = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: linear-gradient(
    90deg,
    rgba(163, 231, 111, 1) 0%,
    rgba(210, 239, 139, 1) 100%
  );
  padding: 20px 60px 0;
  overflow: hidden;
`;
const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  height: calc(var(--vh, 1vh) * 100);
  button {
    max-width: 450px;
    width: 100%;
    @media (max-height: 600px) or (max-width: 1110px) {
      max-width: 350px;
    }
    img {
      width: 100%;
    }
  }
`;
const H1 = styled.h1`
  max-width: 600px;
  max-height: 350px;
  @media (max-height: 600px) or (max-width: 1110px) {
    max-width: 250px;
  }
  img {
    width: 100%;
  }
`;

export default LandingPage;
