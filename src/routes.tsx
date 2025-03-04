import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from '@/app/Home';
import { GlobalContainer } from '@/components/GlobalContainer'

const MainRouter = () => {
  return (
    <BrowserRouter basename='/' >
      <Routes >
        <Route path="/" Component={GlobalContainer} >
          <Route index Component={Home} />
        </Route>
        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
