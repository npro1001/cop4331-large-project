import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './App.css';
import { LoginSignUp } from './pages/LoginSignUp/index.jsx';
import { Testpage } from './pages/Dashboard/Testpage.jsx';
import {AppContainer} from './components/styles/AppContainer.style';


function App() {
 return(
    <AppContainer>
      <Router>
        <div className = 'container'>
          <Routes>
            <Route path='/' element={<LoginSignUp/>} />
            <Route path='/testpage' element={<Testpage/>} />
            {/* <Route path='/spotifylogin'>
              <redirect to={{
                pathname: `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}`,
                // state: { referrer: currentLocation }
              }}/>
            </Route> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </AppContainer>

 );
  
}


export default App;