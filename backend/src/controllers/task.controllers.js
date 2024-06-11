import { Task } from "../models/tasks.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// display task
// add task
// update task
// delete task
const allTask = asyncHandler(async (req, res) => {
  // find user from token
  // find all task associated with that user
  // compare current and due time to set status
  try {
    const user = req.user;
    if (!user) {
      throw new ApiError(404, "User is not authorised");
    }
    const data = await Task.find({ user: user._id });
  
    data.map(async (d) => {
      if (d.dueDate !== null) {
        if (d.status == "Pending") {
          const currentDateTime = new Date();
          const dueDT = new Date(d.dueDate);
          if (currentDateTime > dueDT) {
            const task = await Task.findById({ _id: d._id });
            task.status = "Due";
            await task.save({ validateBeforeSave: false });
            d.status = "Due";
          }
        }
      }
    });
  
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          data,
          `All tasks by ${user.username} fetched successfully`
        )
      );
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
});

const addTask = asyncHandler(async (req, res) => {
  // take information from user
  // check information
  // create document
  // save in database

  try {
    const { title, content, dueDate, priority } = req.body;
    if ([title, content].some((field) => field == null || field?.trim() === "")) {
      throw new ApiError(400, "Title and Content are required");
    }
    let dateObject;
    if (dueDate) {
      dateObject = new Date(dueDate);
      if (isNaN(dateObject.getTime())) {
        throw new ApiError(400, "Invalid datetime format");
      }
    }
  
    const user = req.user;
    const userId = user?._id;
    const task = await Task.create({
      user: userId,
      title,
      content,
      dueDate: dateObject,
      priority
    });
  
    return res
      .status(200)
      .json(new ApiResponse(200, task, "Task created successfully"));
  } catch (error) {
    res.status(400).json(error)
  }
});

const updateTask = asyncHandler(async (req, res) => {
  // take updated info and update
  const task = await Task.findByIdAndUpdate(
    { _id: req.params.taskId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  // take taskId from param
  let task ;
  try {
    task = await Task.deleteOne({ _id: req.params.taskId });
  } catch (error) {
    throw new ApiError(404, "Task not found");
  }
  const user = req.user;
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        `${task.deletedCount} task deleted by ${user.username}`
      )
    );
});

export { allTask, addTask, updateTask, deleteTask };
