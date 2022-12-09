import { Navbar, Dropdown, Avatar } from "flowbite-react";
import React from "react";
import { BsCurrencyExchange } from "react-icons/bs";

export function NavBar() {
  return (
    <Navbar fluid={true} rounded={true} className="fixed w-screen z-50">
      <Navbar.Brand href="#">
        <BsCurrencyExchange className="scale-150 mx-2 text-blue-600" />
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
          Corrency Converter
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
