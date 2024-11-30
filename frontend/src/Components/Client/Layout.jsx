// Layout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer component

const Layout = ({ children, hideNavbar }) => {
  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      <Footer /> {/* Add Footer here */}
    </>
  );
};

export default Layout;