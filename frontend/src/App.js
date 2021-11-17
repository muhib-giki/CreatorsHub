import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";

import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import userEvent from "@testing-library/user-event";
import Rooms from "./pages/Rooms/Rooms";

const isAuth = false;
const user = {
  activated: false,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/" exact element={<Home />} />
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>
        <Route element={<SemiProtectedRoute />}>
          <Route path="/activate" element={<Activate />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/rooms" element={<Rooms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function GuestRoute() {
  let location = useLocation();

  if (isAuth) {
    return <Navigate to="/rooms" state={{ from: location }} />;
  }

  return <Outlet />;
}
function SemiProtectedRoute() {
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  } else if (isAuth && !user.activated) {
    return <Outlet />;
  } else if (isAuth && user.activated) {
    return <Navigate to="/rooms" state={{ from: location }} />;
  }
}
function ProtectedRoute() {
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  } else if (isAuth && !user.activated) {
    return <Navigate to="/activate" state={{ from: location }} />;
  } else if (isAuth && user.activated) {
    return <Outlet />;
  }
}

// const GuestRoute = ({ children, ...rest }) => {
//   let location = useLocation();

//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         return isAuth ? (
//           <Navigate
//             to={{
//               pathname: "/rooms",
//               state: {
//                 from: location,
//               },
//             }}
//           />
//         ) : (
//           { children }
//         );
//       }}
//     ></Route>
//   );
// };

export default App;
