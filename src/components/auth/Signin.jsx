import React, { useState } from "react";
import { commonModalClasses } from "../../utils/Theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import InputField from "../form/InputField";
import SubmitBtn from "../form/SubmitBtn";
import Title from "../form/Title";
import { useAuth, useNotificaion } from "../../hooks";
import { isValidEmail } from "../../utils/helper";

const validateUserDetail = ({ email, password }) => {

  if (!email.trim()) return { ok: false, error: "Invalid Email" };

  if (!isValidEmail(email)) return { ok: false, error: "Invalid Email" };

  if (!password.trim()) return { ok: false, error: "Invalid Password" };

  return { ok: true };
};

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInfo;
  const { updateNotification } = useNotificaion();
  const { authInfo, handleLogin } = useAuth();
  // const {isLoggedIn} = authInfo;
  const { isPending } = authInfo;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ok, error } = validateUserDetail({ email, password });
    if (!ok) return updateNotification("error", error);
    handleLogin(email, password);
  };

  // useEffect(() => {
  //   if (isLoggedIn) navigate("/");
  // },[isLoggedIn,navigate]);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + "w-72"} onSubmit={handleSubmit}>
          <Title>Sign In</Title>
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
          <SubmitBtn submitValue="Sign In" busy={isPending} />
          <div className="flex justify-between">
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
