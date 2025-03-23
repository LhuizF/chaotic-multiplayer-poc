import { googleTagManager } from './googleTagManager'
import Routes from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
  googleTagManager()
  return (
    <>
      <Routes />
      <ToastContainer hideProgressBar pauseOnHover />
    </>
  )
}

export default App
