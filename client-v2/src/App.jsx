import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CakeGallery from './pages/CakeGallery';
import CakeDetail from './pages/CakeDetail';
import CakeCustomizer from './pages/CakeCustomizer';
import CakeDesigner from './pages/CakeDesigner';
import CartView from './pages/CartView';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<CakeGallery />} />
          <Route path="/cake/:id" element={<CakeDetail />} />
          <Route path="/customize" element={<CakeCustomizer />} />
          <Route path="/ai-designer" element={<CakeDesigner />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
