import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import {useNavigate, NavLink} from 'react-router-dom'
const Login = () => {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);
  // useEffect(()=>{
  //     axios.post('/api/v1/users/login')
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

  const onSubmit = (data) => {
    axios.post('/api/v1/users/login', data)
      .then((res) => {
        if(res.data.status == 200){
          navigate('/users/tasks')
        }
      })
      .catch((error) => {
        console.log(error)
        setMsg(error.response?.data.error || "server unreacheable")
      })
  }

  return (
    <div className="w-full justify-center text-xl my-5 text-black">
      <form
        className="flex flex-col m-auto items-center max-w-96 bg-slate-800 rounded-md py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-4 text-white ">Login</h1>
        <input
          className="m-2 p-2 rounded-sm"
          {...register("email", { required: true })}
          placeholder="email"
        />
        <input
          className="m-2 p-2 rounded-sm"
          {...register("password", { required: true })}
          placeholder="password"
          type="password"
        />
        <input
          className="w-60 bg-green-500 text-white rounded-sm cursor-pointer p-2 m-2  active:bg-fuchsia-700 font-bold"
          type="submit"
        />
        <h1 className='text-sm text-white'>Don't have an account? <NavLink to='/users/register' className="text-fuchsia-400 hover:text-fuchsia-700">Register</NavLink> now</h1>
      </form>
      <div className="text-center text-white">{msg}</div>
    </div>
  )
}

export default Login