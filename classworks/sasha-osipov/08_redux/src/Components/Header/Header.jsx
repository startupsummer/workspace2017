import React from 'react';
import './Header.css';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';

const Header = () => (
    <header className="header">
        <Container>
            <Logo />
        </Container>
    </header>
);  

export default Header;