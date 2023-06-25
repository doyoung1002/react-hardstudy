
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../../App'
import CatList from '../../pages/catlist'



const Nav = ()=>{
    return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<CatList/>}/>
        </Route>
      </Routes>
    )
  }

export default Nav