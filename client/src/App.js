import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './App.css';
import { LoginSignUp } from './pages/LoginSignUp/index.jsx';
import { EmailSent } from './pages/LoginSignUp/emailSent.jsx';
import { Testpage } from './pages/Dashboard/testpage.jsx';
import { PasswordReset } from './pages/passwordReset/passwordReset.jsx';
import {AppContainer} from './components/styles/AppContainer.style';
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import { useSelector } from 'react-redux'


function App() {
const {user} = useSelector((state) => state.auth);
 return( <>
    <AppContainer>
      <Router>
        <div className = 'container'>
          <Routes>
            <Route path='/' element={<LoginSignUp/>} />
            <Route path='/testpage' element={<Testpage/>} />
            <Route path='/verification_sent' element={<EmailSent/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/profile/:id' element={user ? <Profile/> : <Navigate to="/"/>} />
            <Route path='/reset_password/:token' element={<PasswordReset/>} />
          </Routes>
        </div>
      </Router>
    <ToastContainer/>
    </AppContainer>
    </>
 );
  
}


export default App;