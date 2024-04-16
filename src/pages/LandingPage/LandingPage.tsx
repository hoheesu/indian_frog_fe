import Button from '../../components/layout/form/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <LandingWrap>
      <LandingContainer>
        <H1>
          <img src="src/assets/images/img-logo.svg" alt="" />
        </H1>
        <Button isBorder={true} onClickFnc={() => navigate('/main')}>
          <p>
            <img src="src/assets/images/img-start.svg" alt="" />
          </p>
        </Button>
      </LandingContainer>
    </LandingWrap>
  );
}
const LandingWrap = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(163, 231, 111, 1) 0%,
    rgba(210, 239, 139, 1) 100%
  );
`;
const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
`;
const H1 = styled.h1`
  font-size: 120px;
`;

export default LandingPage;
