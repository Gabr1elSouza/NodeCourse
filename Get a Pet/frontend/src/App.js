import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

/*Components */
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Container from './components/Layout/Container'

/* PAGES*/
import Login from './components/pages/auth/Login'
import Home from './components/pages/Home'
import Register from './components/pages/auth/Register'

function App() {
  return (
    <Router>
      <Navbar/>
      <Container>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </Container>
    <Footer/>
    </Router>
  );
}

export default App;
