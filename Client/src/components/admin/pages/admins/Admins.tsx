import React, {useEffect, useState} from 'react';
import PageTitle from "../../components/PageTitle/PageTitle";
import User from "../../models/User";
import AdminAuthService from "../../service/adminAuthService";
import {toast} from "react-toastify";
import MUIDataTable from "mui-datatables";
import {Button} from "@material-ui/core";
import {RouteComponentProps} from "react-router-dom";

interface AdminsProps extends RouteComponentProps {

}

const Admins: React.FC<AdminsProps> = (props) => {

    const [admins, setAdmins] = useState<User[]>([]);
    const [adminsTransformed, setAdminsTransformed] = useState<any[][]>([]);

    const updateData = () => {
        AdminAuthService.getAdmins().then(res => {
            setAdminsTransformed(transformData(res.data))
            setAdmins(res.data);
        }).catch(err => toast.error(err.response ? err.response.data.message : err.message))
    }

    useEffect(updateData, [])

    const handleDelete = (item: User) => {
        AdminAuthService.deleteAdmin(item._id || "").then(res => {
            updateData()
        }).catch(err => toast.error(err.response ? err.response.data.message : err.message))
    }

    function handleEdit(item: User) {
        props.history.push(`/admin/admins/${item._id}`)
    }

    const transformData = (data: User[]) => {
        return data.map(item => ([item._id || "", item.email,
            <Button color={"primary"} onClick={() => handleEdit(item)} variant={"outlined"}>Edit</Button>,
            <Button color={"secondary"} onClick={() => handleDelete(item)} variant={"outlined"}>Delete</Button>]))
    }

    const handleAddAdmin = () => {
        props.history.push(`/admin/admins/create`)
    }

    return (
        <div>
            <PageTitle title={"Admins"}
                       button={<Button color={"secondary"} variant={"outlined"} onClick={handleAddAdmin}>Add
                           Admin</Button>}/>
            <MUIDataTable
                title="Admin List"
                data={adminsTransformed}
                options={{
                    selectableRows: "none",
                }}
                columns={columns}
            />
        </div>
    );
};

const columns = [{
    name: "_id",
    label: "id"
}, {
    name: "email",
    label: "email",
}, {
    name: "Edit",
    label: "Edit",
}, {
    name: "Delete",
    label: "Delete",
}]

export default Admins;
