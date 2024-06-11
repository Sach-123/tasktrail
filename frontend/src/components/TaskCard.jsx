import React from "react";
import axios from 'axios'
const TaskCard = ({ data, onDelete }) => {

  return (
    <div className="text-center bg-black border border-fuchsia-500 w-72 h-60 p-2 m-2 rounded-md flex flex-col justify-between relative">
        <div className="absolute right-0 mr-2">
            <button onClick={() => onDelete(data._id)} className="bg-red-500 px-2 hover:bg-red-800">Delete</button>
        </div>
      <div>
        <h1 className="bg-slate-800 rounded">{data.title}</h1>
        <div className="h-40 overflow-auto mt-2 rounded px-2 ">
          {data.content}
        </div>
      </div>
      <div className="flex justify-between border-t">
        <h1>
          Status:{" "}
          <span
            className={`${
              data.status == "Due"
                ? "text-red-500"
                : data.status == "Pending"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {data.status}
          </span>
        </h1>
        <h1>
          Priority:{" "}
          <span
            className={`${
              data.priority == "High"
                ? "text-red-500"
                : data.priority == "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {data.priority}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default TaskCard;
