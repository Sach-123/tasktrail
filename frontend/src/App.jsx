
import "./App.css";
import Container from "./components/Container";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Tasks from './components/Tasks.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/users/login",
        element: <Login />,
      },
      {
        path: "/users/register",
        element: <Register />,
      },
      {
        path:"users/tasks",
        element: <Tasks />
      }
    ],
  },
]);

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black from-30% to-purple-950 text-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
