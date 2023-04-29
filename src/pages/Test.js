import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

const Navbar = ({ visible }) => {
  return (
    <Nav visible={visible}>
      <NavTitle>Navigation Bar</NavTitle>
    </Nav>
  );
};

const App = () => {
    const infoWrapperRef = useRef(null);
    const [navVisible, setNavVisible] = useState(false);

    const handleScroll = useCallback(() => {
        if (infoWrapperRef.current) {
          const infoWrapperBottom =
            infoWrapperRef.current.offsetTop + infoWrapperRef.current.offsetHeight;
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
      
          setNavVisible(scrollTop >= infoWrapperBottom);
        }
      }, [infoWrapperRef]);
      
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
      
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [handleScroll]);
      

    return (
        <>
            <InfoWrapper ref={infoWrapperRef}>
                <h1>Content</h1>
                <p>Scroll down to see the navigation bar</p>
            </InfoWrapper>
            <InfoWrapper>
                <h2>Telecaster B-Boy</h2>
            </InfoWrapper>
            <Navbar visible={navVisible} />
        </>
    );
};

const Nav = styled.nav`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  background-color: #f2f2f2;
  position: fixed;
  width: 100%;
  height: 3em;
  z-index: 100;
  top: 0;
  left: 0;
`;

const NavTitle = styled.h2`
  color: #333;
`;

const InfoWrapper = styled.div`
  padding: 20px;
  min-height: 200vh;
`;

export default App;