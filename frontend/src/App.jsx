import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Complains } from "./pages/Complains";
import { CreateComplain } from "./pages/CreateComplain";
import { FullComplain } from "./components/FullComplain";
import { AdminPage } from "./pages/AdminPage";
import { Topics } from "./pages/Topics";
import { Words } from "./pages/Words";
import { Users } from "./pages/Users";
import { UpdateComplain } from "./pages/UpdateComplain";
import { UserPage } from "./pages/UserPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complains" element={<Complains />} />
          <Route path="/createComplain" element={<CreateComplain />} />
          <Route path="/updateComplain/:id" element={<UpdateComplain />} />
          <Route path="/fullcomplain/:id" element={<FullComplain />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/words" element={<Words />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dashboard" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
