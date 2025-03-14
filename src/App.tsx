import Routes from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Routes />
      <ToastContainer hideProgressBar pauseOnHover />
    </>
  )
}

export default App
