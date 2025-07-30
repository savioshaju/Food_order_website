import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Menupage from './pages/Menupage';
import Restaurantpage from './pages/Restaurantpage';
import MainLayout from './layout/MainLayout';
import Cart from './pages/Cart';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Myorders from './pages/Myorders';
import Profile from './pages/Profile';
import Adminroutes from './routes/Adminroutes';
import Manageusers from './pages/Manageusers';
import ManageRestaurants from './pages/ManageRestaurants';
import ManageResMen from './pages/ManageResMen';
import ManageMenu from './pages/ManageMenu';
import Sellerroutes from './routes/Sellerroutes';
import CreateRes from './pages/CreateRes';
import Myres from './pages/Myres';
import LocalResturant from './pages/LocalResturant';
import MyMenu from './pages/MyMenu';
import About from './pages/About';
import 'flowbite';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path='Restaurant' element={<Restaurantpage />} />
        <Route path='Restaurant/:restaurantId' element={<Menupage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<Signup />} />
        <Route path='Cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path='orders' element={<ProtectedRoute><Myorders /></ProtectedRoute>} />
        <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='admin/users' element={<Adminroutes ><Manageusers /></Adminroutes>} />
        <Route path='admin/ManageRestaurants' element={<Adminroutes ><ManageRestaurants /></Adminroutes>} />
        <Route path='admin/ManageMenu' element={<Adminroutes ><ManageMenu /></Adminroutes>} />
        <Route path='admin/edit-menu/:restaurantId' element={<Adminroutes ><ManageResMen /></Adminroutes>} />
        <Route path='Seller/CreateRestaurants' element={<Sellerroutes><CreateRes /></Sellerroutes>} />
        <Route path='Seller/MyRestaurants' element={<Sellerroutes><Myres /></Sellerroutes>} />
        <Route path='Seller/edit-menu/:restaurantId' element={<Sellerroutes><MyMenu /></Sellerroutes>} />
        <Route path='NewRestaurant/:restaurantId' element={<LocalResturant />} />
        <Route path='Contact' element={<ContactPage />} />
        <Route path='About' element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
