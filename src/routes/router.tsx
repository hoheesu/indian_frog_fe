import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Main from '../pages/Main';
import LandingPage from '../pages/LandingPage/LandingPage';
import RuleGuidePage from '../pages/RuleGuidePage/RuleGuidePage';
import RankingPage from '../pages/RankingPage/RankingPage';
import GameRoomPage from '../pages/GameRoomPage/GameRoomPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/landing',
        element: <LandingPage />,
      },
      {
        path: '/guide',
        element: <RuleGuidePage />,
      },
      {
        path: '/ranking',
        element: <RankingPage />,
      },
      {
        path: '/gameroom',
        element: <GameRoomPage />,
      },
    ],
  },
]);
