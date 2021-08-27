import React, { useState } from "react";
import styled from "styled-components";

interface IBookingDetailsProps {
  date: string;
  time: number;
  numberOfGuests: number;
  customerName: string;
  customerEmail: string;
  formChange(details: object): void;
}

export const BookingDetails = (props: IBookingDetailsProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  function formSubmit(e: any) {
    const customerData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    e.preventDefault();

    props.formChange(customerData);
  }

  return (
    <>
      <BookingSection>
        <HR />
        <BookingInfo>
          <div>
            <DetailsPTag>DATUM</DetailsPTag>
            <DetailsPTag>{props.date}</DetailsPTag>
          </div>
          <div>
            <DetailsPTag>GÄSTER</DetailsPTag>
            <DetailsPTag>{props.numberOfGuests}</DetailsPTag>
          </div>
          <div>
            <DetailsPTag>TID</DetailsPTag>
            <DetailsPTag>{props.time}</DetailsPTag>
          </div>
        </BookingInfo>
        <HR />

        <ContactInfo>
          <MainHeader>KONTAKTUPPGIFTER</MainHeader>
          <Form onSubmit={formSubmit}>
            <Input
              type="text"
              placeholder="FÖRNAMN"
              id="firstName"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></Input>
            <Input
              type="text"
              placeholder="EFTERNAMN"
              id="lastName"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></Input>
            <Input
              type="text"
              placeholder="MEJLADRESS"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
            <Button type="submit">BOKA NU</Button>
          </Form>
        </ContactInfo>
      </BookingSection>
    </>
  );
};

const Input = styled.input`
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  border-color: blue;
`;

const Button = styled.button`
  width: 70%;
  background-color: blue;
  color: white;
  padding: 10px;
  margin: 8px 0;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.5em;

  &hover {
    background-color: #213fea;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookingSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90vw;
`;

const BookingInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0;
`;

const HR = styled.hr`
  color: black;
  border-top: 1px solid grey;
  width: 90%;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.h1`
  text-align: center;
  font-size: 1.8rem;
`;

const DetailsPTag = styled.p`
  margin: 0;
  padding: 0;
`;
