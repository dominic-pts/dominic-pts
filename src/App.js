import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Booking from "../src/pages/Booking";
import CafeLocation from "./pages/CafeLocation";
import TermsPolicies from "./pages/TermsPolicies";

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/booking" element={<Booking />} />
        <Route exact path="/terms-policies" element={<TermsPolicies />} />
        <Route exact path="/cafe-location" element={<CafeLocation />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
