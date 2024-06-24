import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Tasks = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, control } = useForm();
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios
      .post("/api/v1/users/tasks", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data.error);
        if (error.response?.data.error.name === "TokenExpiredError") {
          alert("Session Expired!!! login again to continue");
          navigate("/users/login");
        } else {
          console.log(error.response?.data.error.message);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("/api/v1/users/add-task", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res ---> ", res);
        fetchData();
      })
      .catch((error) => {
        console.log("err ---->", error);
      });
    reset();
  };

  const handleDelete = (id) => {
    axios
      .get(`/api/v1/users/delete-tasks/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex    justify-between mt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between text-black  w-full flex-col lg:flex-row"
        >
          <div className="flex flex-col text-center">
            <label htmlFor="title" className="text-white">
              Task title
            </label>
            <input
              {...register("title", { required: true })}
              placeholder="title"
              className="p-2 mx-2 "
            />
          </div>

          <div className="flex flex-col text-center min-w-48 lg:w-full">
            <label htmlFor="content" className="text-white">
              Task Content
            </label>
            <input
              {...register("content", { required: true })}
              placeholder="content"
              className="p-2 mx-2 "
            />
          </div>

          <div className="flex flex-col text-center min-w-48">
            <label htmlFor="dueDate" className="text-white">
              Due Date/Time
            </label>
            <input
              {...register("dueDate")}
              type="datetime-local"
              className="p-2 mx-2 "
            />
          </div>

          <div className="flex flex-col text-center min-w-40">
            <label htmlFor="priority" className="text-white">
              Priority
            </label>

            <Controller
              name="priority"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field} className="p-2 mx-2">
                  <option value="None">None</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              )}
            />
          </div>

          <input
            type="submit"
            value="Add task+"
            className="text-white min-w-30 m-2 p-2 rounded-sm  bg-fuchsia-500 active:bg-fuchsia-700 cursor-pointer bottom-0 h-full"
          />
        </form>
      </div>

      <div className="flex flex-wrap sm:justify-center xl:justify-start">
        {data.map((task) => {
          return (
            <TaskCard key={task._id} data={task} onDelete={handleDelete} />
          );
        })}
      </div>
    </div>
  );
};
export default Tasks;
