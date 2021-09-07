import http from './httpService';
import {AxiosResponse} from "axios";
import IBooking from "../models/IBooking";

const adminBookingEndPoints = "/admin"

export default class BookingService {

    static getBookings(date: string): Promise<AxiosResponse<IBooking[]>> {
        return http.post(adminBookingEndPoints + "/getBookings", {date})
    }

    static cancelBooking(id: string): Promise<AxiosResponse<IBooking[]>> {
        return http.get(adminBookingEndPoints + "/cancelBooking/" + id,)
    }

    static getBookingById(id: string): Promise<AxiosResponse<IBooking>> {
        return http.get(adminBookingEndPoints + `/getBookingDetail/${id}`)
    }


    static saveBooking(booking: IBooking): Promise<IBooking> {
        if (booking._id) {
            return http.put(adminBookingEndPoints + `/saveBooking/${booking._id}`, booking)
        }
        return http.post(adminBookingEndPoints + "/saveBooking", booking);
    }
}
