import React from 'react';
import styled from 'styled-components';
import { colorScheme } from '../../styles';
export const Footer = () => {
    return (
      <FooterContainer>
        <InfoDiv>
          <h3>ATHENA</h3>
          <p>Götgatan 91</p>
          <p>11858</p>
          <p>Stockholm</p>
        </InfoDiv>
        <MediaDiv>
        <i className="fab fa-facebook-square"></i>
        <i className="fab fa-instagram"></i>
        </MediaDiv>
      </FooterContainer>
    );
}

const FooterContainer = styled.div`
    
    width: 100%;
    height: 120px;
    display: flex; 
    background: ${colorScheme.main};
    align-self: flex-end;

    p {
        color: white;
        padding: 0 5px;
        margin: 0;
    }

    h3 { 
        color: white;
        padding: 0 5px;
        margin: 0;
    }
`;

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const MediaDiv = styled.div`
    display: flex;
    width: 50%;
    justify-content: flex-end;
    align-items: flex-end;

    i {
        margin: 5px;
        font-size: 24px;
        color: white;
    }
`;

