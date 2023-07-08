import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css'
import GlobalStyle from './util/globalStyle';
import InfinitePage from './page/Infinite';

function LayOut() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

function Nav() {
  return (
    <Routes>
      <Route path='/' element={<LayOut />}>
        <Route index element={<InfinitePage />}>
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <>
      <Nav />
    </>
  )
}

export default App
