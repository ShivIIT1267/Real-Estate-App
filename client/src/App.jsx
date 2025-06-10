import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import Profile from "./pages/profile.jsx";
import Signin from "./pages/SignIn.jsx";
import Header from "./Components/Header.jsx";
import SignUp from "./pages/SignUp.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
