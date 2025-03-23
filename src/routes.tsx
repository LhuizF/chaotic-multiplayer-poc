import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from '@/app/Home';
import { Game } from '@/app/Game';
import { JoinGame } from '@/app/JoinGame';
import { Waiting } from '@/app/Waiting';
import { ResultPage } from '@/app/Result';
import { GlobalContainer } from '@/components/GlobalContainer'

const MainRouter = () => {
  return (
    <BrowserRouter basename='/' >
      <Routes >
        <Route path="/" Component={GlobalContainer} >
          <Route index Component={Home} />
          <Route path='/game/:id' Component={Game} />
          <Route path='/waiting/:id' Component={Waiting} />
          <Route path='/join/:id' Component={JoinGame} />
          <Route path='/result/:id' Component={ResultPage} />
        </Route>
        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
