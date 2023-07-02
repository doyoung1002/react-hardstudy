import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import GlobalStyle from './util/globalStyle';
import SearchPage from './pages/search';

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
      <Route path="/" element={<LayOut />}>
        <Route index element={<SearchPage />}></Route>
      </Route>
    </Routes >
  );
}

function App() {
  return (<>
    <Nav />
  </>
  );
}


export default App
