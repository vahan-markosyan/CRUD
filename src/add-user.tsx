import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import './App.css'


export const AddUser = () => {


    const {register, handleSubmit, formState:{errors}, reset} = useForm()

    const navigate = useNavigate()

    const handleAddUser = (data) => {
        axios
        .post("http://localhost:3004/users",data)
        .then(response => {
            console.log(response.data)
            reset()
            navigate("/")
        })
        .catch(error => {
            console.error("There was an error adding the user!", error)
        })
    }
    return <>
    {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
    {errors.surname && <p style={{color:"red"}}>{errors.surname.message}</p>}
    {errors.age && <p style={{color:"red"}}>{errors.age.message}</p>}
    {errors.salary && <p style={{color:"red"}}>{errors.salary.message}</p>}
    <h3>Add User</h3>
    <form onSubmit={handleSubmit(handleAddUser)}>
        <input
        {...register("name", {required:"Please fill your name"})}
        placeholder="Name"
        
        />
        <input
        {...register("surname", {required:"Please fill your surnname"})}
        placeholder="Surname"
        
        />
        <input
        {...register("age", {required:"Please fill your age", pattern:/^(1[01][0-9]|120|[1-9][0-9]?)$/})}
        placeholder="Age"
        
        />
        <input
        {...register("salary", {required:"Please fill your salary", pattern:/^(0|[1-9]\d*)(\.\d+)?$/})}
        placeholder="Salary"
        
        />
        <button>Save</button>
        
    </form>
    </>
}