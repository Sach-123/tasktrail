import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [response, setResponse] = useState({})
  const [msg, setMsg] = useState();
  const onSubmit = (data) => {
    reset();
    axios.post('/api/v1/users/register', data).then((res)=> {
      setResponse(res)
      setMsg(res.data.message + ". Login to continue")
    }).catch((error) => {
      setMsg(error.response?.data.error || "server unreachable")
    })
    
  };

  return (
    <div className="w-full justify-center text-xl my-5 text-black">
      <form
        className="flex flex-col m-auto items-center max-w-96 bg-slate-800 rounded-md py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-4 text-white ">Register</h1>
        <input
          className="m-2 p-2 rounded-sm"
          {...register("username", { required: true })}
          placeholder="username"
        />
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
          className="w-60 bg-fuchsia-500 text-white rounded-sm cursor-pointer p-2 m-2  active:bg-fuchsia-700 font-bold"
          type="submit"
        />
      </form>
      <div className="text-center text-white">{msg}</div>
    </div>
  );
};

export default Register;
