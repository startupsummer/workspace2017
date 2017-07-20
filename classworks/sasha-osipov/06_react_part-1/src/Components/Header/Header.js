import React, { Component } from 'react';
import './Header.css';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';

const Header = () => (
    <header className="header">
        <Container classRepoHead={ false }>
            <Logo />
        </Container>
    </header>
);  

export default Header;