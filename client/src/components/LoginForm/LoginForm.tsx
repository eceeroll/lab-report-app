import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { Button, Input, Notification, rem } from "@mantine/core";
import { ForgotPasswordInput } from "../../components/PasswordInput/PasswordInput";
import { useLoginUserMutation } from "../../features/user/userApiSlice";
import { useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";

interface ILoginFormValues {
  email: string;
  password: string;
}

interface IApiError {
  status: number;
  data: {
    message: string;
  };
}

const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

export default function LoginForm() {
  const [loginFormValues, setLoginFormValues] = useState<ILoginFormValues>({
    email: "",
    password: "",
  });
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser(loginFormValues).unwrap();
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setLoginSuccess(true);
      setNotificationMessage("You are directing to the homepage...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setLoginSuccess(false);
      const apiError = error as IApiError;
      setNotificationMessage(apiError?.data?.message);
    }
  };

  return (
    <>
      {notificationMessage && (
        <Notification
          withCloseButton={false}
          className={classes.alert}
          icon={loginSuccess ? checkIcon : xIcon}
          color={loginSuccess ? "green" : "red"}
          title={loginSuccess ? "Success!" : "Error!"}
        >
          {notificationMessage}
        </Notification>
      )}
      <form onSubmit={handleLogin}>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="email">
            Email
          </label>
          <Input
            placeholder="Your email"
            name="email"
            value={loginFormValues.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes["forgot-password"]}>
          <ForgotPasswordInput
            name="password"
            value={loginFormValues.password}
            onChange={handleInputChange}
          />
        </div>

        <Button type="submit">Login</Button>
      </form>
    </>
  );
}
