import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Client from './pages/Client';
import Admin from './pages/Admin';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Navigate to='/client'/>}/>
          <Route path='/client' element={<Client/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
