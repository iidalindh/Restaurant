import http from './httpService';
import {AxiosResponse} from "axios";
import User from "../models/User";

const adminCrudEndPoints = "/admin/admins"
const adminAuthEndPoints = "/admin/login"

export default class AdminService {

    static login(email: string, password: string): Promise<AxiosResponse<User>> {
        return http.post(adminAuthEndPoints, {email, password})
    }

    static getAdmins(): Promise<AxiosResponse<User[]>> {
        return http.get(adminAuthEndPoints)
    }

    static saveAdmin(admin: User): Promise<User> {
        if (admin._id) {
            return http.put(adminAuthEndPoints + `/${admin._id}`, admin)
        }
        return http.post(adminAuthEndPoints, admin);
    }

    static deleteAdmin(adminId: string): Promise<void> {
        return http.delete(adminAuthEndPoints + `/${adminId}`)
    }
}
