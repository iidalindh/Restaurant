import React from 'react';
import styled from 'styled-components';
import { colorScheme } from '../../styles';
export const Footer = () => {
    return (
        <FooterContainer>
            <h3>Kontaktuppgifter:</h3>
            <p>athena@Restaurang.se</p>
            <p>070-123-45-67</p>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${colorScheme.main};

    p {
        color: white;
        padding: 0;
        margin: 0;
    }

    h3 { 
        color: white;
        padding: 0;
        margin: 0;
    }
`;

