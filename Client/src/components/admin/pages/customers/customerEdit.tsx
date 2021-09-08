import React, {useEffect, useState} from 'react';
import {Button, FormControlLabel, Radio, TextField} from "@material-ui/core";
import {RouteComponentProps, useParams} from 'react-router-dom';
import styled from "styled-components";
import {toast} from "react-toastify";
import IBooking from "../../../../models/IBooking";
import BookingService from "../../../../service/bookingService";
import Calendar from "react-calendar";
import moment from "moment";

const CustomerEdit: React.FC<RouteComponentProps> = (props) => {

    // @ts-ignore
    const {id} = useParams();

    const [booking, setBooking] = useState<IBooking>({
        time: 18,
        numberOfGuests: 6,
        customerName: "",
        date: "",
        customerEmail: ""
    })

    useEffect(() => {
        if (id !== "create")
            BookingService.getBookingById(id).then(res => {
                setBooking(res.data)
            }).catch(err => toast.error(err.response ? err.response.data.message : err.message))
    }, [id])

    const handleChange = (e: any) => {
        setBooking(booking => ({...booking, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // if (!booking.time || !booking.password || !booking.confirmPassword)
        //     return toast.warn("Fill All Fields")
        // else if (booking.password !== booking.confirmPassword)
        //     return toast.warn("Passwords are not similar")
        BookingService.saveBooking(booking).then(res => {
            props.history.push("/admin/customers")
        }).catch(err => toast.error(err.response ? err.response.data.message : err.message))
    }

    return (
        <Container onSubmit={handleSubmit}>
            <TextField autoComplete={"off"} name={"customerName"} onChange={handleChange} value={booking.customerName}
                       label={"Customer Name"}/>
            <TextField autoComplete={"off"} name={"customerEmail"} onChange={handleChange} value={booking.customerEmail}
                       label={"Customer Email"}/>
            <TextField autoComplete={"off"} name={"numberOfGuests"} type={"number"} onChange={handleChange}
                       value={booking.numberOfGuests} label={"Number Of Guests"}/>
            <label>
                Time :
                <FormControlLabel control={<Radio name={"time"} checked={booking.time === 18}
                                                  onChange={(e) => handleChange({target: {name: "time", value: 18}})}/>}
                                  label={"18"}/>
                <FormControlLabel control={<Radio name={"time"} checked={booking.time === 21}
                                                  onChange={(e) => handleChange({target: {name: "time", value: 21}})}/>}
                                  label={"21"}/>
            </label>
            <CalendarContainer>
                <Calendar onChange={(value: any) => handleChange({target: {name: "date", value  : moment(value).format("YYYY-MM-DD")}})}
                          value={booking.date ? new Date(+booking.date.split("-")[0],
                              (+booking.date.split("-")[1])-1, +booking.date.split("-")[2]):new Date()}/>
            </CalendarContainer>
            <Button type={"submit"} color={"primary"} variant={"contained"}>{booking._id ? "Save" : "Create"}</Button>
        </Container>
    );
};

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`

const Container = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 1rem !important;
  }
`

export default CustomerEdit;
