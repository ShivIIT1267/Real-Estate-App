import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import Profile from "./pages/profile.jsx";
import Signin from "./pages/SignIn.jsx";
import Header from "./Components/Header.jsx";
import SignUp from "./pages/SignUp.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Listing from "./pages/listing.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
