import './App.css';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Chats from './pages/Chats/Chats'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Context } from "./context/Context";
import { useContext } from "react";

function App() {

  const { user, dispatch } = useContext(Context);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/chats" element={user? <Chats/> : <Login/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
