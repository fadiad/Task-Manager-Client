import Board from "./pages/Board/Board";
import Register from "./pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Layout from './components/Layout/Layout';
import Unauthorized from './components/Unauthorized/Unauthorized';
import Missing from './components/Unauthorized/Missing';
import User from "./pages/User/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="user" element={<User />} />
          
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
