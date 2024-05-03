import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { instance } from '../../api/axios';

const SnsLoginPage = () => {
  const location = useLocation();
  //   const navigate = useNavigate();
  // const handleOAuthSns = async (code:any) => {
  //     try {
  //         const response = await instance.get(`/oauth/login/kakao?code=${code}`)
  //         const data = response.data;
  //         navigate("/")
  //     } catch (error) {

  //     }
  // }
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // const code = searchParams.get('code');
    console.log(searchParams);
    alert(searchParams);

    // const accessToken = data?.headers.authorization;
    // alert(accessToken);
    // localStorage.setItem('accessToken', accessToken);
  }, []);
  return (
    <>
      <div>Processing...</div>
    </>
  );
};

export default SnsLoginPage;
