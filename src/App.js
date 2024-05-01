import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Page/SignUp';
import AdminWrapper from './Wrappers/AdminWrapper';
import Login from './Page/Login';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employer/*" element={<AdminWrapper  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
