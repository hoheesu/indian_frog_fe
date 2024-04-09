import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Main from '../pages/MainPage/Main';
import LandingPage from '../pages/LandingPage/LandingPage';
import RuleGuidePage from '../pages/RuleGuidePage/RuleGuidePage';
import RankingPage from '../pages/RankingPage/RankingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/guide',
        element: <RuleGuidePage />,
      },
      {
        path: '/ranking',
        element: <RankingPage />,
      },
    ],
  },
]);
