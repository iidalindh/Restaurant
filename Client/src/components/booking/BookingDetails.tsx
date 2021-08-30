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
  // const res = await axios.post("http://localhost:8000/booking", dataToSend);
  // console.log(res);

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

    console.log(customerData);
    props.formChange(customerData);
  } 

   
  return (
    <>
      <section className="booking-section">
        <hr />
        <div className="booking-info">
          <div>
            <p>DATUM</p>
            <p>{props.date}</p>
          </div>
          <div>
            <p>GÄSTER</p>
            <p>{props.numberOfGuests}</p>
          </div>
          <div>
            <p>TID</p>
            <p>{props.time}</p>
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
                  console.log(checked);
                  setChecked(!checked);
                  console.log(checked);
                  // checked ? setChecked(false) : setChecked(true);
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

