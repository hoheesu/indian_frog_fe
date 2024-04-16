import { ReactNode } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Main from '../pages/MainPage/Main';
import LandingPage from '../pages/LandingPage/LandingPage';
import RuleGuidePage from '../pages/RuleGuidePage/RuleGuidePage';
import RankingPage from '../pages/RankingPage/RankingPage';
import GameRoomPage from '../pages/GameRoomPage/GameRoomPage';
import GameRoomTest from '../pages/GameRoomTest';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem('accessToken');
  return isLoggedIn ? children : <Navigate to="/main" />;
};

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
        element: (
          <ProtectedRoute>
            <GameRoomPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/gameroomtest/:gameId',
        element: (
          <ProtectedRoute>
            <GameRoomTest />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
