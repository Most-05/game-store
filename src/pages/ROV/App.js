import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Login from './Pages/Login';
import "./App.css"; 









function App() {
  return (
    <Router>
      <div>
        
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;