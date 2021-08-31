import React, { useEffect, useState } from "react";
import styled from "styled-components";


interface IBookingDetailsProps {
  date: string;
  time: number;
  numberOfGuests: number;
  customerName: string;
  customerEmail: string;
  checked: boolean;
  formChange(details: object): void;
}



export const BookingDetails = (props: IBookingDetailsProps) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    formSubmit();
  }, [checked]);

  function formSubmit() {
    const customerData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      checked: checked,
    };
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
          <Form>
            <Input
              type="text"
              placeholder="FÖRNAMN"
              id="firstName"
              required
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></Input>
            <Input
              type="text"
              placeholder="EFTERNAMN"
              id="lastName"
              required
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></Input>
            <Input
              type="email"
              placeholder="MEJLADRESS"
              id="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
            <GDPRConfirmDiv>
              <Input
                type="checkbox"
                id="confirmGDPR"
                name="confirmGDPR"
                onChange={() => {
                  setChecked(!checked);
                }}
              ></Input>
              <label htmlFor="confirmGDPR"> Jag accepterar villkoren</label>
            </GDPRConfirmDiv>
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

const GDPRConfirmDiv = styled.div`
  display: flex;
`;

