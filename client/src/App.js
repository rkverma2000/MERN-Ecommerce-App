import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/product/:slug' element={<ProductDetails />} />
      <Route path='/cart' element={<CartPage />} />

      <Route path='/dashboard' element={<PrivateRoute />}>
        <Route path='user' element={<Dashboard />} />
        <Route path='user/profile' element={<Profile />} />
        <Route path='user/orders' element={<Orders />} />

      </Route>
      <Route path='/dashboard' element={<AdminRoute />}>
        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/create-category' element={<CreateCategory />} />
        <Route path='admin/create-product' element={<CreateProduct />} />
        <Route path='admin/products' element={<Products />} />
        <Route path='admin/product/:slug' element={<UpdateProduct />} />
        <Route path='admin/users' element={<Users />} />
        <Route path='admin/orders' element={<AdminOrders />} />

      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='*' element={<PageNotFound />} />

    </Routes>

  );
}

export default App;
