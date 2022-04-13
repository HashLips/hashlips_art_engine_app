import logo from "../assets/logo.png";
import { FiMenu } from "react-icons/fi";
import smLogo from "../assets/sl_logo.png";
import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <FiMenu className="header_menu" onClick={() => props.toggleSideBar()} />
      <a target="_blank" href="https://hashlips.online/HashLips">
        <img src={logo} width="25" height="25" />
      </a>
      <a target="_blank" href="https://sketchylabs.io/">
        <img src={smLogo} width="25" height="25" />
      </a>
    </header>
  );
}

export default Header;
