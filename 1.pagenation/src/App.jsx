import { Outlet } from 'react-router-dom'
import './App.css'
import GlobalStyle from './util/GlobalStyle'
import styled from 'styled-components';
import Nav from './components/navigation';

const MainStyle = styled.main`
display: block;
`;

const Section = styled.section`
display: block;
`;

export const Layout = ()=>{
  return (
    <div>
      <MainStyle>
        <Section>
          <Outlet />
        </Section>
      </MainStyle>
    </div>
  )
}



function App() {
  return (
    <>
        <GlobalStyle />
        <Nav/>
    </>
  )
}

export default App
