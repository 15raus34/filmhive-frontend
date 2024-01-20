import React, { useEffect, useState } from "react";
import { commonModalClasses } from "../../utils/Theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import InputField from "../form/InputField";
import SubmitBtn from "../form/SubmitBtn";
import Title from "../form/Title";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotificaion } from "../../hooks";
import { isValidEmail, isValidName } from "../../utils/helper";

const validateUserDetail = ({ name, email, password }) => {
  if (!name.trim()) return { ok: false, error: "Name doesn't exist" };

  if (!isValidName(name)) return { ok: false, error: "Invalid Name" };

  if (!email.trim()) return { ok: false, error: "Email doesn't exist" };

  if (!isValidEmail(email)) return { ok: false, error: "Invalid Email" };

  if (!password.trim()) return { ok: false, error: "Invalid Password" };

  if (password.length < 8)
    return {
      ok: false,
      error: "Password Length Must Be Greater Than 8 Character",
    };

  return { ok: true };
};
export default function Signup() {
  const navigate = useNavigate();
  const { updateNotification } = useNotificaion();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = userInfo;

  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserDetail(userInfo);
    if (!ok) return updateNotification("error", error);
    const response = await createUser(userInfo);
    if (response.error) return updateNotification("error", response.error);
    navigate("/auth/email-verification", {
      state: { user: response.user },
      replace: true,
    });
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + "w-72"} onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
          <InputField
            label="Name"
            placeholder="YourName"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
          <InputField
            label="Email"
            placeholder="youremail@gmail.com"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
          <InputField
            label="Password"
            placeholder="********"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
          <SubmitBtn submitValue="Sign Up" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign In</CustomLink>
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
