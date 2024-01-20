import React, { useState } from "react";
import { commonModalClasses } from "../../utils/Theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import InputField from "../form/InputField";
import SubmitBtn from "../form/SubmitBtn";
import Title from "../form/Title";
import { isValidEmail } from "../../utils/helper";
import { useNotificaion } from "../../hooks";
import { forgetPassword } from "../../api/auth";

export default function ForgetPassword() {
  const { updateNotification } = useNotificaion();
  const [email, setEmail] = useState("");

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))
      return updateNotification("error", "Invalid Email");

    const { Mesg, error } = await forgetPassword(email);

    if (error) return updateNotification("error", error);
    updateNotification("success", Mesg);
  };
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + "w-96"}>
          <Title>Forget Password</Title>
          <InputField
            label="Email"
            placeholder="youremail@gmail.com"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <SubmitBtn submitValue="Send Email" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
            <CustomLink to="/auth/signin">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
