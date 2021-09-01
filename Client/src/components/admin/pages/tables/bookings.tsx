import React, {useEffect, useState} from 'react';
import PageTitle from "../../components/PageTitle/PageTitle";
import Booking from "../../models/Booking";
import {Button} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {RouteComponentProps} from "react-router-dom";
// @ts-ignore
import {toast} from "react-toastify";
import BookingService from "../../service/bookingService";
import Calendar from "react-calendar";
import styled from "styled-components";
import moment from "moment";

interface TablesProps extends RouteComponentProps {

}



const Bookings: React.FC<TablesProps> = (props) => {

    const [bookingsTransformed, setBookingsTransformed] = useState<any[][]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [date, setDate] = useState(new Date())

    const handleDelete = (item: Booking) => {
        BookingService.cancelBooking(item._id || "").then(res => {
            updateData()
        }).catch(err => toast.error(err.response ? err.response.data.message : err.message))
    }

    function handleEdit(item: Booking) {
        props.history.push(`/admin/bookings/${item._id}`)
    }

    const transformData = (data: Booking[]) => {
        return data.map(item => ([item.customerName, item.numberOfGuests, item.time,
            <Button color={"primary"} onClick={() => handleEdit(item)} variant={"outlined"}>Edit</Button>,
            <Button color={"secondary"} onClick={() => handleDelete(item)} variant={"outlined"}>Cancel</Button>]))
    }

    const updateData = () => {
        BookingService.getBookings(getFormattedDate()).then(res => {
            setBookingsTransformed(transformData(res.data))
            setBookings(res.data);
        }).catch(err => toast.error(err.response ? err.response.data.message : err.message))
    }


    const getFormattedDate = () => {
        return moment(date).format("YYYY-MM-DD");
    }

    useEffect(updateData, [date])

    const handleReserveTable = () => {
        props.history.push(`/admin/bookings/create`)
    }

    return (
        <div>
            <PageTitle title={"Customers"}
                       button={<Button color={"secondary"} variant={"outlined"} onClick={handleReserveTable}>Reserve a
                           table</Button>}/>
            <CalendarContainer>
                <Calendar onChange={setDate} value={date}/>
            </CalendarContainer>
            <MUIDataTable
                title={`Customer List - ${getFormattedDate()}`}
                data={bookingsTransformed}
                options={{
                    selectableRows: "none",
                }}
                columns={columns}
            />
        </div>
    );
};

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`


const columns = [{
    name: "Customer Name",
    label: "Customer Name"
}, {
    name: "Guest Count",
    label: "Guest Count",
}, {
    name: "Time",
    label: "time",
}, {
    name: "Edit",
    label: "Edit",
}, {
    name: "Cancel",
    label: "Cancel",
}]


export default Bookings;
