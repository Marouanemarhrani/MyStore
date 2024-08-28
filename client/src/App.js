import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Termsofservice from "./pages/Termsofservice";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/admin/AdminOrders";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import TechnicianDashboard from "./pages/technician/TechnicianDashboard";
import TechnicianRoute from "./components/Routes/TechnicianRoute";
import CreateAppointment from "./pages/technician/CreateAppointment";
import Appointments from "./pages/technician/Appointments";
import UpdateAppointment from "./pages/technician/UpdateAppointment";
import Help from "./pages/Help";
import CreateService from "./pages/admin/CreateService";
import ServicesAdmin from "./pages/admin/Servicesadmin";
import UpdateService from "./pages/admin/UpdateService";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:slug" element={<ServiceDetails />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/create-service" element={<CreateService />} />
          <Route path="admin/service/:slug" element={<UpdateService />} />
          <Route path="admin/services" element={<ServicesAdmin />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="/dashboard" element={<TechnicianRoute />}>
          <Route path="technician" element={<TechnicianDashboard />} />
          <Route path="technician/create-appointment" element={<CreateAppointment />} />
          <Route path="technician/appointment/:lastname" element={<UpdateAppointment />} />
          <Route path="technician/appointments" element={<Appointments />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path ="forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/terms-of-service" element={<Termsofservice />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
