import React, { useState } from "react";
import styled from "styled-components";
import { IBookingGdprPopupProps } from "../models/interface";

export const BookingGdprPopup = (props: IBookingGdprPopupProps) => {
  return (
    <>
      {props.trigger ? (
        <PopupDiv>
          <PopupInnerDiv>{props.children}</PopupInnerDiv>
        </PopupDiv>
      ) : (
        <></>
      )}
    </>
  );
};

const PopupDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupInnerDiv = styled.div`
  position: relative;
  padding: 32px;
  width: 100%;
  max-width: 640px;
  background-color: white;
  max-height: 400px;
  overflow-y: scroll;

  //Desktop
  @media (min-width: 1025px) {
    max-height: 500px;
  }
`;
