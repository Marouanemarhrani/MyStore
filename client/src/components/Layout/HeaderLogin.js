import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderLogin.css'; 

const HeaderLogin = () => {
  return (
    <>
      <nav className="headerLogin1 navbar navbar-expand-lg">
        <div className="headerLogin2 container-fluid">
          <div className="headerLogin5 collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="headerLogin6 navbar-brand">
              SmartFix
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderLogin;
