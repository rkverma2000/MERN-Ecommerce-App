import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";

const Header = () => {

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem('auth');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
            </span></button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand" >SuperMarkets</NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!auth.user ?
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link active" aria-current="page" >Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" >Login</NavLink>
                  </li>
                </> :
                <>

                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.fName}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li><NavLink className="nav-link" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink></li>
                      <li><NavLink onClick={handleLogout} to="/login" className="nav-link" >Logout</NavLink></li>
                    </ul>
                  </li>

                </>}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link" >Cart[{cart?.length}]</NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>

  );
}

export default Header;