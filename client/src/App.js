import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './App.css';
import { LoginSignUp } from './pages/LoginSignUp/index.jsx';
import { Testpage } from './pages/Dashboard/testpage.jsx';
import {AppContainer} from './components/styles/AppContainer.style';
import { Home } from './pages/home/Home'
import { Profile } from './pages/home/profile/Profile'


function App() {
 return( <>
    <AppContainer>
      <Router>
        <div className = 'container'>
          <Routes>
            <Route path='/' element={<LoginSignUp/>} />
            <Route path='/testpage' element={<Testpage/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/' element={<Profile/>} />
          </Routes>
        </div>
      </Router>
    <ToastContainer/>
    </AppContainer>
  </>
 );
  
}


export default App;