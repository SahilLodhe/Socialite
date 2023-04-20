import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Main } from "./pages/main/main"
import { Login } from "./pages/login"
import { Navbar } from './components/navbar';
import { CreatePost } from "./pages/create-post/create-post"
import React from "react";
// import { CreateComment } from "./pages/create-comment/create-comment"
function App() {
  return (
    <div className="App">
      <Router> {/* everything related to react query dom has to be here */}
      <Navbar />{/* navbar component has to be placed between the Router and the Routes compulsorily! */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
          {/* <Route path="/createcomment" element={<CreateComment />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
