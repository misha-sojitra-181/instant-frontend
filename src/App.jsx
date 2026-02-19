import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./component/Login";
import Signup from "./component/Signup";

/* Guest */
import Guestnavbar from "./component/Guestnavbar";
import Guesthome from "./component/Guesthome";
import Guestmobile from "./component/Guestmobile";
import Guestwifi from "./component/Guestwifi";
import Changepass from "./component/Changepass";
import Forgotpass from "./component/Forgotpass";


/* User */
import Navbar from "./component/Navbar";
import Userhome from "./component/Userhome";
import Profile from "./component/Profile";
import Editprofile from "./component/Editprofile";
import Mobile from "./component/Mobile";
import Wifi from "./component/Wifi";
import Pay from "./component/Pay";
import Payment from "./component/Payment";
import Feedback from "./component/Feedback";
import Wifipay from "./component/Wifipay";
import Wifipayment from "./component/Wifipayment";
import Receipt from "./component/receipt";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- GUEST LAYOUT ---------- */}
        <Route path="/" element={<Guestnavbar />}>
          <Route index element={<Guesthome />} />
          <Route path="Guestmobile" element={<Guestmobile />} />
          <Route path="Guestwifi" element={<Guestwifi />} />
          <Route path="Login" element={<Login />} />
          <Route path="Changepass" element={<Changepass />} />
           <Route path="Forgotpass" element={<Forgotpass />} />
          <Route path="Signup" element={<Signup />} />
        </Route>

        {/* ---------- USER LAYOUT ---------- */}
        <Route path="/" element={<Navbar />}>
          <Route path="Userhome" element={<Userhome />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Editprofile" element={<Editprofile />} />
          <Route path="Mobile" element={<Mobile />} />
          <Route path="Wifi" element={<Wifi />} />
          <Route path="Pay" element={<Pay />} />
          <Route path="Payment" element={<Payment />} />
          <Route path="Wifipay" element={<Wifipay />} />
          <Route path="Wifipayment" element={<Wifipayment />} />
          <Route path="Receipt" element={<Receipt />} />
          <Route path="Feedback" element={<Feedback />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
