import http from './httpService';
import {AxiosResponse} from "axios";
import User from "../models/User";

const adminCrudEndPoints = "/admin/admins"

export default class AdminAuthService {

    static getAdmins(): Promise<AxiosResponse<User[]>> {
        return http.get(adminCrudEndPoints)
    }

    static getAdminById(adminId: string): Promise<AxiosResponse<User>> {
        return http.get(adminCrudEndPoints + `/${adminId}`)
    }


    static saveAdmin(admin: User): Promise<User> {
        if (admin._id) {
            return http.put(adminCrudEndPoints + `/${admin._id}`, admin)
        }
        return http.post(adminCrudEndPoints, admin);
    }

    static deleteAdmin(adminId: string): Promise<void> {
        return http.delete(adminCrudEndPoints + `/${adminId}`)
    }
}
