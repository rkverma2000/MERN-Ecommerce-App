import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light p-3">
            <p className="text-center"> All right reserved ©supermarkets</p>
            <div className="text-center">
                <Link to="/about" />About
                |
                <Link to="/contact" />Contact
            </div>
        </footer>

    );
}

export default Footer;