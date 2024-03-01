import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Helmet from "react-helmet";

const Layout  = (props) => {
    return (
        <div>
        <Helmet>
        <meta charSet="utf-8"/>
        <meta name="description" content={props.description}/>
        <meta name="keywords" content={props.keywords}/>
        <meta name="author" content={props.author}/>
        <title>{props.title}</title>
        </Helmet>
        <Header/>
        <main>
        {props.children}
        </main>
        <Footer/> 
        </div>
    );
};

Layout.defaultProps = {
    title: "SuperMarkets - search now for shops nearby you",
    description: "Connect with the local shops nearby you",
    keywords:"nodejs, express.js, mongodb, react.js, mern",
    author: "Rahul Kumar Verma"
}

export default Layout;