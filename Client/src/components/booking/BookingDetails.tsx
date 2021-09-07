import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BookingGdprPopup } from "./BookingGdprPopup";
import {Input} from "../../styles";

export interface IBookingDetailsProps {
  date: string;
  time: number;
  numberOfGuests: number;
  customerName: string;
  customerEmail: string;
  checked: boolean;
  formChange(details: ICustomer): void;
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  checked: boolean;
}

export const BookingDetails = (props: IBookingDetailsProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    formSubmit();
  }, [checked]);

  function formSubmit() {
    const customerData: ICustomer = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      checked: checked,
    };
    props.formChange(customerData);
  }

  function toggleCheckbox(e: React.MouseEvent<HTMLButtonElement>) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValidation = re.test(String(email).toLowerCase());

    if (
      firstName !== null &&
      firstName !== "" &&
      lastName !== null &&
      lastName !== "" &&
      emailValidation === true
    ) {
      console.log(emailValidation);
      e.preventDefault();
      {
        checked ? setChecked(false) : setChecked(true);
      }
    }
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
            <DetailsPTag>{props.time}:00</DetailsPTag>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFirstName(e.target.value);
                setChecked(false);
              }}
            ></Input>
            <Input
              type="text"
              placeholder="EFTERNAMN"
              id="lastName"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLastName(e.target.value);
                setChecked(false);
              }}
            ></Input>
            <Input
              type="email"
              placeholder="MEJLADRESS"
              id="email"
              pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setChecked(false);
              }}
            ></Input>
            <GDPRConfirmDiv>
              {checked ? (
                <CheckButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    toggleCheckbox(e);
                  }}
                >
                  <i className="far fa-check-square"></i>
                </CheckButton>
              ) : (
                <CheckButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    toggleCheckbox(e);
                  }}
                >
                  <i className="far fa-square"></i>
                </CheckButton>
              )}
              <label htmlFor="confirmGDPR">
                Jag accepterar{" "}
                <a
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  villkoren
                </a>
              </label>
              <BookingGdprPopup trigger={popup}>
                <h3>Behandling av personuppgifter</h3>
                <p>
                  Behandling av personuppgifterHappy Consulting i Stockholm AB,
                  är personuppgiftsansvarig för de uppgifter du som kund lämnar
                  till Restaurang Athena org.nr 556361-9912. Vi behandlar
                  personuppgifter i enlighet med Personuppgiftslagen (PUL). Den
                  25 maj 2018 ersätts PuL av Dataskyddsförordningen (EU)
                  2016/679.
                </p>
                <h4>Personuppgifter som vi samlar in och behandlar</h4>
                <p>
                  Vi samlar endast in Personuppgifter som är relevanta för din
                  bokning. Den information som kan komma att samlas in är t.ex.
                  uppgifter om namn och e-postadress.
                </p>
                <h5>Så här använder vi dina personuppgifter</h5>
                <p>Restaurang Athena använder Personuppgifter för att:</p>
                <ul>
                  <li>bearbeta dina bokningar och beställningar.</li>
                  <li>
                    * kontakta dig via t.ex. e-post för att avisera om din
                    bokningsstatus eller information som ansluter till din
                    bokning före, under och efter din vistelse,diagnostisera
                    fel, optimera tekniken och kunna kontakta dig i händelse av
                    problem med en bokning.
                  </li>
                </ul>
                <p>
                  Du har enligt personuppgiftslagen möjlighet att utan kostnad
                  en gång per kalenderår få information om vår behandling av
                  dina uppgifter och kan när som helst begära rättning av
                  felaktiga uppgifter. Om du inte vill att dina uppgifter skall
                  finnas kvar i vårt register, vänligen meddela oss detta per
                  e-post (athenarestaurang@yahoo.com)
                </p>
                <h5>Utskick av information</h5>
                <p>
                  När du gjort en bokning hos oss använder vi dina
                  Personuppgifter för att skicka bokningsbekräftelse, viktig
                  information om den kommande vistelsen och erbjudanden kopplade
                  till vistelsen. Sådana utskick sker till den e-postadress som
                  du lämnat i samband med bokning. Efter vistelsen kan vi också
                  skicka e-post där vi tackar för besöket eller be att se över
                  kvarglömda saker.
                </p>
                <h5>Lagring och överföring av personuppgifter</h5>
                <p>
                  Uppgifterna lagras inte längre tid än två (2) år efter det att
                  kundförhållandet upphört. Vi kan lämna ut Personuppgifter till
                  tredje man, såsom t.ex. polis eller annan myndighet, om det
                  rör utredning av brott eller om vi annars är skyldiga att
                  lämna ut sådan uppgift med stöd av lag eller myndighetsbeslut.
                </p>
                <ClosePopup
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <i className="fas fa-times"></i>
                </ClosePopup>
              </BookingGdprPopup>
            </GDPRConfirmDiv>
          </Form>
        </ContactInfo>
      </BookingSection>
    </>
  );
};


const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;

  //Desktop
  @media (min-width: 1025px) {
    width: 75%;
  }
`;

const BookingSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90vw;

  //Desktop
  @media (min-width: 1025px) {
    width: 70vw;
  }
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

  //Desktop
  @media (min-width: 1025px) {
    width: 75%;
    :first-child {
      margin-top: 30px;
      padding: 0;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

  label {
    a {
      color: blue;
      text-decoration: underline;
    }
  }
`;

const CheckButton = styled.button`
  border: none;
  background-color: white;
`;

const ClosePopup = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;

  i {
    color: blue;
    font-size: 1.3rem;
  }
`;
