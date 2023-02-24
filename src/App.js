import './App.css';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert Alert={alert} />
          <div className="container">
            <Routes>
              <Route exat path='/home' element={<Home showAlert={showAlert} />} />
              <Route exat path='/about' element={<About />} />
              <Route exat path='/login' element={<Login showAlert={showAlert}/>} />
              <Route exat path='/signup' element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
