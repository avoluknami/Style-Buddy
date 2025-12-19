import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage'
import StylesPage from './pages/StylesPage'; 
import BrandPage from './pages/BrandPage';
import CatalogPage from './pages/CatalogPage';
import './index.css';
import NewArrivalsPage from './pages/NewArrivalsPage';
function App() {
  return (
    <Router>
     
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/styles" element={<StylesPage />} />
        <Route path="/brands" element={<BrandPage />} />
        <Route path="/new" element={<NewArrivalsPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
      </Routes>
       
    </Router>

/* <Router>
<Routes>
  <Route path="/" element={<Header />} />
  <Route path="/styles" element={<StylesPage />} /> 
  <MainPage/> 
</Routes> */

)
}

export default App;