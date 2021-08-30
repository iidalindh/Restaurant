export default interface User {
    _id? : string,
    email: string,
    password: string,
    token?: string,
    role?: "admin" | "user"
}
