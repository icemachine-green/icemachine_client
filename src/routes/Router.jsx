import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App.jsx';
import MainPage from '../components/main/MainPage.jsx';
import ReviewPage from '../components/reviews/ReviewPage.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/reviews',
        element: <ReviewPage />,
      },
      // 앞으로 다른 페이지가 추가되면 이 배열에 추가합니다.
      // 예: { path: '/login', element: <LoginPage /> }
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
