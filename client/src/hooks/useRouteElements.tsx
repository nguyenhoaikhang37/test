import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import BoardContent from '../components/board/BoardContent'
import MainLayout from '../components/layout/MainLayout'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import { useAppSelector } from '../redux/store'
import MessageContent from '../components/message/MessageContent'

const paths = {
  landing: '/',
  login: '/login',
  register: '/register',

  team: '/team/:teamId',
  board: '/team/:teamId/board/:boardId',
  channel: '/team/:teamId/channel/:channelId',
  group: '/team/:teamId/group/:groupId',
  message: '/team/:teamId/message/:messageId'
}

function PrivateRoute() {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function PublicOnlyRoute() {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: paths.landing,
      element: <LandingPage />
    },
    {
      path: '/',
      element: <PublicOnlyRoute />,
      children: [
        {
          path: paths.login,
          element: <Login />
        },
        {
          path: paths.register,
          element: <Register />
        }
      ]
    },
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: paths.team,
          element: <MainLayout />
        },
        {
          path: paths.board,
          element: (
            <MainLayout>
              <BoardContent />
            </MainLayout>
          )
        },
        {
          path: paths.channel,
          element: (
            <MainLayout>
              <MessageContent />
            </MainLayout>
          )
        },
        {
          path: paths.group,
          element: (
            <MainLayout>
              <MessageContent />
            </MainLayout>
          )
        },
        {
          path: paths.message,
          element: (
            <MainLayout>
              <MessageContent />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}
