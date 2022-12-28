import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import UserProfile from './pages/userProfile';
import './App.css';

//Pour l'appel d'API, procéder autrement et checker eriu coaching pro

function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route exact path={"/"} element={<Home/>}/>
        <Route exact path={"/"} element={<Connexion/>}/>
        <Route exact path={"/"} element={<Inscription/>}/>
        <Route exact path={"/"} element={<UserProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;
