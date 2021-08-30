import React, {useEffect, useState} from 'react';
import User from "../../models/User";
import {Button, TextField} from "@material-ui/core";
import {RouteComponentProps, useParams} from 'react-router-dom';
import AdminService from "../../service/adminService";
import styled from "styled-components";
import {toast} from "react-toastify";

interface EditUser extends User {
    confirmPassword?: ""
}

const AdminEdit: React.FC<RouteComponentProps> = (props) => {

    // @ts-ignore
    const {id} = useParams();

    const [admin, setAdmin] = useState<EditUser>({
        email: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        if (id !== "create")
            AdminService.getAdminById(id).then(res => {
                setAdmin(res.data)
            }).catch(err => toast.error(err.response ? err.response.data.message : err.message))
    }, [id])

    const handleChange = (e: any) => {
        setAdmin(admin => ({...admin, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!admin.email || !admin.password || !admin.confirmPassword)
            return toast.warn("Fill All Fields")
        else if (admin.password !== admin.confirmPassword)
            return toast.warn("Passwords are not similar")
        AdminService.saveAdmin(admin).then(res => {
            props.history.push("/app/admins")
        }).catch(err => toast.error(err.response ? err.response.data.message : err.message))
    }

    return (
        <Container onSubmit={handleSubmit}>
            <TextField autoComplete={"off"} name={"email"} onChange={handleChange} value={admin.email} label={"Email"}/>
            <TextField autoComplete={"off"} name={"password"} type={"password"} onChange={handleChange} value={admin.password}
                       label={"Password"}/>
            <TextField name={"confirmPassword"} type={"password"} onChange={handleChange} value={admin.confirmPassword}
                       label={"Confirm Password"}/>
            <Button type={"submit"} color={"primary"} variant={"contained"}>{admin._id ? "Save" : "Create"}</Button>
        </Container>
    );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 1rem;
  }
`

export default AdminEdit;
