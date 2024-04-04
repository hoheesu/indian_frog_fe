import Button from '../../components/form/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <LandingContainer>
      <H1>인디안 개구리</H1>
      <Button isBorder={true} onClickFnc={() => navigate('/')}>
        <p>START</p>
      </Button>
      <Button isBorder={true} onClickFnc={() => navigate('/guide')}>
        <p>HOW TO</p>
      </Button>
    </LandingContainer>
  );
}

const LandingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: max-content;
  transform: translate(-50%, -50%);
`;
const H1 = styled.h1`
  font-size: 120px;
`;

export default LandingPage;
