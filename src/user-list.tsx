import axios from "axios"
import { useEffect, useState } from "react"
import './App.css'
import { useNavigate } from "react-router-dom";


interface IUser {
    id: number;
    name: string;
    surname: string;
    age: number;
    salary: number;
}



export const UserList = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const navigate = useNavigate()

    const handleAdd = () => {
        navigate("/add")
    }

    
    const handleMove = (id: number) => {
        navigate("/user/"+id)
    };

    const handleDelete = (id: number, user: IUser) => {
        axios
            .delete("http://localhost:3004/users/"+user.id)  
            .then(() => {
                setUsers(users.filter(user => user.id !== id))
            })
            .catch(error => {
                console.log("Error with deleting the data", error)
            })
        }

    useEffect(() => {
    axios
    .get("http://localhost:3004/users")
    .then(response => {
        setUsers(response.data)
    })
    .catch(error => {
        console.log("Error with data server", error)
    })

},[])
    return <>
    <h1>User List</h1>
    <button onClick={handleAdd}>Add User +</button>
    <table>
        <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Surname</td>
                <td>Age</td>
                <td>Salary</td>
                <td>Actions</td>
            </tr>
        </thead>
        <tbody>
        {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.age}</td>
                            <td>{user.salary}</td>
                            <td>
                            <button onClick={() => handleDelete(user.id, user)}>Delete</button>
                            <button onClick={() => handleMove(user.id)}>Edit</button>
                            </td>
                        </tr>
                        
                    ))}
        </tbody>
    </table>

    </>
}