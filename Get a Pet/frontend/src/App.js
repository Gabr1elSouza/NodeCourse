import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

/*Components */
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Container from './components/Layout/Container'
import Message from './components/Layout/message'

/* PAGES*/
import Login from './components/pages/auth/Login'
import Home from './components/pages/Home'
import Register from './components/pages/auth/Register'
import Profile from './components/pages/User/profile'

/* context */
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Message/>
        <Container>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/user/profile' element={<Profile/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
      </Container>
      <Footer/>
    </UserProvider>
    </Router>
  );
}

export default App;
