import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoBagOutline } from "react-icons/io5";
import { useAuth } from '../../context/auth';
import toast from "react-hot-toast";
import useCategory from '../../hooks/useCategory';
import useService from '../../hooks/useService';
import SearchInput from '../Form/SearchInput';
import { useCart } from '../../context/cart';
import { Avatar, Badge } from 'antd';
import { AiOutlineUser } from "react-icons/ai";
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
      <nav className="header1 navbar navbar-expand-lg ">
        <div className="header2 container-fluid">
          <button 
            className="header3 navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarTogglerDemo01" 
            aria-controls="navbarTogglerDemo01" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            >
            <span className="header4 navbar-toggler-icon" />
          </button>
          <div className="header5 collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link 
              to="/" 
              className="header6 navbar-brand">
                SmartFix
            </Link>
            <ul className="header7 navbar-nav mb-2 mb-lg-0">
              <li className="header8 nav-item dropdown">
                  <Link 
                    className="header9 nav-link dropdown-toggle" 
                    to={"/services"}
                    data-bs-toggle="dropdown" 
                  >
                    Services
                  </Link>
                  <ul className="header10 dropdown-menu">
                    <li>
                      <Link 
                        className="header11 dropdown-item" 
                        to={"/services"}
                      >
                        All services
                      </Link>
                    </li>
                    {services?.map((c) => (
                      <li>
                        <Link 
                          className="header12 dropdown-item" 
                          to={`/service/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="header13 nav-item dropdown">
                  <Link 
                    className="header14 nav-link dropdown-toggle" 
                    to={"/categories"}
                    data-bs-toggle="dropdown" 
                  >
                    Categories
                  </Link>
                  <ul className="header15 dropdown-menu">
                    <li>
                      <Link 
                        className="header16 dropdown-item" 
                        to={"/categories"}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li>
                        <Link 
                          className="header17 dropdown-item" 
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="header31 nav-item">
                    <NavLink 
                      to="/help" 
                      className="header32 nav-link" >
                        Help 
                    </NavLink>
                  </li>
                </ul>
            <ul className="header18 navbar-nav mb-2 mb-lg-0">
              <SearchInput />
            </ul>
              <ul className="header19 navbar-nav ms-auto mb-2 mb-lg-0">
              {
                !auth.user ? (
                <>
                  <li className="header20 nav-item">
                    <NavLink 
                      to="/register" 
                      className="header21 nav-link" >
                        Register 
                    </NavLink>
                  </li>
                  <li className="header22 nav-item">
                    <NavLink 
                      to="/login" 
                      className="header23 nav-link" >
                        Login
                    </NavLink>
                  </li>
                </>
                ) : (
                <>
                  <li className="header24 nav-item dropdown">
                    <NavLink 
                      className="header25 nav-link dropdown" 
                      href="#" 
                      role="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false">
                      <AiOutlineUser />
                    </NavLink>
                    <ul className="header26 dropdown-menu">
                      <li>
                        <NavLink 
                          to={`/dashboard/${
                            auth?.user.role === 1 
                              ? "admin" 
                              : auth?.user.role === 2 
                              ? "technician" 
                              : "user"
                          }`}
                          className="header27 dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login" 
                          className="header28 dropdown-item" 
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
                )}
              <li className="header29 nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink 
                    to="/cart" 
                    className="header30 nav-link">
                      <IoBagOutline />
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
