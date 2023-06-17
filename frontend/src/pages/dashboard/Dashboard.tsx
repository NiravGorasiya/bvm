import React, { useState, useEffect } from 'react';
import axios from "axios"
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit"

export default function Dashboard() {
    const history = useNavigate()
    const [userData, setUserData] = useState([])

    const userList = async () => {
        try {
            const headers = { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            const response = await axios.get("http://localhost:5000/api/user", { headers })
            setUserData(response?.data?.data?.data);
        } catch (error) {

        }
    }

    const deleteItem = async (id: string) => {
        try {
            const headers = { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            const response = await axios.delete(`http://localhost:5000/api/user/${id}`, { headers });
            userList()
        } catch (error) {

        }
    }

    useEffect(() => {
        userList()
    }, [])

    const userCreate = () => {
        history("/user/create")
    }

    const editItem = (id: string) => {
        history(`/user/edit/${id}`)
    }
    return (
        <>
            <Button variant="contained" onClick={userCreate} sx={{ justifyContent: "flex-end" }}>
                Create
            </Button>
            <Card sx={{ maxWidth: 345, marginTop: "122px", marginBottom: "22px" }}>
                {
                    userData?.map((user: any) => (
                        <>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLm3VcGMnAWAb4kvDIi18kVfnvg9YlXUab_w&usqp=CAU"
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div">
                                    Email: {user.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    phone:{user?.phone}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    phone:{user?.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => editItem(user?._id)} startIcon={<EditIcon />}>
                                    Edit
                                </Button>
                                <Button size="small" onClick={() => deleteItem(user?._id)} startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </CardActions>
                        </>
                    ))
                }
            </Card>
        </>
    );
}