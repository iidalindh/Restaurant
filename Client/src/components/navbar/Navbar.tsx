import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./navbar.scss";


export const Navbar = () => {
 

  const [clicked, setClicked] = useState(false);

  let url = useLocation();
  let history = useHistory();

  function reRoute() {
    history.push('/');
  }

  function handleClick() {
    if (clicked === false) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }

  function closeMenu() {
    setClicked(false);
  }

  return (
    <nav className="navbar">
      <img src="https://www.decolore.net/wp-content/uploads/2018/09/50-incredible-3d-logo-design-examples-for-inspiration-cover.png" alt="logo" className="nav-logo" onClick={reRoute} />
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/produkter" className={url.pathname === "/produkter" ? "nav-links active" : "nav-links"} onClick={closeMenu}>
            Produkter
          </Link>
        </li>
        <li>
          <Link to="/service" className={url.pathname.includes("/service") ? "nav-links active" : "nav-links"} onClick={closeMenu}>
            Tjänster
          </Link>
        </li>
        <li>
          <Link to="/bestallning" className={url.pathname === "/bestallning" ? "nav-links active" : "nav-links"} onClick={closeMenu}>
            Beställning
          </Link>
        </li>
      </ul>
    </nav>
  );
};
