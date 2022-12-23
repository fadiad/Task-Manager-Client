import Board from "./pages/Boardfadi/Board";
import Register from "./pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Layout from './components/Layout/Layout';
import Unauthorized from './components/Unauthorized/Unauthorized';
import Missing from './components/Unauthorized/Missing';
import User from "./pages/User/User";
import Dashboard from './pages/Home/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* <Route path="/" element={<User />} /> */}
        <Route path="/board" element={<Dashboard/>} /> 
        <Route path="/user" element={<User/>} /> 
        {/* { we want to protect these routes
        <Route element={<RequireAuth />}>
          <Route path="/" element={<MainChat />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="profile/:userId" element={<Profile />} />
        </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
