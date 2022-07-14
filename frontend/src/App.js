import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      axios
        .get("/auth/login/success")
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) return setUser(response.data.user);
          throw new Error("authentication has been failed!");
        })

        .catch((err) => {
          console.log("error : ", err);
        });
    };
    getUser();
  }, []);

  console.log("user : ", user);

  return (
    <Router>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
