import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './App.css';
import { LoginSignUp } from './pages/LoginSignUp/index.jsx';
import { Testpage } from './pages/Dashboard/testpage.jsx';
import {AppContainer} from './components/styles/AppContainer.style';


function App() {
 return( <>
    <AppContainer>
      <Router>
        <div className = 'container'>
          <Routes>
            <Route path='/' element={<LoginSignUp/>} />
            <Route path='/testpage' element={<Testpage/>} />
          </Routes>
        </div>
      </Router>
    <ToastContainer/>
    </AppContainer>
  </>
 );
  
}


export default App;