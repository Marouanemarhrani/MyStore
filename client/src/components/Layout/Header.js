import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import toast from "react-hot-toast";
import useCategory from '../../hooks/useCategory';
import useService from '../../hooks/useService';
import SearchInput from '../Form/SearchInput';
import { useCart } from '../../context/cart';
import { Avatar, Badge } from 'antd';
import './Header.css'; 

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const services = useService();
  const handleLogout = () => {
    setAuth({
      ...auth, 
      user:null,
      token:"",
    });
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarTogglerDemo01" 
            aria-controls="navbarTogglerDemo01" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link 
              to="/" 
              className="navbar-brand">
                SmartFix
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className="nav-link">
                    Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                  <Link 
                    className="nav-link dropdown-toggle" 
                    to={"/services"}
                    data-bs-toggle="dropdown" 
                  >
                    Services
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link 
                        className="dropdown-item" 
                        to={"/services"}
                      >
                        All services
                      </Link>
                    </li>
                    {services?.map((c) => (
                      <li>
                        <Link 
                          className="dropdown-item" 
                          to={`/service/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link 
                    className="nav-link dropdown-toggle" 
                    to={"/categories"}
                    data-bs-toggle="dropdown" 
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link 
                        className="dropdown-item" 
                        to={"/categories"}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li>
                        <Link 
                          className="dropdown-item" 
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              {
                !auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink 
                      to="/register" 
                      className="nav-link" >
                        Register 
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/login" 
                      className="nav-link" >
                        Login
                    </NavLink>
                  </li>
                </>
                ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink 
                      className="nav-link dropdown-toggle" 
                      href="#" 
                      role="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false">
                      Welcome {auth?.user?.firstname}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink 
                          to={`/dashboard/${
                            auth?.user.role === 1 
                              ? "admin" 
                              : auth?.user.role === 2 
                              ? "technician" 
                              : "user"
                          }`}
                          className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login" 
                          className="dropdown-item" 
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
                )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink 
                    to="/cart" 
                    className="nav-link">
                      <FaShoppingCart />
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
