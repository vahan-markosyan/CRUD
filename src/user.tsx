import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

interface IUser {
    id: number
    name: string
    surname: string
    age: number
    salary: number
}

export const User = () => {
    const { id } = useParams<{ id: string }>() //es pahy ?????????????
    const [user, setUser] = useState<IUser[]>([])
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IUser>()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3004/users/${id}`)
            .then(response => {
                setUser(response.data)
                setValue("name", response.data.name)
                setValue("surname", response.data.surname)
                setValue("age", response.data.age)
                setValue("salary", response.data.salary)
            })
            .catch(error => {
                console.log("Error fetching user:", error)
            })
    }, [id, setValue])

    const onSubmit = (data: IUser) => {
        axios.put(`http://localhost:3004/users/${id}`, data)
            .then(() => {
                navigate("/")
            })
            .catch(error => {
                console.log("Error updating user:", error)
            })
    }

    return (
        <div>
            {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
            {errors.surname && <p style={{color:"red"}}>{errors.surname.message}</p>}
            {errors.age && <p style={{color:"red"}}>{errors.age.message}</p>}
            {errors.salary && <p style={{color:"red"}}>{errors.salary.message}</p>}
            <h3>User</h3>
            {user && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Name
                        <input {...register("name", { required: "please enter your name" })} />
                    </label>
                    <label>Surname
                        <input {...register("surname", { required: "please enter your surname" })} />
                    </label>
                    <label>Age
                        <input {...register("age", { required: "please enter your age", pattern:/^(1[01][0-9]|120|[1-9][0-9]?)$/})} />
                    </label>
                    <label>Salary
                        <input {...register("salary", { required: "please enter your salary", pattern:/^(0|[1-9]\d*)(\.\d+)?$/})} />
                    </label>
                    <button>Save Changes</button>
                </form>
            )}
        </div>
    )
}

