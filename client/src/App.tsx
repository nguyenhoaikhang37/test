import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useRouteElements from './hooks/useRouteElements'
import { userAction } from './redux/slices/user.slice'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const routeElements = useRouteElements()
  const dispatch = useDispatch()

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      dispatch(userAction.logout())
    })
  }, [dispatch])

  return (
    <>
      <ToastContainer />
      {routeElements}
    </>
  )
}

export default App
