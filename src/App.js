import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home/Home.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import {SiteNavbar} from "./components/Navbar/Navbar"
function App() {
  return (
    <div className="App">
      <SiteNavbar/>
     <Routes>
     <Route path="/home" element={
            
              <Home/>
            
          }/>
          </Routes>
    </div>
  );
}

export default App;
