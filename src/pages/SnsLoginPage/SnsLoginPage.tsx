import styled from 'styled-components';

const SnsLoginPage = () => {
  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    if (accessToken) {
      console.log('Access Token:', accessToken);
      // 이제 액세스 토큰을 사용하여 API 호출 등을 할 수 있습니다.
    } else {
      console.error('Access token not found in the URL');
    }
  };
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
