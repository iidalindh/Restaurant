import React from 'react'
import { Navbar } from './navbar/Navbar';
import styled from 'styled-components';
import { Footer } from './footer/Footer';

export const Contact = () => {
    return (
        <>
        <Navbar/>
        <Container>
            <h1>KONTAKTUPPGIFTER:</h1>
            <p>Telefon: 070-123-45-67</p>
            <p>Email: athenarestaurang@yahoo.com</p>
        </Container>
        <Footer/>
        </>
    )
}

const Container = styled.div`
    margin-top: 100px;
    width: 100%;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 { 
        font-size: 32px;
    }
    p {
        font-size: 24px;
    }
`;
