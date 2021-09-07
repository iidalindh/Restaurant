export interface IBookingCalendarProps {
  date: string;
  pickDate(date: string): void;
  button18(btnState18: boolean): void;
  button21(btnState21: boolean): void;
  numberOfGuests: number;
}

export interface IBooking {
  numberOfGuests: number;
  date: string;
  time: number;
  customerName: string;
  customerEmail: string;
  checked: boolean;
}

export interface IBookingConfirmedProps {
  date: string;
  time: number;
  numberOfGuests: number;
}

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

export interface IBookingGdprPopupProps {
  children: React.ReactNode;
  trigger: boolean;
}

export interface IBookingGuestsProps {
  numberOfGuests: number;
  pickGuestAmount(guests: number): void;
}


export interface IBookingTimeProps {
    time: number;
    addTime(time: number): void;
    time18: boolean;
    time21: boolean;
  }