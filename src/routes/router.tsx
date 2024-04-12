import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Main from '../pages/MainPage/Main';
import LandingPage from '../pages/LandingPage/LandingPage';
import RuleGuidePage from '../pages/RuleGuidePage/RuleGuidePage';
import RankingPage from '../pages/RankingPage/RankingPage';
import GameRoomPage from '../pages/GameRoomPage/GameRoomPage';
import GameRoomTest from '../pages/GameRoomTest';

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
      {
        path: '/gameroom',
        element: <GameRoomPage />,
      },
      {
        path: '/gameroomtest/:gameId',
        element: <GameRoomTest />,
      },
    ],
  },
]);
