import { Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage/HomePage";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import Register from "./screens/RegisterAndLogin/Register";
import Login from "./screens/RegisterAndLogin/Login";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        {/* //?? PROTECTED ROUTES */}
        <Route path="/home-page" element={<PrivateRoute />}>
          <Route path="" element={<HomePage />} />
        </Route>
        {/* <Route path="/home-page" element={<HomePage />} /> */}

        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
