import React from "react";
import { NavLink, Link } from "react-router-dom";
import { logoutFunction } from "../../serviceApi/registerApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";


const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // ?? LOGOUT HANDLER
  const logOutHandler = async () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    let result = await logoutFunction();

    if (result.status == 200) {
      toast.success("Logged Out Successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  // ! JSX START
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={auth.user && "/home-page"} className="navbar-brand">
            Task 
          </Link>

          <div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* //?? REGISTER LOGIN LOGOUT */}
              {auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/home-page" className="nav-link ">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" onClick={logOutHandler}>
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
