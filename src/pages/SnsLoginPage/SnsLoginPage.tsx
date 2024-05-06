import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SnsLoginPage = () => {
  const navigate = useNavigate();
  // URL에서 쿼리 파라미터를 파싱하는 함수
  useEffect(() => {
    function getParameterByName(
      name: string,
      url: string = window.location.href,
    ): string | null {
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // accessToken 값 가져오기
    const accessTokenWithBearer = getParameterByName('accessToken');

    // 'Bearer ' 접두어 제거 및 undefined 상태 처리
    const accessToken = accessTokenWithBearer
      ? accessTokenWithBearer.replace('Bearer%20', '')
      : '';

    // Local storage에 저장
    if (accessToken) {
      // accessToken이 비어있지 않은 경우에만 실행
      localStorage.setItem('accessToken', accessToken);
      navigate('/');
    }
  }, [navigate]);

  return (
    <SnsLoginWrap>
      <h2>로그인중...</h2>
    </SnsLoginWrap>
  );
};
const SnsLoginWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  h2 {
    font-family: NPSfontBold;
    font-size: 40px;
  }
`;
export default SnsLoginPage;
