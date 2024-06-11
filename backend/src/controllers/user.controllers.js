import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.model.js";

const registerUser = asyncHandler(async (req, res) => {
  // take credential from the user
  // check all fields are filled
  // check if similar user exist
  // create new user

  try {
    const { username, email, password } = req.body;

    if (
      [username, email, password].some(
        (field) => field == null || field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // get email and password from user
  // check email and password is filled
  // check email exists or not
  // if exists generate accesstoken and send to user
  // successful logged in
  try {
    const { email, password } = req.body;
    if (
      [email, password].some((field) => field == null || field?.trim() === "")
    ) {
      throw new ApiError(400, "please enter the credentails correctly");
    }

    const user = await User.findOne({ email: email });
    if (!user) throw new ApiError(404, "User is not registered");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(404, "Password is incorrect");

    let accessToken;
    try {
      accessToken = await user.generateAccessToken();
    } catch (error) {
      throw new ApiError(500, "could not generate token");
    }

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken: accessToken,
          },
          "User loggedin successfully"
        )
      );
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  //clear the accessToken cookie
  const username = req.user.username;
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, `${username} logged out successfully`));
});
export { registerUser, loginUser, logoutUser };
