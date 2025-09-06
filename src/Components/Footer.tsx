import { NavLink } from "react-router";
import historyImg from "../assets/images/history.png";
import historyImgSelected from '../assets/images/history-selected.png';
import homeImg from "../assets/images/home.png";
import homeImgSelected from '../assets/images/home-selected.png';
import plusImg from "../assets/images/plus.png";
import Container from "./Container";


const Footer = ({ className }: { className?: string }) => {
  return (
    <Container
      className={`flex items-center justify-around bg-darker-background overflow-visible h-14 px-6 py-2 ${className}`}
    >
      <NavLink to="/">
        {({ isActive }) => (
          <img src={isActive ? homeImgSelected : homeImg} alt="home" />
        )}
      </NavLink>
      <NavLink to="/create">
        {({isActive}) => 
          (<img src={plusImg} alt="plus" className={isActive ? "scale-130 transition-all duration-150 ease-in-out" : "size-10"}/>)}
      </NavLink>
      <NavLink to="/history">
        {({ isActive }) => (
          <img src={isActive ? historyImgSelected : historyImg} alt="history" />
        )}
      </NavLink>
    </Container>
  );
};

export default Footer;