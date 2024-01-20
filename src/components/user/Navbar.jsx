import React from "react";
import Container from "../Container";
import { BsSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks";
import { useAuth } from "../../hooks";
import AppSearchForm from "../form/AppSearchForm";

export default function Navbar() {
  const { ToggleTheme } = useTheme();

  const { authInfo, handleLogout } = useAuth();
  const isLoggedIn = authInfo.isLoggedIn;
  const navigate = useNavigate();

  const handleOnSearchSubmit = (query) => {
    navigate("/movie/search?title=" + query);
  };

  return (
    <div>
      <div className="bg-primary">
        <Container className="p-2">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src="./logo.png" alt="" className="h-8 sm:h-10" />
            </Link>
            <ul className="flex items-center space-x-2 sm:space-x-4">
              <li>
                <button
                  onClick={ToggleTheme}
                  className="p-1 text-lg rounded bg-dark-subtle sm:text-2xl"
                >
                  <BsSunFill className="text-secondary" />
                </button>
              </li>
              <li>
                <AppSearchForm
                  placeholder="Search.."
                  inputClassName="border-dark-subtle text-white focus:border-white sm:w-auto w-40 sm:text-lg"
                  onSubmit={handleOnSearchSubmit}
                />
              </li>
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-lg font-semibold text-white"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    to="/auth/signin"
                    className="text-lg font-semibold text-white"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}
