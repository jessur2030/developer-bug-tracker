import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import NewIssue from "./pages/NewIssue";
import Issues from "./pages/Issues";
import Issue from "./pages/Issue";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/new-issue" element={<PrivateRoute />}>
              <Route path="/new-issue" element={<NewIssue />} />
            </Route>
            <Route path="/issues" element={<PrivateRoute />}>
              <Route path="/issues" element={<Issues />} />
            </Route>
            <Route path="/issue/:id" element={<PrivateRoute />}>
              <Route path="/issue/:id" element={<Issue />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
