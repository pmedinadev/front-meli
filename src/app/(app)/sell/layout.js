'use client'; 

import React, { useState } from 'react';
import { AiOutlineDashboard, AiOutlineShop, AiOutlineOrderedList, AiOutlineBarChart } from 'react-icons/ai';
import Link from 'next/link';
import { Nav, NavItem, NavLink } from 'react-bootstrap';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Encabezado (Header) */}
      <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
        <h1 className="h3">Mi Dashboard</h1>
        <div>
          <Link href=" " className="text-white"><i className="bi bi-envelope"> </i></Link>
        </div>
      </header>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className={`bg-secondary ${isOpen ? 'col-3' : 'col-1'} d-flex flex-column`}>
          <button className="btn btn-light m-2" onClick={toggleSidebar}>
            {isOpen ? '←' : '→'}
          </button>
          <Nav className="nav flex-column" variant="pills">
            <NavItem>
                <NavLink href="/dashboard" active>
                    <AiOutlineDashboard className="me-2" />
                    {isOpen && 'Dashboard'}
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/products"className="text-white d-flex align-items-center">
                    <AiOutlineShop className="me-2" />
                    {isOpen && 'Products'}  
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/orders"className="text-white d-flex align-items-center">
                    <AiOutlineShop className="me-2" />
                    {isOpen && 'Orders'}    
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/reports"className="text-white d-flex align-items-center">
                    <AiOutlineShop className="me-2" />
                    {isOpen && 'Reports'}    
                </NavLink>
            </NavItem>
          </Nav>

        </div>

        {/* Contenido principal */}
        <div className="col bg-light p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
