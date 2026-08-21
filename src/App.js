import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Game from './pages/Gamestore';
import AddFunds from './pages/AddFunds';
import { BalanceProvider } from './BalanceContext';
import './App.css';
import ARKHome from './pages/ARKHome';
import DinoPackPage from './pages/DinoPackPage';
import BlueprintPage from './pages/BlueprintPage';
import EquipmentPage from './pages/EquipmentPage';
import StructuresPage from './pages/StructuresPage ';
import ArtifactsPage from './pages/ArtifactsPage';
import CavePage from './pages/CavePage';
import CheckoutPage from './pages/CheckoutPage';
import ROVHome from './pages/ROVHome'
import ROVShop from './pages/ROVShop';
import FortnightHome from './pages/FortniteHome';
import data from './pages/Fortnitedata';
import Cart from './pages/FortniteCart';
import Itemcard from './pages/FortniteItemcard';
import Login from './pages/login';
import Signup from './pages/Signup';


function App() {
  return (
    <BalanceProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/ARKHome" element={<ARKHome />} /> {/* เส้นทางที่นำไปสู่ ARKHome */}
          <Route path="/dino-pack" element={<DinoPackPage />} />
          <Route path="/blueprint" element={<BlueprintPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/artifacts" element={<ArtifactsPage />} />
          <Route path="/cave" element={<CavePage />} />
          <Route path="/structures" element={<StructuresPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/ROVHome" element={<ROVHome />} />
          <Route path="/ROVShop" element={<ROVShop />} />
          <Route path="/FortnightHome" element={<FortnightHome />} />
          <Route path="/data" element={<data />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Itemcard" element={<Itemcard />} />

        </Routes>
      </Router>
    </BalanceProvider>
  );
}

export default App;