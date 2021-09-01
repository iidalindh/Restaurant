import http from './httpService';
import {AxiosResponse} from "axios";
import Booking from "../models/Booking";
import User from "../models/User";

const adminBookingEndPoints = "/admin"

export default class BookingService {

    static getBookings(date: string): Promise<AxiosResponse<Booking[]>> {
        return http.post(adminBookingEndPoints + "/getBookings", {date})
    }

    static cancelBooking(id: string): Promise<AxiosResponse<Booking[]>> {
        return http.get(adminBookingEndPoints + "/cancelBooking/" + id, )
    }

    static getBookingById(id: string): Promise<AxiosResponse<Booking>> {
        return http.get(adminBookingEndPoints +`/getBookingDetail/${id}`)
    }


    static saveBooking(booking: Booking): Promise<Booking> {
        if (booking._id) {
            return http.put(adminBookingEndPoints + `/saveBooking/${booking._id}`, booking)
        }
        return http.post(adminBookingEndPoints+"/saveBooking", booking);
    }
}
